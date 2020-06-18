/**
 * Crucible
 * Copyright 2020 Carnegie Mellon University.
 * NO WARRANTY. THIS CARNEGIE MELLON UNIVERSITY AND SOFTWARE ENGINEERING INSTITUTE MATERIAL IS FURNISHED ON AN "AS-IS" BASIS. CARNEGIE MELLON UNIVERSITY MAKES NO WARRANTIES OF ANY KIND, EITHER EXPRESSED OR IMPLIED, AS TO ANY MATTER INCLUDING, BUT NOT LIMITED TO, WARRANTY OF FITNESS FOR PURPOSE OR MERCHANTABILITY, EXCLUSIVITY, OR RESULTS OBTAINED FROM USE OF THE MATERIAL. CARNEGIE MELLON UNIVERSITY DOES NOT MAKE ANY WARRANTY OF ANY KIND WITH RESPECT TO FREEDOM FROM PATENT, TRADEMARK, OR COPYRIGHT INFRINGEMENT.
 * Released under a MIT (SEI)-style license, please see license.txt or contact permission@sei.cmu.edu for full terms.
 * [DISTRIBUTION STATEMENT A] This material has been approved for public release and unlimited distribution.  Please see Copyright notice for non-US Government use and distribution.
 * Carnegie Mellon(R) and CERT(R) are registered in the U.S. Patent and Trademark Office by Carnegie Mellon University.
 * DM20-0181
 */

/**
 * Caster API
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: v1.1.0
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
/* tslint:disable:no-unused-variable member-ordering */

import { Inject, Injectable, Optional } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpResponse,
  HttpEvent,
  HttpParameterCodec,
} from '@angular/common/http';
import { CustomHttpParameterCodec } from '../encoder';
import { Observable } from 'rxjs';

import { ProblemDetails } from '../model/problemDetails';
import { Resource } from '../model/resource';
import { TaintResourcesCommand } from '../model/taintResourcesCommand';

import { BASE_PATH, COLLECTION_FORMATS } from '../variables';
import { Configuration } from '../configuration';

@Injectable({
  providedIn: 'root',
})
export class ResourcesService {
  protected basePath = 'http://localhost';
  public defaultHeaders = new HttpHeaders();
  public configuration = new Configuration();
  public encoder: HttpParameterCodec;

  constructor(
    protected httpClient: HttpClient,
    @Optional() @Inject(BASE_PATH) basePath: string,
    @Optional() configuration: Configuration
  ) {
    if (configuration) {
      this.configuration = configuration;
    }
    if (typeof this.configuration.basePath !== 'string') {
      if (typeof basePath !== 'string') {
        basePath = this.basePath;
      }
      this.configuration.basePath = basePath;
    }
    this.encoder = this.configuration.encoder || new CustomHttpParameterCodec();
  }

