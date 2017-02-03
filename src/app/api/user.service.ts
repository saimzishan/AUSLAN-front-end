import { Injectable } from '@angular/core';
import {Http, Headers, Response, RequestOptions} from '@angular/http';
import {User, OrganisationalRepresentative, Accountant, Client,
    BookingOfficer, Administrator, Interpreter} from '../shared/model/user.entity';
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
import { AuthHttp } from 'angular2-jwt';

@Injectable()
export class UserService {
    public token: string;
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

    private getRoute(u: User): string {
        let route = GLOBAL.USER_API;

        switch (+u.role) {

            case ROLE.OrganisationalRepresentative:
                route = GLOBAL.API_ENDPOINT + '/organisational_representatives';
                break;

            case ROLE.Accountant:
                route = GLOBAL.API_ENDPOINT + '/accountants';
                break;

            case ROLE.Client:
                route = GLOBAL.API_ENDPOINT + '/individual_clients';
                break;

            case ROLE.BookingOfficer:
                route = GLOBAL.API_ENDPOINT + '/booking_officers';
                break;

            case ROLE.Administrator:
                route = GLOBAL.API_ENDPOINT + '/administrators';
                break;

            case ROLE.Interpreter:
                route = GLOBAL.API_ENDPOINT + '/interpreters';
                break;

        }
        return route;
    }

    /*
      The Api should be able to create different type of users.
    */
    createUser(user: User): Observable<Object> {

        let headers = new Headers({ 'Content-Type': 'application/json', 'Accept': '*/*' });
        let options = new RequestOptions({ headers: headers });
        let obj =  { 'user': user };

        return this.http.post(this.getRoute(user), JSON.stringify(obj), options)
            .map(ApiService.extractData)
            .catch(ApiService.handleError);
    }

    /*
      The Api should be able to update already created users.
    */
    updateUser(user: User): Observable<Object> {

        let headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let obj =  { 'user': user };
        return this.http.patch(GLOBAL.USER_API + '/' + user.id, JSON.stringify(obj), options)
            .map(ApiService.extractData)
            .catch(ApiService.handleError);

    }

    /*
      The Api should be able to fetch all the users.
    */
    fetchUsers(): Observable<Object> {
        let headers = new Headers({ 'Content-Type': 'application/json', 'Accept': '*/*' });
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
