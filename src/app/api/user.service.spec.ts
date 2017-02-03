/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { UserService } from './user.service';
import {GLOBAL} from '../shared/global';
import {User} from '../shared/model/user.entity';
import {ROLE} from '../shared/model/role.enum';
import {
    ResponseOptions,
    Response,
    Http, HttpModule,
    BaseRequestOptions,
    RequestMethod
} from '@angular/http';

declare function require(name: string);
let Pact = require('pact-consumer-js-dsl');

  // Commented Due to error - Alias flexible matchers for simplicity
  /*
  const term = Pact.Matchers.term;
  const like = Pact.Matchers.somethingLike;
  const eachLike = Pact.Matchers.eachLike;
  */

let mock_db: User[] = [
  new User({id: 2, email: 'admin1@aus.au', name: 'Joe Doe 2',
     pass: 'secure_password', role: ROLE.SHITTY_DEVELOPER}),
     new User({id: 1, email: 'admin1@aus.au', name: 'Joe Doe 1',
        pass: 'secure_password', role: ROLE.SHITTY_DEVELOPER})
];

describe('UserService', () => {
    let userProvider;
    let val = '';
    beforeEach((done) => {
        TestBed.configureTestingModule({
            providers: [UserService],
            imports: [HttpModule]
        });

        done();
    });
    beforeAll(function(done) {
        userProvider = Pact.mockService({
            consumer: 'User-Specs',
            provider: 'User-Api',
            port: GLOBAL.MOCK_SERVER_PORT,
            done: done
        });

        // This ensures your pact-mock-service is in a clean state before
        // running your test suite.
        // userProvider.resetSession(done);
        done();
    });


    afterAll(function(done) {
        userProvider.finalize()
            .then(function() { done(); }, function(err) { done.fail(err); });
    });

    it('should have valid http', inject([UserService], (service) => {
        expect(service.isValidHttp()).toEqual(true);
    }));

    it('should exists', function(done) {
        inject([UserService], (service: UserService) => {
            expect(service).toBeTruthy();
            done();
        })();
    });

    it('should return a collection of users for fetch all users', function(done) {
        inject([UserService], (service: UserService) => {
            userProvider
                .given('there are users already added inside the database')
                .uponReceiving('a request to get all users')
                .withRequest('GET', '/api/v1/users/', {
                    'Accept': 'application/json'
                })
                .willRespondWith(200, {
                    'Content-Type': 'application/json; charset=utf-8'
                }, Pact.Match.somethingLike(mock_db));

            userProvider.run(done, function(runComplete) {
                service.fetchUsers()
                    .subscribe((res: any) => {
                        expect(res.status).toEqual(200);
                        service.users = res.data;
                        expect(service.users.length).toBeGreaterThan(0);
                    });
                runComplete();

            });
        })();
    });


    it('should get an individual user by its *id*', function(done) {
        inject([UserService], (service: UserService) => {
            userProvider
                .given('user api should return user by its id')
                .uponReceiving('a request for all users')
                .withRequest({
                    method: 'GET',
                    path: '/api/v1/users/1',
                    headers: {
                      'Accept': 'application/json'
                    }
                }
                )
                .willRespondWith(200, {
                    'Content-Type': 'application/json; charset=utf-8'
                }, Pact.Match.somethingLike(mock_db[0]));

            userProvider.run(done, function(runComplete) {
                service.getUser(1)
                    .subscribe((res: any) => {
                        let data = res.data;
                        let u = new User(data);
                        expect(u).toEqual(jasmine.any(User));
                    });

                runComplete();

            });
        })();
    });

    it('should throw 404 when trying to get user by its *id*', function(done) {
        inject([UserService], (service: UserService) => {
            userProvider
                .given('there are no users inside the database with that id')
                .uponReceiving('a request to get user by id')
                .withRequest({
                    method: 'GET',
                    path: '/api/v1/users/-1',
                    headers: {
                      'Accept': 'application/json'
                    }
                })
                .willRespondWith(404, {
                    'Content-Type': 'application/json; charset=utf-8'
                });

            userProvider.run(done, function(runComplete) {
                service.getUser(-1)
                    .subscribe((res: any) => {
                        expect(res.status).toEqual(404);
                    }, err => console.log(err));


                runComplete();

            });
        })();
    });

    it('should update an existing users', function(done) {
        inject([UserService], (service: UserService) => {
            userProvider
                .given('user exists in database')
                .uponReceiving('a request to update a user, containing user object')
                .withRequest('PATCH', '/api/v1/users', {
                  'Accept': 'application/json'
                }, Pact.Match.somethingLike(mock_db[0])
                )
                .willRespondWith(200, {
                    'Content-Type': 'application/json; charset=utf-8'
                });

            userProvider.run(done, function(runComplete) {
              let u: User = new User({id: 3, email: 'admin1@aus.au', name: 'Joe Doe3',
                  pass: 'secure_password', role: ROLE.SHITTY_DEVELOPER});

                let status_code = service.updateUser(u)
                    .subscribe((res: any) => {
                        expect(res.status).toEqual(200);
                    });

                runComplete();

            });
        })();
    });

    it('should delete a user by its ID', function(done) {
        inject([UserService], (service: UserService) => {
            userProvider
                .given('user exists in database')
                .uponReceiving('a request to delete a user')
                .withRequest('DELETE', '/api/v1/users/1', {
                  'Accept': 'application/json'
                })
                .willRespondWith(204, {
                    'Content-Type': 'application/json; charset=utf-8'
                });

            userProvider.run(done, function(runComplete) {
                service.deleteUser(1)
                    .subscribe((res: any) => {
                        expect(res.status).toEqual(204);
                    });
                runComplete();

            });
        })();
    });

    it('should create a new users', function(done) {
        inject([UserService], (service: UserService) => {
            userProvider
                .given('user does not exists in database')
                .uponReceiving('a request to create user')
                .withRequest('POST', '/api/v1/users/', {
                  'Accept': 'application/json'
                })
                .willRespondWith(201, {
                    'Content-Type': 'application/json; charset=utf-8'
                }, Pact.Match.somethingLike(123));

            userProvider.run(done, function(runComplete) {
                let u: User = new User({id: 3, email: 'admin1@aus.au', name: 'Joe Doe',
                    pass: 'secure_password', role: ROLE.SHITTY_DEVELOPER});
                service.createUser(u)
                    .subscribe((res: any) => {
                        service.users.push(res.data);
                        expect(res.status).toEqual(201);
                    });

                runComplete();

            });
        })();
    });

});
