/*
Crucible
Copyright 2020 Carnegie Mellon University.
NO WARRANTY. THIS CARNEGIE MELLON UNIVERSITY AND SOFTWARE ENGINEERING INSTITUTE MATERIAL IS FURNISHED ON AN "AS-IS" BASIS. CARNEGIE MELLON UNIVERSITY MAKES NO WARRANTIES OF ANY KIND, EITHER EXPRESSED OR IMPLIED, AS TO ANY MATTER INCLUDING, BUT NOT LIMITED TO, WARRANTY OF FITNESS FOR PURPOSE OR MERCHANTABILITY, EXCLUSIVITY, OR RESULTS OBTAINED FROM USE OF THE MATERIAL. CARNEGIE MELLON UNIVERSITY DOES NOT MAKE ANY WARRANTY OF ANY KIND WITH RESPECT TO FREEDOM FROM PATENT, TRADEMARK, OR COPYRIGHT INFRINGEMENT.
Released under a MIT (SEI)-style license, please see license.txt or contact permission@sei.cmu.edu for full terms.
[DISTRIBUTION STATEMENT A] This material has been approved for public release and unlimited distribution.  Please see Copyright notice for non-US Government use and distribution.
Carnegie Mellon(R) and CERT(R) are registered in the U.S. Patent and Trademark Office by Carnegie Mellon University.
DM20-0181
*/

using System;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading;
using System.Threading.Tasks;
using IdentityModel.Client;
using Microsoft.Extensions.Logging;
using Player.Vm.Api.Domain.Services;
using Player.Vm.Api.Infrastructure.Options;
using Polly;

namespace Player.Vm.Api.Infrastructure.HttpHandlers
{

    public class AuthenticatingHandler : DelegatingHandler
    {
        private readonly IAsyncPolicy<HttpResponseMessage> _policy;
        private readonly IAuthenticationService _authenticationService;
        private readonly ILogger<AuthenticatingHandler> _logger;

        private TokenResponse _token;
        private AuthenticationHeaderValue _authenticationHeader;

        public AuthenticatingHandler(IAuthenticationService authenticationService, IdentityClientOptions clientOptions, ILogger<AuthenticatingHandler> logger)
        {
            _authenticationService = authenticationService;
            _logger = logger;

            // Create a policy that tries to renew the access token if a 401 Unauthorized is received.
            _policy = Policy.HandleResult<HttpResponseMessage>(r => r.StatusCode == HttpStatusCode.Unauthorized)
            .WaitAndRetryAsync(5, retryAttempt =>
            {
                _logger.LogError($"Retrying connection after 401");
                Authenticate(true);
                return TimeSpan.FromSeconds(Math.Min(Math.Pow(2, retryAttempt), clientOptions.MaxRetryDelaySeconds));
            });
        }

        protected async override Task<HttpResponseMessage> SendAsync(HttpRequestMessage request, CancellationToken cancellationToken)
        {
            if (_authenticationHeader == null)
            {
                Authenticate(false);
            }

            // Try to perform the request, re-authenticating gracefully if the call fails due to an expired or revoked access token.
            var result = await _policy.ExecuteAndCaptureAsync(async () =>
            {
                request.Headers.Authorization = _authenticationHeader;
                return await base.SendAsync(request, cancellationToken);
            });

            return result.Result ?? result.FinalHandledResult;
        }

        private void Authenticate(bool forceRefresh)
        {
            if (forceRefresh)
                _authenticationService.InvalidateToken();

            _token = _authenticationService.GetToken();

            if (!_token.IsError)
            {
                _authenticationHeader = new AuthenticationHeaderValue(_token.TokenType, _token.AccessToken);
            }
            else
            {
                _logger.LogError($"Error in {typeof(AuthenticatingHandler).Name}: {_token.Error}");
            }
        }
    }
}
