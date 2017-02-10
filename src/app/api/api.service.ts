import { Injectable } from '@angular/core';
import {Http, Headers, Response, RequestOptions} from '@angular/http';
import { AuthHttp } from 'angular2-jwt';

@Injectable()
export class ApiService {
    constructor(protected http: AuthHttp ) {
    }
    /*
      Extract JSON Object from Response
    */
    protected extractData(res: Response) {
      if (res.status < 200 || res.status >= 300) {
        throw new Error(this.handleError(res));
      }
      return { status: res.status , data: res.json() || ''};
    }

    /*
      The Error Handler from HTTP
    */
    protected handleError(error: Response | any): string {
        // In a real world app, we might use a remote logging infrastructure
        let errMsg: string;
        if (error instanceof Response) {
            let body, err: any;
            try {
              body = error.json() || error.text() || '';
              err = body.error || JSON.stringify(body);
            }catch ( er ) {

            }
            errMsg = `${error.status} - ${error.statusText || ''} ${err || ''}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        return (errMsg);
    }

}
