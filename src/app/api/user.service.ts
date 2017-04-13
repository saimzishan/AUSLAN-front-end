import { Injectable } from '@angular/core';
import {Headers, RequestOptions} from '@angular/http';
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
export class UserService extends ApiService {
    public token: string;
    users: User[] = [];
    /*
      While this method seems to have no significance, Most of the method below would fail, if DI fails.
      Also when running test cases, mocking backend needs to ensure the HTTP is in provider and injector
     */
    isValidHttp(): boolean {
        return (this.http !== undefined || this.http !== null);
    }
    /*Only making it public for test case*/
    public getRoute(u: User): string {
        let route = '';

        switch (+u.role) {
            case ROLE.Organisational:
            case ROLE.OrganisationalRepresentative:
                route = '/organisational_representatives';
                break;

            case ROLE.Accountant:
                route = '/accountants';
                break;

            case ROLE.IndividualClient:
                route = '/individual_clients';
                break;

            case ROLE.BookingOfficer:
                route = '/booking_officers';
                break;

            case ROLE.Administrator:
                route = '/administrators';
                break;

            case ROLE.Interpreter:
                route = '/interpreters';
                break;

        }
        return route;
    }

    /*
      The Api should be able to create different type of users.
    */
    createUser(user: User): Observable<Object> {

        let headers = new Headers({'Accept': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let obj = { 'user': user };

        return this.http.post(GLOBAL.USER_API_ENDPOINT + this.getRoute(user), JSON.stringify(obj), options)
            .map(this.extractData)
            .catch((err) => { return this.handleError(err); });
    }

    /*
      The Api should be able to update already created users.
    */
    updateUser(user: User): Observable<Object> {

        let headers = new Headers({'Accept': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let obj = { 'user': user };
        return this.http.patch(GLOBAL.USER_API + '/' + user.id, JSON.stringify(obj), options)
            .catch((err) => { return this.handleError(err); });

    }

    /*
      The Api should be able to fetch all the users.
    */
    fetchUsers(): Observable<Object> {
        let headers = new Headers({'Accept': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.get(GLOBAL.USER_API, options)
            .map(this.extractData)
            .catch((err) => { return this.handleError(err); });

    }

    /*
      The Api should be get user by its ID (The Id should be email)
    */
    getUser(id: number): Observable<Object> {
        let headers = new Headers({'Accept': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http
            .get(GLOBAL.USER_API + '/' + id, options)
            .map(this.extractData)
            .catch((err) => { return this.handleError(err); });
    }


    /*
      The Api should be to verify user
    */
    verifyUser(userID: number, verifyCode: string): Observable<Object> {
        let headers = new Headers({'Accept': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let obj = { 'code': verifyCode };

        return this.http
            .post(GLOBAL.USER_API + '/' + userID + '/confirm_verification_code' ,
             JSON.stringify(obj) , options) // Better add verify in path
            .catch((err) => { return Observable.throw(err); });
    }

    /*
      The Api should be to verify user
    */
    resendVerificationCode(userID: number): Observable<Object> {
        let headers = new Headers({'Accept': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http
            .get(GLOBAL.USER_API + '/' + userID + '/resend_verification_code' , options)
            .catch((err) => { return Observable.throw(err); });
    }

    /*
      The Api should be to reset user password
    */
    resetUser( emailAddress: string): Observable<Object> {
        let headers = new Headers({'Accept': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http
            .get(GLOBAL.USER_API + '/reset_password/' + (emailAddress)  , options) // Better add verify in path
            .catch((err) => { return Observable.throw(err); });
    }
    /*
      The Api should be get user by its ID (The Id should be email)
    */
    getUserByEmail(email: string): Observable<Object> {
        let headers = new Headers({'Accept': 'application/json' });
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
        let headers = new Headers({ 'Accept': 'application/json' });
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
    logout(): Observable<Object> {
        let headers = new Headers({'Accept': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http
            .get(GLOBAL.USER_API + '/logout', options)
            .catch((err) => { return Observable.throw(err); });
    }
    /*
      The Api should be get user by its ID (The Id should be email)
    */
    deleteUser(id: number): Observable<Object> {
        let headers = new Headers({'Accept': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http
            .delete(GLOBAL.USER_API + '/' + id, options)
            .map(this.extractData)
            .catch((err) => { return Observable.throw(err); });

    }

}
