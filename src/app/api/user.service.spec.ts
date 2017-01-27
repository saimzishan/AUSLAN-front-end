/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { UserService } from './user.service';

declare function require(name: string);
let Pact = require('pact-consumer-js-dsl');

describe('UserService', () => {
    let helloProvider;
    let val = '';
    beforeEach((done) => {
      TestBed.configureTestingModule({
          providers: [UserService]
      });
      helloProvider = Pact.mockService({
            consumer: 'Booking-System-frontend',
            provider: 'Booking-System-Api',
            port: 1234,
            done: done
        });
        done();
    });

    afterAll(function(done) {
        helloProvider.finalize()
            .then(function() { done(); }, function(err) { done.fail(err); });
    });
    it('should ...', function(done) {
      inject([UserService], (service: UserService) => {
        expect(service).toBeTruthy();
        done();
    })();
    });
    it('should say hello', function(done) {
        inject([UserService], (service: UserService) => {
          helloProvider
              .uponReceiving('a request for hello')
              .withRequest('get', '/sayHello')
              .willRespondWith(200, {
                  'Content-Type': 'application/json'
              }, {
                  reply: 'Hello'
              });

          helloProvider.run(done, function(runComplete) {
              service.sayHello('http://127.0.0.1:1234')
                  .then(function(xhr) {
                      val = JSON.parse(xhr.responseText).reply;
                      expect(val).toEqual('Hello');
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
