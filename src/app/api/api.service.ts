import { Injectable } from '@angular/core';
import {Http, Headers, Response, RequestOptions} from '@angular/http';
import {User} from '../shared/model/user.entity';
import {ROLE} from '../shared/model/role.enum';
import {GLOBAL} from '../shared/global';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ApiService {

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
    createUser(user: User) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        this.http.post(GLOBAL.USER_API_DEPRECIATED, JSON.stringify(user), options)
            .map(res => res.json())
            .subscribe(
            data => this.users.push(data),
            err => this.handleError(err),
            () => console.log('User Added')
            );
    }

    /*
      The Api should be able to update already created users.
    */
    updateUser(user: User): User {
        let u: User = null;
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        this.http.patch(GLOBAL.USER_API_DEPRECIATED, JSON.stringify(user), options)
            .map(res => res.json())
            .subscribe(
            data => {
                u = new User(data._id, data._email, data._name, data._pass, data._confirm_pass, data._role);
            },
            err => this.handleError(err),
            () => console.log('updateUser with id' + u.id)
            );
        return u;
    }

    /*
      The Api should be able to fetch all the users.
    */
    fetchUsers(): number {
        this.http
            .get(GLOBAL.USER_API_DEPRECIATED)
            .map(res => {
                return res.json();
            })
            .subscribe(
            data => {
                this.users = data;
            },
            err => this.handleError(err),
            () => console.log('Loaded all users')
            );
        return this.users.length;

    }

    /*
      The Api should be get user by its ID (The Id should be email)
    */
    getUser(id: number): User {
        let u: User = null;
        this.http
            .get(GLOBAL.USER_API_DEPRECIATED + id)
            .map(res => res.json())
            .subscribe(
            data => {
                u = new User(data._id, data._email, data._name, data._pass, data._confirm_pass, data._role);
            },
            err => this.handleError(err),
            () => console.log('Loaded user with id' + id)
            );
        return u;
    }

    /*
      The Api should be get user by its ID (The Id should be email)
    */
    deleteUser(user: User) {
        this.http
            .delete(GLOBAL.USER_API_DEPRECIATED + user.id)
            .map(res => res.text())
            .subscribe(
            data => {
                let midx = -1;

                this.users.forEach((t, idx) => {
                    if (t._id === user.id) {
                        midx = idx;
                    }
                });

                this.users.splice(midx, 1);
            },
            err => this.handleError(err),
            () => console.log('User Deleted')
            );
    }
    /*
      The Error Handler from HTTP
    */
    private handleError(error: Response | any) {
        // In a real world app, we might use a remote logging infrastructure
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }

}
