/*
Crucible
Copyright 2020 Carnegie Mellon University.
NO WARRANTY. THIS CARNEGIE MELLON UNIVERSITY AND SOFTWARE ENGINEERING INSTITUTE MATERIAL IS FURNISHED ON AN "AS-IS" BASIS. CARNEGIE MELLON UNIVERSITY MAKES NO WARRANTIES OF ANY KIND, EITHER EXPRESSED OR IMPLIED, AS TO ANY MATTER INCLUDING, BUT NOT LIMITED TO, WARRANTY OF FITNESS FOR PURPOSE OR MERCHANTABILITY, EXCLUSIVITY, OR RESULTS OBTAINED FROM USE OF THE MATERIAL. CARNEGIE MELLON UNIVERSITY DOES NOT MAKE ANY WARRANTY OF ANY KIND WITH RESPECT TO FREEDOM FROM PATENT, TRADEMARK, OR COPYRIGHT INFRINGEMENT.
Released under a MIT (SEI)-style license, please see license.txt or contact permission@sei.cmu.edu for full terms.
[DISTRIBUTION STATEMENT A] This material has been approved for public release and unlimited distribution.  Please see Copyright notice for non-US Government use and distribution.
Carnegie Mellon(R) and CERT(R) are registered in the U.S. Patent and Trademark Office by Carnegie Mellon University.
DM20-0181
*/

using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using S3.Player.Api;
using S3.Vm.Console.Models;
using S3.Vm.Console.Options;
using S3.VM.Api;
using Swashbuckle.AspNetCore.Swagger;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Reflection;
using System.Threading.Tasks;

namespace S3.Vm.Console.Extensions
{
    public static class ServiceCollectionExtensions
    {
        public static void AddSwagger(this IServiceCollection services, AuthorizationOptions authOptions)
        {
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new Info { Title = "S3 Console API", Version = "v1" });

                c.AddSecurityDefinition("oauth2", new OAuth2Scheme
                {
                    Type = "oauth2",
                    Flow = "implicit",
                    AuthorizationUrl = authOptions.AuthorizationUrl,
                    Scopes = authOptions.AuthorizationScope.Split(' ').ToDictionary(x => x, x => "public api access")
                });
            });
        }

        public static void AddApiClients(this IServiceCollection services)
        {
            services.AddHttpClient();
            services.AddVmApiClient();
            services.AddPlayerApiClient();
        }

        private static void AddVmApiClient(this IServiceCollection services)
        {
            services.AddScoped<IS3VmApiClient, S3VmApiClient>(p =>
            {
                var httpContextAccessor = p.GetRequiredService<IHttpContextAccessor>();
                var httpClientFactory = p.GetRequiredService<IHttpClientFactory>();
                var vmOptions = p.GetRequiredService<VmOptions>();

                var uri = new Uri(vmOptions.ApiUrl);

                string authHeader = httpContextAccessor.HttpContext.Request.Headers["Authorization"];

                var httpClient = httpClientFactory.CreateClient();
                httpClient.BaseAddress = uri;
                httpClient.DefaultRequestHeaders.Add("Authorization", authHeader);

                var playerVmApiClient = new S3VmApiClient(httpClient, true);
                playerVmApiClient.BaseUri = uri;

                return playerVmApiClient;
            });
        }

        private static void AddPlayerApiClient(this IServiceCollection services)
        {
            services.AddHttpClient();

            services.AddScoped<IS3PlayerApiClient, S3PlayerApiClient>(p =>
            {
                var httpContextAccessor = p.GetRequiredService<IHttpContextAccessor>();
                var httpClientFactory = p.GetRequiredService<IHttpClientFactory>();
                var vmOptions = p.GetRequiredService<VmOptions>();

                var uri = new Uri(vmOptions.PlayerApiUrl);

                string authHeader = httpContextAccessor.HttpContext.Request.Headers["Authorization"];

                var httpClient = httpClientFactory.CreateClient();
                httpClient.BaseAddress = uri;
                httpClient.DefaultRequestHeaders.Add("Authorization", authHeader);

                var playerApiClient = new S3PlayerApiClient(httpClient, true);
                playerApiClient.BaseUri = uri;

                return playerApiClient;
            });
        }
    }
}
