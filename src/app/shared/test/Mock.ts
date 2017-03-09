import { Component,  Injectable, OnInit } from '@angular/core';
import { ApiService } from '../../api/api.service';
import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';
import {User} from '../../shared/model/user.entity';
import {GLOBAL} from '../global';
import {MockBackend, MockConnection} from '@angular/http/testing';
import {Response, ResponseOptions} from '@angular/http';
import { NgModule } from '@angular/core';

@Component({
    template: '<router-outlet></router-outlet>'
})
export class DummyComponent {
}

let mock_login_response: Object = {'res': { 'data': { 'jwt': GLOBAL.FAKE_TOKEN}}};

let mock_User_response: Object = {
      id: 2, email: 'admin1@aus.au', name: 'Joe Doe 2', type: 'Accountant'
  };

let mock_empty_response: Object = {};

let mock_fetch_response: Object = {'users': [mock_User_response, mock_User_response]};

export class RouterStub {
   constructor() {}
    navigate(routes: string[]) {
        // do nothing
    }
}


@Injectable()
export class MockUserService extends ApiService {

    createUser(user: User): Observable<Object> {
      return Observable.of(mock_empty_response).map(
        o => this.extractData(new Response(new ResponseOptions({
          status: 200,
        body: JSON.stringify({data: mock_User_response}),
      }))));

    }

     login(user: User): Observable<Object>  {
       return Observable.of(mock_empty_response).map(
         o => this.extractData(new Response(new ResponseOptions({
           status: 200,
         body: JSON.stringify({data: mock_login_response}),
       }))));


     }

     getUserByEmail(email: string): Observable<Object>  {
       return Observable.of(mock_empty_response).map(
         o => this.extractData(new Response(new ResponseOptions({
           status: 200,
         body: JSON.stringify({data: mock_User_response}),
       }))));
     }
     logout() {
       return '';
     }
     resetUser( emailAddress: string): Observable<Object> {
         return Observable.of(mock_empty_response).map(res => {return res;});
     }

     fetchUsers(): Observable<Object> {
        return Observable.of(mock_fetch_response).map(res => {return res;});
     }

     resendVerificationCode(userID: number): Observable<Object>  {
       return Observable.of(mock_empty_response).map(res => {return res;});
     }

     verifyUser(userID: number, verifyCode: string): Observable<Object> {
       return Observable.of(mock_empty_response).map(res => {return res;});
     }

 }
