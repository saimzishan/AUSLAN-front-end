import { Injectable } from '@angular/core';
import {Http, Headers, Response, RequestOptions} from '@angular/http';
import { HttpModule } from '@angular/http';
import {Booking} from '../shared/model/booking.entity';
import {GLOBAL} from '../shared/global';

@Injectable()
export class BookingService {

  constructor(private http: Http) {
}

getBookingById(id: number, url: string):  Promise<XMLHttpRequest> {
  // Makes a synchronous request
  let xhr = new XMLHttpRequest();
  let m = `${url}/${id}`;
  xhr.open('GET', m , false);
  xhr.send();
  return Promise.resolve(xhr);
}

getBookings( url: string):  Promise<XMLHttpRequest> {
  // Makes a synchronous request
  let xhr = new XMLHttpRequest();
  xhr.open('GET', url , false);
  xhr.send();
  return Promise.resolve(xhr);
}
}
