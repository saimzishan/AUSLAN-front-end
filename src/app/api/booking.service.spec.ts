/* tslint:disable:no-unused-variable */

import { BookingService } from './booking.service';
import {
    TestBed, fakeAsync, inject, ComponentFixture, async
} from '@angular/core/testing';
import {} from 'jasmine';
import {
    ResponseOptions,
    Response,
    Http, HttpModule,
    BaseRequestOptions,
    RequestMethod
} from '@angular/http';
import {GLOBAL} from '../shared/global';
import {Booking} from '../shared/model/booking.entity';
import {mockservice} from '@pact-foundation/pact-node';
import {path} from 'path';

declare function require(name: string);
let Pact = require('pact-consumer-js-dsl');

declare var process: any;
describe('BookingService', () => {
    let provider;

    const bookingBodyExpectation = {
        'id': 1,
        'location': {
            'description': 'Melbourne',
            'country': 'Australia',
            'post_code': 3000
        },
        'eligibility': {
            'available': true,
        }
    };

    beforeEach((done) => {
        TestBed.configureTestingModule({
            providers: [BookingService],
            imports: [
                HttpModule
            ]
        });
        done();
    });

    it('should exists', function(done) {
        inject([BookingService], (service: BookingService) => {
            expect(service).toBeTruthy();
            done();
        })();
    });
    // Setup a Mock Server before unit tests run.
    // This server acts as a Test Double for the real Provider API.
    // We call addInteraction() to configure the Mock Service to act like the Provider
    // It also sets up expectations for what requests are to come, and will fail
    // if the calls are not seen.
    beforeAll(done => {
        provider = Pact.mockService({
            consumer: 'Booking-Specs',
            provider: 'Booking-Api',
            port: GLOBAL.MOCK_SERVER_PORT,
            done: done
        });
        // This ensures your pact-mock-service is in a clean state before
        // running your test suite.
        // provider.resetSession(done);
        done();
    });

    // Verify service client works as expected.
    //
    // Note that we don't call the consumer API endpoints directly, but
    // use unit-style tests that test the collaborating function behaviour -
    // we want to test the function that is calling the external service.
    describe('when a call to list all bookings from the Booking Service is made', () => {
        describe('and there are bookings in the database', () => {
            it('returns a list of bookings', done => {
                inject([BookingService], (service: BookingService) => {
                  provider
                  .given('all bookings should be return')
                  .uponReceiving('A request on  booking path')
                  .withRequest('GET', '/api/v1/bookings', {
                      'Accept': '*/*'
                  })
                  .willRespondWith({
                      status: 200,
                      headers: {
                          'Content-Type': 'application/json; charset=utf-8'
                      },
                      body: bookingBodyExpectation
                  }
                  );
                    // Run the tests
                    provider.run(done, function(runComplete) {
                        service.getBookings(GLOBAL.BOOKING_API)
                            .then(function(xhr) {
                                expect(JSON.parse(xhr.responseText)).toEqual(bookingBodyExpectation);
                                done();
                            })
                            .catch(function(err) {
                                done.fail(err);
                            });
                        runComplete();

                    });

                })();
            });
        });
    });
    describe('when a call to the Booking Service is made to retreive a single booking by ID', () => {
        describe('and there is an booking in the DB with ID 1', () => {
            it('returns the booking', done => {
              provider
                  .given('a booking with id 1 exists')
                  .uponReceiving('a request for a booking with ID 1')
                  .withRequest('GET', '/api/v1/bookings/1', {
                      'Accept': '*/*'
                  })
                  .willRespondWith({
                      status: 200,
                      headers: {
                          'Content-Type': 'application/json; charset=utf-8'
                      },
                      body: bookingBodyExpectation
                  }
                  );

                inject([BookingService], (service: BookingService) => {
                    // Run the tests
                    provider.run(done, function(runComplete) {
                        service.getBookingById(1, GLOBAL.BOOKING_API)
                            .then(function(xhr) {
                                expect(JSON.parse(xhr.responseText)).toEqual(bookingBodyExpectation);
                                done();
                            })
                            .catch(function(err) {
                                done.fail(err);
                            });
                        runComplete();

                    });

                })();
            });

        });
    });
    describe('and there no bookings in the database', () => {
        it('returns a 404', done => {
            inject([BookingService], (service: BookingService) => {
              provider
                  .given('a booking with id -100 not exists')
                  .uponReceiving('a request for a booking with ID -100')
                  .withRequest({
                      method: 'GET',
                      path: '/api/v1/bookings/-100'
                  })
                  .willRespondWith({
                      status: 404
                  }
                  );
                // Run the tests
                provider.run(done, function(runComplete) {
                    service.getBookingById(-100, GLOBAL.BOOKING_API)
                        .then(function(xhr) {
                            expect(xhr.status).toEqual(404);
                            done();
                        })
                        .catch(function(err) {
                            done.fail(err);
                        });
                    runComplete();

                });

            })();
        });
    });


    // Write pact files
    afterAll(function(done) {
        provider.finalize()
            .then(function() { done(); }, function(err) { done.fail(err); });
    });
});
