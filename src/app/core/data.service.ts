import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers, URLSearchParams, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { ErrorHandlerService } from './error-handler.service';

@Injectable()
export class DataService {

  private errorSource: Subject<string>;
  public lastError$: Observable<string>;

  private _isLocal = window.location.hostname.indexOf('localhost') >= 0;
  private _apiUrl: string;

  constructor(
    private http: Http,
    private errorHandler: ErrorHandlerService) {

    if (this._isLocal) {
      this._apiUrl = 'http://localhost:8000/';
    }
    this.errorSource = new Subject();
    this.lastError$ = this.errorSource.asObservable();
  }

  getApiRequest(resource: string, data?: any): Observable<any> {
    const url: string = this._apiUrl + resource + '/';
    return this.request(RequestMethod.Get, url, data);
  }

  postApiRequest(resource: string, data: any): Observable<any> {
    const url: string = this._apiUrl + resource + '/';
    return this.request(RequestMethod.Post, url, data);
  }

  putApiRequest(resource: string, data: any): Observable<any> {
    const url: string = this._apiUrl + resource + '/';
    return this.request(RequestMethod.Put, url, data);
  }

  patchApiRequest(resource: string, data: any): Observable<any> {
    const url: string = this._apiUrl + resource + '/';
    return this.request(RequestMethod.Patch, url, data);
  }

  request(method: RequestMethod, url: string, data?: any) {
    let options = this.createOptions(method, data);
    return this.http.request(url, options)
      .map((response: Response) => {
        try {
          return response.json() || {};
        } catch(e) {
          return {};
        }
      })
      .catch((err: any) => this.handleError(err));
  }

  private createHeaders(contentType: string): Headers {
    let headers = new Headers({'Content-Type': contentType});
    // This cookie is added to responses by Django
    // let csrf = Cookie.get('csrftoken');
    // if (csrf) {
    //   headers.append('X-CSRFToken', csrf);
    // }
    return headers;
  }

  private createOptions(method: RequestMethod = RequestMethod.Get, data: any = {}): RequestOptions {
    let headers = this.createHeaders('application/json');
    if (data instanceof FormData) {
      headers.delete('Content-Type');
    }
    let options = new RequestOptions({method: method, headers: headers});
    if (method === RequestMethod.Get) {
      let params = new URLSearchParams();
      for (let key in data) {
        if (data.hasOwnProperty(key)) {
          params.set(key, data[key]);
        }
      }
      options.search = params;
    } else {
      if (data instanceof FormData) {
        options.body = data;
      } else {
        options.body = JSON.stringify(data);
      }
    }
    return options;
  }

  private handleError(error: Response | any) {
    let message: string;
    if (error instanceof Response) {
      if (error.status === 0) {
        message = `Could not reach the server because your internet connection 
                   was lost, the connection timed out, or the server is not responding.`;
      } else {
        const body = error.json() || {};
        if (body.detail) {
          message = body.detail;
        } else {
          message = JSON.stringify(body);
        }
      }
      this.errorHandler.logResponse(message, error);
    } else {
      this.errorHandler.logError(error);
      message = error.message ? error.message : error.toString();
    }

    this.errorSource.next(message);
    return Observable.throw(message);
  }
}
