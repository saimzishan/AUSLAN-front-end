import { Injectable } from '@angular/core';
import {Http, Headers, Response, RequestOptions} from '@angular/http';
import {User, OrganisationalRepresentative, Accountant, Client,
    BookingOfficer, Administrator, Interpreter} from '../shared/model/user.entity';
import {ROLE} from '../shared/model/role.enum';
import {GLOBAL, authService} from '../shared/global';
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
export class UserService extends ApiService {
    public token: string;
    users: User[] = [];
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
        let obj = { 'user': user };

        return this.http.post(this.getRoute(user), JSON.stringify(obj), options)
            .map(this.extractData)
            .catch((err) => { return this.handleError(err); });
    }

    /*
      The Api should be able to update already created users.
    */
    updateUser(user: User): Observable<Object> {

        let headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let obj = { 'user': user };
        return this.http.patch(GLOBAL.USER_API + '/' + user.id, JSON.stringify(obj), options)
            .map(this.extractData)
            .catch(this.handleError);

    }

    /*
      The Api should be able to fetch all the users.
    */
    fetchUsers(): Observable<Object> {
        let headers = new Headers({ 'Content-Type': 'application/json', 'Accept': '*/*' });
        let options = new RequestOptions({ headers: headers });
        return this.http.get(GLOBAL.USER_API, options)
            .map(this.extractData)
            .catch(this.handleError);

    }

    /*
      The Api should be get user by its ID (The Id should be email)
    */
    getUser(id: number): Observable<Object> {
        let headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http
            .get(GLOBAL.USER_API + '/' + id, options)
            .map(this.extractData)
            .catch(this.handleError);
    }


    /*
      The Api should be to verify user
    */
    verifyUser(userID: number, verifyCode: string): Observable<Object> {
        let headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let obj = { 'code': verifyCode };

        return this.http
            .post(GLOBAL.USER_API + '/' + userID + '/confirm_verification_code' ,
             JSON.stringify(obj) , options) // Better add verify in path
            .map(this.extractData)
            .catch((err) => { return Observable.throw(err); });
    }

    /*
      The Api should be to verify user
    */
    resendVerificationCode(userID: number): Observable<Object> {
        let headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http
            .get(GLOBAL.USER_API + '/' + userID + '/resend_verification_code' , options)
            .map(this.extractData)
            .catch((err) => { return Observable.throw(err); });
    }

    /*
      The Api should be to reset user password
    */
    resetUser( emailAddress: string): Observable<Object> {
        let headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http
            .get(GLOBAL.USER_API + '/reset_password/' + (emailAddress)  , options) // Better add verify in path
            .map(this.extractData)
            .catch((err) => { return Observable.throw(err); });
    }
    /*
      The Api should be get user by its ID (The Id should be email)
    */
    getUserByEmail(email: string): Observable<Object> {
        let headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http
            .get(GLOBAL.USER_API + '/email/' + (email) , options)
            .map(this.extractData)
            .catch((err) => { return Observable.throw(err); });
    }
    /*
      The Api that should login the user
    */
    login(user: User): Observable<Object> {
        let headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8', 'Accept': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let obj = { 'auth': user };

        return this.http
            .post(GLOBAL.USER_API + '/login', JSON.stringify(obj), options)
            .map(this.extractData)
            .catch((err) => { return Observable.throw(err); });
    }
    /*
      The Api that should logout the user
    */
    logout(user: User): Observable<Object> {
        let headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http
            .get(GLOBAL.USER_API + '/logout', options)
            .map(this.extractData)
            .catch((err) => { return Observable.throw(err); });
    }
    /*
      The Api should be get user by its ID (The Id should be email)
    */
    deleteUser(id: number): Observable<Object> {
        let headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http
            .delete(GLOBAL.USER_API + '/' + id, options)
            .map(this.extractData)
            .catch((err) => { return Observable.throw(err); });

    }

}