  /**
   * Get a single resource in a Workspace.
   * @param workspaceId
   * @param id
   * @param Type Type of the Resource.
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public getResource(
    workspaceId: string,
    id: string,
    Type: string,
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<Resource>;
  public getResource(
    workspaceId: string,
    id: string,
    Type: string,
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<Resource>>;
  public getResource(
    workspaceId: string,
    id: string,
    Type: string,
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<Resource>>;
  public getResource(
    workspaceId: string,
    id: string,
    Type: string,
    observe: any = 'body',
    reportProgress: boolean = false
  ): Observable<any> {
    if (workspaceId === null || workspaceId === undefined) {
      throw new Error(
        'Required parameter workspaceId was null or undefined when calling getResource.'
      );
    }
    if (id === null || id === undefined) {
      throw new Error(
        'Required parameter id was null or undefined when calling getResource.'
      );
    }
    if (Type === null || Type === undefined) {
      throw new Error(
        'Required parameter Type was null or undefined when calling getResource.'
      );
    }

    let queryParameters = new HttpParams({ encoder: this.encoder });
    if (Type !== undefined && Type !== null) {
      queryParameters = queryParameters.set('Type', <any>Type);
    }

    let headers = this.defaultHeaders;

    // authentication (oauth2) required
    if (this.configuration.accessToken) {
      const accessToken =
        typeof this.configuration.accessToken === 'function'
          ? this.configuration.accessToken()
          : this.configuration.accessToken;
      headers = headers.set('Authorization', 'Bearer ' + accessToken);
    }

    // to determine the Accept header
    const httpHeaderAccepts: string[] = [
      'text/plain',
      'application/json',
      'text/json',
    ];
    const httpHeaderAcceptSelected:
      | string
      | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
    if (httpHeaderAcceptSelected !== undefined) {
      headers = headers.set('Accept', httpHeaderAcceptSelected);
    }

    return this.httpClient.get<Resource>(
      `${this.configuration.basePath}/api/workspaces/${encodeURIComponent(
        String(workspaceId)
      )}/resources/${encodeURIComponent(String(id))}`,
      {
        params: queryParameters,
        withCredentials: this.configuration.withCredentials,
        headers: headers,
        observe: observe,
        reportProgress: reportProgress,
      }
    );
  }

  /**
   * Get all resources in a Workspace.
   * @param workspaceId
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public getResourcesByWorkspace(
    workspaceId: string,
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<Array<Resource>>;
  public getResourcesByWorkspace(
    workspaceId: string,
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<Array<Resource>>>;
  public getResourcesByWorkspace(
    workspaceId: string,
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<Array<Resource>>>;
  public getResourcesByWorkspace(
    workspaceId: string,
    observe: any = 'body',
    reportProgress: boolean = false
  ): Observable<any> {
    if (workspaceId === null || workspaceId === undefined) {
      throw new Error(
        'Required parameter workspaceId was null or undefined when calling getResourcesByWorkspace.'
      );
    }

    let headers = this.defaultHeaders;

    // authentication (oauth2) required
    if (this.configuration.accessToken) {
      const accessToken =
        typeof this.configuration.accessToken === 'function'
          ? this.configuration.accessToken()
          : this.configuration.accessToken;
      headers = headers.set('Authorization', 'Bearer ' + accessToken);
    }

    // to determine the Accept header
    const httpHeaderAccepts: string[] = [
      'text/plain',
      'application/json',
      'text/json',
    ];
    const httpHeaderAcceptSelected:
      | string
      | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
    if (httpHeaderAcceptSelected !== undefined) {
      headers = headers.set('Accept', httpHeaderAcceptSelected);
    }

    return this.httpClient.get<Array<Resource>>(
      `${this.configuration.basePath}/api/workspaces/${encodeURIComponent(
        String(workspaceId)
      )}/resources`,
      {
        withCredentials: this.configuration.withCredentials,
        headers: headers,
        observe: observe,
        reportProgress: reportProgress,
      }
    );
  }

  /**
   * Refresh the Workspace\&#39;s Resources
   * @param workspaceId
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public refreshResources(
    workspaceId: string,
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<Array<Resource>>;
  public refreshResources(
    workspaceId: string,
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<Array<Resource>>>;
  public refreshResources(
    workspaceId: string,
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<Array<Resource>>>;
  public refreshResources(
    workspaceId: string,
    observe: any = 'body',
    reportProgress: boolean = false
  ): Observable<any> {
    if (workspaceId === null || workspaceId === undefined) {
      throw new Error(
        'Required parameter workspaceId was null or undefined when calling refreshResources.'
      );
    }

    let headers = this.defaultHeaders;

    // authentication (oauth2) required
    if (this.configuration.accessToken) {
      const accessToken =
        typeof this.configuration.accessToken === 'function'
          ? this.configuration.accessToken()
          : this.configuration.accessToken;
      headers = headers.set('Authorization', 'Bearer ' + accessToken);
    }

    // to determine the Accept header
    const httpHeaderAccepts: string[] = [
      'text/plain',
      'application/json',
      'text/json',
    ];
    const httpHeaderAcceptSelected:
      | string
      | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
    if (httpHeaderAcceptSelected !== undefined) {
      headers = headers.set('Accept', httpHeaderAcceptSelected);
    }

    return this.httpClient.post<Array<Resource>>(
      `${this.configuration.basePath}/api/workspaces/${encodeURIComponent(
        String(workspaceId)
      )}/resources/actions/refresh`,
      null,
      {
        withCredentials: this.configuration.withCredentials,
        headers: headers,
        observe: observe,
        reportProgress: reportProgress,
      }
    );
  }

  /**
   * Taint selected Resources
   * @param workspaceId
   * @param TaintResourcesCommand
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public taintResources(
    workspaceId: string,
    TaintResourcesCommand?: TaintResourcesCommand,
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<Array<Resource>>;
  public taintResources(
    workspaceId: string,
    TaintResourcesCommand?: TaintResourcesCommand,
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<Array<Resource>>>;
  public taintResources(
    workspaceId: string,
    TaintResourcesCommand?: TaintResourcesCommand,
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<Array<Resource>>>;
  public taintResources(
    workspaceId: string,
    TaintResourcesCommand?: TaintResourcesCommand,
    observe: any = 'body',
    reportProgress: boolean = false
  ): Observable<any> {
    if (workspaceId === null || workspaceId === undefined) {
      throw new Error(
        'Required parameter workspaceId was null or undefined when calling taintResources.'
      );
    }

    let headers = this.defaultHeaders;

    // authentication (oauth2) required
    if (this.configuration.accessToken) {
      const accessToken =
        typeof this.configuration.accessToken === 'function'
          ? this.configuration.accessToken()
          : this.configuration.accessToken;
      headers = headers.set('Authorization', 'Bearer ' + accessToken);
    }

    // to determine the Accept header
    const httpHeaderAccepts: string[] = [
      'text/plain',
      'application/json',
      'text/json',
    ];
    const httpHeaderAcceptSelected:
      | string
      | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
    if (httpHeaderAcceptSelected !== undefined) {
      headers = headers.set('Accept', httpHeaderAcceptSelected);
    }

    // to determine the Content-Type header
    const consumes: string[] = [
      'application/json',
      'text/json',
      'application/_*+json',
    ];
    const httpContentTypeSelected:
      | string
      | undefined = this.configuration.selectHeaderContentType(consumes);
    if (httpContentTypeSelected !== undefined) {
      headers = headers.set('Content-Type', httpContentTypeSelected);
    }

    return this.httpClient.post<Array<Resource>>(
      `${this.configuration.basePath}/api/workspaces/${encodeURIComponent(
        String(workspaceId)
      )}/resources/actions/taint`,
      TaintResourcesCommand,
      {
        withCredentials: this.configuration.withCredentials,
        headers: headers,
        observe: observe,
        reportProgress: reportProgress,
      }
    );
  }

  /**
   * Untaint selected Resources
   * @param workspaceId
   * @param TaintResourcesCommand
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public untaintResources(
    workspaceId: string,
    TaintResourcesCommand?: TaintResourcesCommand,
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<Array<Resource>>;
  public untaintResources(
    workspaceId: string,
    TaintResourcesCommand?: TaintResourcesCommand,
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<Array<Resource>>>;
  public untaintResources(
    workspaceId: string,
    TaintResourcesCommand?: TaintResourcesCommand,
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<Array<Resource>>>;
  public untaintResources(
    workspaceId: string,
    TaintResourcesCommand?: TaintResourcesCommand,
    observe: any = 'body',
    reportProgress: boolean = false
  ): Observable<any> {
    if (workspaceId === null || workspaceId === undefined) {
      throw new Error(
        'Required parameter workspaceId was null or undefined when calling untaintResources.'
      );
    }

    let headers = this.defaultHeaders;

    // authentication (oauth2) required
    if (this.configuration.accessToken) {
      const accessToken =
        typeof this.configuration.accessToken === 'function'
          ? this.configuration.accessToken()
          : this.configuration.accessToken;
      headers = headers.set('Authorization', 'Bearer ' + accessToken);
    }

    // to determine the Accept header
    const httpHeaderAccepts: string[] = [
      'text/plain',
      'application/json',
      'text/json',
    ];
    const httpHeaderAcceptSelected:
      | string
      | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
    if (httpHeaderAcceptSelected !== undefined) {
      headers = headers.set('Accept', httpHeaderAcceptSelected);
    }

    // to determine the Content-Type header
    const consumes: string[] = [
      'application/json',
      'text/json',
      'application/_*+json',
    ];
    const httpContentTypeSelected:
      | string
      | undefined = this.configuration.selectHeaderContentType(consumes);
    if (httpContentTypeSelected !== undefined) {
      headers = headers.set('Content-Type', httpContentTypeSelected);
    }

    return this.httpClient.post<Array<Resource>>(
      `${this.configuration.basePath}/api/workspaces/${encodeURIComponent(
        String(workspaceId)
      )}/resources/actions/untaint`,
      TaintResourcesCommand,
      {
        withCredentials: this.configuration.withCredentials,
        headers: headers,
        observe: observe,
        reportProgress: reportProgress,
      }
    );
  }
}
