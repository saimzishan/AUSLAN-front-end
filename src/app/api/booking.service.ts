import { Injectable } from '@angular/core';
import {Headers, RequestOptions, URLSearchParams} from '@angular/http';
import {Booking} from '../shared/model/booking.entity';
import {GLOBAL} from '../shared/global';
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
export class BookingService extends ApiService {
    public token: string;
    bookings: Booking[] = [];
    notify = new Subject<any>();
    notifyObservable$ = this.notify.asObservable();
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

        let headers = new Headers({'Accept': 'application/json',
            'Content-Type': 'application/json'});
        let options = new RequestOptions({ headers: headers });
        let obj = { 'booking': booking.toJSON() };

        return this.http.post(GLOBAL.BOOKING_API + '/' , JSON.stringify(obj), options)
            .map(this.extractData)
            .catch((err) => { return this.handleError(err); });
    }
    /*
      The Api should be used interpreter accept or reject or tentative
    */
    interpreterAction(bookingID: number, interpreter_ID: number , state: string): Observable<Object> {

        let headers = new Headers({'Accept': 'application/json',
            'Content-Type': 'application/json'});
        let options = new RequestOptions({ headers: headers });

        return this.http.put(GLOBAL.BOOKING_API + '/' + bookingID + '/interpreter/' +  interpreter_ID + '/' + state, options)
            .map(this.extractData)
            .catch((err) => { return this.handleError(err); });
    }
    /*
      The Api should be used to invite interpreters
    */
    inviteInterpreters(bookingID: number, interpreters: Array<Object>): Observable<Object> {

        let headers = new Headers({'Accept': 'application/json',
            'Content-Type': 'application/json'});
        let options = new RequestOptions({ headers: headers });
        let obj = this.getParamsForInviteOrAssign(bookingID, interpreters);

        return this.http.post(GLOBAL.BOOKING_API + '/' + bookingID + '/invite_interpreters' , JSON.stringify(obj), options)
            .map(this.extractData)
            .catch((err) => { return this.handleError(err); });
    }

    private getParamsForInviteOrAssign(bookingID: number, interpreters: Array<Object>) {
        let invite_url = GLOBAL.BOOKING_JOB_INVITE + bookingID + '/job-detail';
        invite_url = invite_url.startsWith('http') === false ? 'http://' + invite_url : invite_url;
        let obj = {'invite_url': invite_url, 'interpreters': interpreters};
        return obj;
    }

    /*
     The Api should be used to re assign interpreters
   */
    reAssignInterpreter(bookingID: number, interpreters: Array<Object>): Observable<Object> {

        let headers = new Headers({'Accept': 'application/json',
            'Content-Type': 'application/json'});
        let options = new RequestOptions({ headers: headers });
        let obj = this.getParamsForInviteOrAssign(bookingID, interpreters);

        return this.http.put(GLOBAL.BOOKING_API + '/' + bookingID + '/assign_interpreters/' , JSON.stringify(obj), options)
            .map(this.extractData)
            .catch((err) => { return this.handleError(err); });
    }
    /*
     The Api should be used to re assign interpreters
   */
    unAssignInterpreter(bookingID: number, interpreter_id: number): Observable<Object> {

        let headers = new Headers({'Accept': 'application/json',
            'Content-Type': 'application/json'});
        let options = new RequestOptions({ headers: headers });

        return this.http.put(GLOBAL.BOOKING_API + '/' + bookingID +  '/interpreter/' + interpreter_id + '/unassign'  , options)
            .map(this.extractData)
            .catch((err) => { return this.handleError(err); });
    }
    /*
      The Api should be able to update already created bookings.
    */
    updateBooking(booking_id: string, booking: Booking): Observable<Object> {
        let headers = new Headers({'Accept': 'application/json',
            'Content-Type': 'application/json'});
        let options = new RequestOptions({ headers: headers });
        let obj = { 'booking': booking.toJSON() };
        console.log("update model "+JSON.stringify(obj));
        return this.http.patch(GLOBAL.BOOKING_API + '/' + booking_id, JSON.stringify(obj), options)
            .catch((err) => { return this.handleError(err); });

    }

    /*
      The Api should be able to update transitioning of already requested bookings.
    */
    updateBookingByTransitioning(booking_id: string, next_state: string): Observable<Object> {

        let headers = new Headers({'Accept': 'application/json',
            'Content-Type': 'application/json'});
        let options = new RequestOptions({ headers: headers });
        let obj = { 'booking': {'next_state': next_state} };
        return this.http.patch(GLOBAL.BOOKING_API + '/' + booking_id, JSON.stringify(obj), options)
            .catch((err) => { return this.handleError(err); });

    }
    /*
      The Api should be able to fetch all the bookings.
    */
    fetchBookings(search?: URLSearchParams): Observable<Object> {
        let headers = new Headers({'Accept': 'application/json'});
        let options = new RequestOptions({ headers: headers, search: search });
        return this.http.get(GLOBAL.BOOKING_API, options)
            .map(this.extractData)
            .catch((err) => { return this.handleError(err); });

    }

    /*
      The Api should be get booking by its ID (The Id should be email)
    */
    getBooking(id: number): Observable<Object> {
        let headers = new Headers({'Accept': 'application/json'});
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
        let headers = new Headers({'Accept': 'application/json',
            'Content-Type': 'application/json'});
        let options = new RequestOptions({ headers: headers });

        return this.http
            .delete(GLOBAL.BOOKING_API + '/' + id, options)
            .map(this.extractData)
            .catch((err) => { return Observable.throw(err); });

    }

    public notifyOther(data: any) {
        if (data) {
          this.notify.next(data);
        }
      }

}
