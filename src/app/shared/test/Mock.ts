import {Component, Injectable} from '@angular/core';
import {ApiService} from '../../api/api.service';
import {Observable} from 'rxjs/Observable';
import {Booking} from '../../shared/model/booking.entity';
import {GLOBAL} from '../global';
import {Response, ResponseOptions} from '@angular/http';
import {NgModule} from '@angular/core';
import {User} from '../model/user.entity';
import {MapsAPILoader} from '@agm/core';

@Component({
    template: ''
})
export class DummyComponent {
}

@NgModule({
    declarations: [DummyComponent],
    exports: [DummyComponent]
})
export class MockModule {
}

let mock_login_response: Object = {'res': {'data': {'jwt': GLOBAL.FAKE_TOKEN}}};

let mock_User_response: Object = {
    id: 2, email: 'admin1@aus.au', name: 'Joe Doe 2', type: 'Accountant'
};

let mock_booking_response: Object = {};

let mock_user_detail: User = new User({
    id: 2, email: 'admin1@aus.au', first_name: 'Joe', last_name: 'Joe',
    mobile: 'xxxx xxx xxx', verified: false, disabled: false, password: 'xxxxx'
});


let mock_empty_response: Object = {};

let mock_fetch_response: Object = {'users': [mock_User_response, mock_User_response]};

let mock_fetch_booking_response: Object = {'bookings': [mock_User_response, mock_User_response]};

export class RouterStub {
    constructor() {
    }

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

    login(user: User): Observable<Object> {
        return Observable.of(mock_empty_response).map(
            o => this.extractData(new Response(new ResponseOptions({
                status: 200,
                body: JSON.stringify({data: mock_login_response}),
            }))));


    }

    getUserByEmail(email: string): Observable<Object> {
        return Observable.of(mock_empty_response).map(
            o => this.extractData(new Response(new ResponseOptions({
                status: 200,
                body: JSON.stringify(mock_user_detail),
            }))));
    }

    logout() {
        return '';
    }

    resetUser(emailAddress: string): Observable<Object> {
        return Observable.of(mock_empty_response).map(res => {
            return res;
        });
    }

    fetchPaginatedUsers(page: number): Observable<Object> {
        return Observable.of(mock_fetch_response).map(res => {
            return res;
        });
    }

    fetchUsers(): Observable<Object> {
        return Observable.of(mock_fetch_response).map(res => {
            return res;
        });
    }

    resendVerificationCode(userID: number): Observable<Object> {
        return Observable.of(mock_empty_response).map(res => {
            return res;
        });
    }

    verifyUser(userID: number, verifyCode: string): Observable<Object> {
        return Observable.of(mock_empty_response).map(res => {
            return res;
        });
    }

    getUser(id: number): Observable<Object> {
        return Observable.of(mock_empty_response).map(res => {
            return res;
        });
    }
}


@Injectable()
export class MockBookingService extends ApiService {

    createBooking(booking: Booking): Observable<Object> {
        return Observable.of(mock_empty_response).map(
            o => this.extractData(new Response(new ResponseOptions({
                status: 200,
                body: JSON.stringify({data: mock_empty_response}),
            }))));

    }


    getBooking(id: number): Observable<Object> {
        return Observable.of(mock_booking_response).map(res => {
            return res;
        });
    }


    fetchBookings(): Observable<Object> {
        return Observable.of(mock_fetch_booking_response).map(res => {
            return res;
        });
    }
    fetchPaginatedBookings(page: number , search: URLSearchParams): Observable<Object> {
        return Observable.of(mock_fetch_booking_response).map(res => {
            return res;
        });
    }

}

@Injectable()
export class FakeOpMapsAPILoader implements MapsAPILoader {
    load(): Promise<void> {
        return Promise.resolve();
    }
}
