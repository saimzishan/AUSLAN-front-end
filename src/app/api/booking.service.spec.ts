/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { BookingService } from './booking.service';
import {GLOBAL} from '../shared/global';
import {Booking} from '../shared/model/booking.entity';
import {ROLE} from '../shared/model/role.enum';
import {
    ResponseOptions,
    Response,
    Http, HttpModule,
    BaseRequestOptions,
    RequestMethod
} from '@angular/http';
import {} from 'jasmine';
import {authService} from '../shared/global';
import { RequestOptions } from '@angular/http';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
declare function require(name: string);
let Pact = require('pact-consumer-js-dsl');

let mock_response: Object[] = [
    new Object({
        id: 2,
        state: 'requested'
    })
];


describe('BookingService', () => {
    let bookingProvider;
    let val = '';
    let mock_booking = new Booking();
    mock_booking.id = '2';
    mock_booking.raw_venue_address = 'venue_address';

    let mock_db: Booking[] = [mock_booking];
    beforeEach((done) => {
        TestBed.configureTestingModule({
            providers: [BookingService, {
                provide: AuthHttp,
                useFactory: authService,
                deps: [Http, RequestOptions]
            }],
            imports: [HttpModule]
        });

        bookingProvider = Pact.mockService({
            consumer: 'Booking-Specs',
            provider: 'Booking-Api',
            port: GLOBAL.MOCK_BOOKING_SERVER_PORT,
            done: done
        });
        done();
    });


    afterAll(function(done) {
        bookingProvider.finalize()
            .then(function() { done(); }, function(err) { done.fail(err); });
    });

    it('should have valid http', inject([BookingService], (service) => {
        expect(service.isValidHttp()).toEqual(true);
    }));

    it('should exists', function(done) {
        inject([BookingService], (service: BookingService) => {
            expect(service).toBeTruthy();
            done();
        })();
    });

    it('should create a Booking', function(done) {
        inject([BookingService], (service: BookingService) => {

                    bookingProvider
                        .given('booking does not exists in database')
                        .uponReceiving('a request to create Booking')
                        .withRequest('POST', '/api/v1/bookings', {
                            'Accept': 'application/json'
                        })
                        .willRespondWith(201, {
                            'Content-Type': 'application/json; charset=utf-8'
                        }, Pact.Match.somethingLike(mock_response));

                    bookingProvider.run(done, function(runComplete) {

                        service.createBooking(mock_booking)
                            .subscribe((res: any) => {
                                service.bookings.push(res.data);
                                expect(res.status).toEqual(201);
                                done();
                            }, err => done.fail(err), () => {
                                runComplete();
                            });
                    });
        })();
    });

    describe('Fetach All booking Api', () => {

        it('should return a collection of bookings for fetch all bookings', function(done) {
            inject([BookingService], (service: BookingService) => {
                let int = bookingProvider
                    .given('there are bookings already added inside the database')
                    .uponReceiving('a request to get all bookings')
                    .withRequest({
                        method: 'GET',
                        path: '/api/v1/bookings',
                        headers: {
                            'Accept': 'application/json'
                        }
                    }
                    )
                    .willRespondWith(200, {
                        'Content-Type': 'application/json; charset=utf-8'
                    }, {'bookings': Pact.Match.somethingLike(mock_response)});

                bookingProvider.run(done, function(runComplete) {
                    service.fetchBookings()
                        .subscribe((res: any) => {
                            expect(res.status).toEqual(200);
                            service.bookings = res.data.bookings;
                            expect(service.bookings.length).toBeGreaterThan(0);
                            done();
                        }, err => done.fail(err), () => {
                            runComplete();
                        });

                });
            })();
        });
    });

    it('should get an individual booking by its *id*', function(done) {
        inject([BookingService], (service: BookingService) => {
            bookingProvider
                .given('booking api should return booking by its id')
                .uponReceiving('a request for singe bookings')
                .withRequest({
                    method: 'GET',
                    path: '/api/v1/bookings/1',
                    headers: {
                        'Accept': 'application/json'
                    }
                }
                )
                .willRespondWith(200, {
                    'Content-Type': 'application/json; charset=utf-8'
                }, Pact.Match.somethingLike(mock_response[0]));

            bookingProvider.run(done, function(runComplete) {
                service.getBooking(1)
                    .subscribe((res: any) => {
                        let data = res.data;
                        let u = new Booking();
                        u.fromJSON(data);
                        expect(u).toEqual(jasmine.any(Booking));
                        done();
                    }, err => done.fail(err), () => {
                        runComplete();
                    });

            });
        })();
    });

    it('should throw 404 when trying to get booking by its *id*', function(done) {
        inject([BookingService], (service: BookingService) => {
            bookingProvider
                .given('there are no bookings inside the database with that id')
                .uponReceiving('a request to get booking by id')
                .withRequest({
                    method: 'GET',
                    path: '/api/v1/bookings/-1',
                    headers: {
                        'Accept': 'application/json'
                    }
                })
                .willRespondWith(404, {
                    'Content-Type': 'application/json; charset=utf-8'
                });

            bookingProvider.run(done, function(runComplete) {
                service.getBooking(-1)
                    .subscribe((res: any) => {
                     done.fail(res);
                    }, err => { expect(err.status).toEqual(404); done(); }, () => {
                        runComplete();
                    });
            });
        })();
    });

    it('should update an existing bookings', function(done) {
        inject([BookingService], (service: BookingService) => {
            bookingProvider
                .given('booking exists in database')
                .uponReceiving('a request to update a booking, containing booking object')
                .withRequest('PATCH', '/api/v1/bookings/2', {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }, { 'booking': mock_db[0].toJSON() }
                )
                .willRespondWith(200, {
                    'Content-Type': 'application/json; charset=utf-8'
                });

            bookingProvider.run(done, function(runComplete) {
                let u: Booking = mock_db[0];
                u.raw_venue_address = 'updated';

                let status_code = service.updateBooking(u)
                    .subscribe((res: any) => {
                        expect(res.status).toEqual(200);
                        done();
                    }, err => done.fail(err), () => {
                        runComplete();
                    });

            });
        })();
    });

    it('should delete a booking by its ID', function(done) {
        inject([BookingService], (service: BookingService) => {
            bookingProvider
                .given('booking exists in database')
                .uponReceiving('a request to delete a booking')
                .withRequest('DELETE', '/api/v1/bookings/1' , {
                    'Accept': 'application/json'
                })
                .willRespondWith(204, {
                    'Content-Type': 'application/json; charset=utf-8'
                });

            bookingProvider.run(done, function(runComplete) {
                service.deleteBooking(1)
                    .subscribe((res: any) => {
                        expect(res.status).toEqual(204);
                        done();
                    }, err => done.fail(err), () => {
                        runComplete();
                    });
            });
        })();
    });

});
