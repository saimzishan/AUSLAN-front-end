/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { UserService } from './user.service';
import {GLOBAL} from '../shared/global';
declare function require(name: string);
let Pact = require('pact-consumer-js-dsl');

describe('UserService', () => {
    let helloProvider;
    let val = '';
    beforeEach((done) => {
      TestBed.configureTestingModule({
          providers: [UserService]
      });

        done();
    });
    beforeAll(function(done) {
      helloProvider = Pact.mockService({
            consumer: 'Booking-System-frontend',
            provider: 'User-Api',
            port: GLOBAL.MOCK_SERVER_PORT,
            done: done
        });

    // This ensures your pact-mock-service is in a clean state before
    // running your test suite.
    // helloProvider.resetSession(done);
    done();
  });


    afterAll(function(done) {
        helloProvider.finalize()
            .then(function() { done(); }, function(err) { done.fail(err); });
    });
    it('should exists', function(done) {
      inject([UserService], (service: UserService) => {
        expect(service).toBeTruthy();
        done();
    })();
    });
    it('should say hello', function(done) {
        inject([UserService], (service: UserService) => {
          helloProvider
              .given('user api will say hello')
              .uponReceiving('a request for hello')
              .withRequest('GET', '/api/v1/users/sayHello', {
                'Accept': '*/*'
              })
              .willRespondWith(200, {
                  'Content-Type': 'application/json; charset=utf-8'
              }, {
                  reply: 'Hello'
              });

          helloProvider.run(done, function(runComplete) {
              service.sayHello(GLOBAL.USER_API)
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
