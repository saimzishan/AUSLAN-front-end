import { Injectable } from '@angular/core';
import {Http, Headers, Response, RequestOptions} from '@angular/http';
import {Booking} from '../shared/model/booking.entity';
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
export class BookingService extends ApiService {
    public token: string;
    bookings: Booking[] = [];
    /*
      While this method seems to have no significance, Most of the method below would fail, if DI fails.
      Also when running test cases, mocking backend needs to ensure the HTTP is in provider and injector
     */
    isValidHttp(): boolean {
        return (this.http !== undefined || this.http !== null);
    }
    /*
      The Api should be able to create different type of bookings.
    */
    createBooking(booking: Booking): Observable<Object> {

        let headers = new Headers({'Accept': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let obj = { 'booking': booking };

        return this.http.post(GLOBAL.BOOKING_API + '/' , JSON.stringify(obj), options)
            .map(this.extractData)
            .catch((err) => { return this.handleError(err); });
    }

    /*
      The Api should be able to update already created bookings.
    */
    updateBooking(booking: Booking): Observable<Object> {

        let headers = new Headers({'Accept': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let obj = { 'booking': booking };
        return this.http.patch(GLOBAL.BOOKING_API + '/' + booking.id, JSON.stringify(obj), options)
            .catch((err) => { return this.handleError(err); });

    }

    /*
      The Api should be able to fetch all the bookings.
    */
    fetchBookings(): Observable<Object> {
        let headers = new Headers({'Accept': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.get(GLOBAL.BOOKING_API, options)
            .map(this.extractData)
            .catch((err) => { return this.handleError(err); });

    }

    /*
      The Api should be get booking by its ID (The Id should be email)
    */
    getBooking(id: number): Observable<Object> {
        let headers = new Headers({'Accept': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http
            .get(GLOBAL.BOOKING_API + '/' + id, options)
            .map(this.extractData)
            .catch((err) => { return this.handleError(err); });
    }



    /*
      The Api should be get booking by its ID (The Id should be email)
    */
    deleteBooking(id: number): Observable<Object> {
        let headers = new Headers({'Accept': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http
            .delete(GLOBAL.BOOKING_API + '/' + id, options)
            .map(this.extractData)
            .catch((err) => { return Observable.throw(err); });

    }

}
