import { Injectable } from '@angular/core';
import { Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { GLOBAL } from '../shared/global';
import { Observable } from 'rxjs/Observable';
import { ApiService } from './api.service';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/observable/throw';

    @Injectable()
export class MessagingService extends ApiService {
    isValidHttp(): boolean {
            return (this.http !== undefined || this.http !== null);
        }

        getInterpreterMessages(user_id): Observable < any > {
            let headers = new Headers({ 'Accept': 'application/json' });
            let options = new RequestOptions({ headers: headers });

            return this.http.get(GLOBAL.USER_API + '/' + user_id + '/messages' + '?page=' + 1 + '&amp;per_page=' + 10, options)
                    .map(this.extractData)
                    .catch((err) => { return this.handleError(err); });
        }

        sendInterpreterMessages(user_id, url, inbox_url_id, message_body): Observable < Object > {
        let headers = new Headers({ 'Accept': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        const obj = { message: { message_inbox_url: url, message_body: message_body } };

             return this.http.post(GLOBAL.USER_API + '/' + user_id + '/messages', JSON.stringify(obj), options)
                    .map(this.extractData)
                    .catch((err) => { return this.handleError(err); });
        }

        sendMessages(user_id, receiver_id ,  url, inbox_url_id, message_body): Observable<Object> {
            let headers = new Headers({ 'Accept': 'application/json' });
            let options = new RequestOptions({ headers: headers });
            const obj = { message: { receiver_id: receiver_id, message_inbox_url: url, message_body: message_body } };

            return this.http.post(GLOBAL.USER_API + '/' + user_id + '/messages', JSON.stringify(obj), options)
                .map(this.extractData)
                .catch((err) => { return this.handleError(err); });
        }

        allMeesageThreads(businessId): Observable<any> {
            let headers = new Headers({ 'Accept': 'application/json' });
            let options = new RequestOptions({ headers: headers });

            return this.http.get(GLOBAL.USER_APPI + '/business/' + businessId + '/message_threads' + '?page=' + 1 + '&amp;per_page=' + 100, options)
                .map(this.extractData)
                .catch((err) => { return this.handleError(err); });
        }
}

