import { Injectable } from '@angular/core';
import {Http, Headers, Response, RequestOptions} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/observable/throw';

@Injectable()
export class ApiService {
  private static httpClient: Http= null;

    /*
      While this method seems to have no significance, Most of the method below would fail, if DI fails.
      Also when running test cases, mocking backend needs to ensure the HTTP is in provider and injector
     */
    private static isValidHttp(): boolean {
        return (ApiService.httpClient !== undefined || ApiService.httpClient !== null);
    }


    private static POST(url: string, jsonObj: Object, jsonHeaders?: Object): Observable<Response> {
        let headers = (jsonHeaders != null) ? new Headers(jsonHeaders) : new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return ApiService.httpClient.post(url, jsonObj, options)
            .map(ApiService.extractData)
            .catch(ApiService.handleError);
    }

    private static GET(url: string, jsonHeaders?: Object): Observable<Response> {
        let headers = (jsonHeaders != null) ? new Headers(jsonHeaders) : new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return ApiService.httpClient.get(url, options)
            .map(ApiService.extractData)
            .catch(ApiService.handleError);
    }

    /*
      Extract JSON Object from Response
    */
    static extractData(res: Response) {
        return { status: res.status , data: res.json() || ''};
    }

    /*
      The Error Handler from HTTP
    */
    static handleError(error: Response | any) {
        // In a real world app, we might use a remote logging infrastructure
        let errMsg: string;
        if (error instanceof Response) {
            let body, err: any;
            try {
              body = error.json() || '';
              err = body.error || JSON.stringify(body);
            }catch ( er ) {

            }
            errMsg = `${error.status} - ${error.statusText || ''} ${err || ''}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.log(errMsg);
        return Observable.throw(errMsg);
    }

    constructor(http: Http) {
      ApiService.httpClient = http;
    }
}
