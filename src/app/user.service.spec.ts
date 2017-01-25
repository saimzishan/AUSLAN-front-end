/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { UserService } from './user.service';
declare function require(name: string);

let Pact = require('pact-consumer-js-dsl');

describe('UserService', () => {
    let helloProvider;
    beforeEach((done) => {
        helloProvider = Pact.mockService({
            consumer: 'Booking-System-frontend',
            provider: 'Booking-System-Api',
            port: 1234,
            done: (error) => {
                expect(error).toBe(null);
            }
        });
        TestBed.configureTestingModule({
            providers: [UserService]
        });
        setTimeout(function() { done(); }, 2000);

    });

    afterAll(function(done) {
        helloProvider.finalize()
            .then(function() { done(); }, function(err) { done.fail(err); });
    });

    it('should ...', inject([UserService], (service: UserService) => {
        expect(service).toBeTruthy();
    }));

    it('should say hello', inject([UserService], function(service: UserService) {

        helloProvider
            .uponReceiving('a request for hello')
            .withRequest('get', '/sayHello')
            .willRespondWith(200, {
                'Content-Type': 'application/json'
            }, {
                reply: 'Hello'
            });
        let out = '';
        // Run the tests
        helloProvider.run(function(error) {
            // expect(error).toBe(null);
        }, function(runComplete) {
            out = service.sayHello('http://127.0.0.1:1234');
            runComplete();
        });

        expect(out).toEqual('Hello');

    }));
});
