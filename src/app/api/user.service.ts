import { Injectable } from '@angular/core';
import {Http, Headers, Response, RequestOptions} from '@angular/http';
import {User} from '../shared/model/user.entity';
import {ROLE} from '../shared/model/role.enum';
import {GLOBAL} from '../shared/global';
import { Observable } from 'rxjs/Observable';
import { ApiService } from './api.service';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/observable/throw';

@Injectable()
export class UserService {

    users: User[] = [];
    constructor(private http: Http) {
    }

    /*
      While this method seems to have no significance, Most of the method below would fail, if DI fails.
      Also when running test cases, mocking backend needs to ensure the HTTP is in provider and injector
     */
    private isValidHttp(): boolean {
        return (this.http !== undefined || this.http !== null);
    }

    /*
      The Api should be able to create different type of users.
    */
    createUser(user: User): Observable<Object> {
        let headers = new Headers({ 'Content-Type': 'application/json', 'Accept': '*/*' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(GLOBAL.USER_API, JSON.stringify(user), options)
            .map(ApiService.extractData)
            .catch(ApiService.handleError);
    }

    /*
      The Api should be able to update already created users.
    */
    updateUser(user: User): Observable<Object> {

        let headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.patch(GLOBAL.USER_API, JSON.stringify(user), options)
            .map(ApiService.extractData)
            .catch(ApiService.handleError);

    }

    /*
      The Api should be able to fetch all the users.
    */
    fetchUsers(): Observable<Object> {
        let headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.get(GLOBAL.USER_API, options)
            .map(ApiService.extractData)
            .catch(ApiService.handleError);

    }

    /*
      The Api should be get user by its ID (The Id should be email)
    */
    getUser(id: number): Observable<Object> {
        let headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http
            .get(GLOBAL.USER_API + '/' + id, options)
            .map(ApiService.extractData)
            .catch(ApiService.handleError);
    }

    /*
      The Api should be get user by its ID (The Id should be email)
    */
    deleteUser(id: number): Observable<Object> {
        let headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http
            .delete(GLOBAL.USER_API + '/' + id, options)
            .map(ApiService.extractData)
            .catch(ApiService.handleError);

    }

}
