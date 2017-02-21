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
import {} from 'jasmine';
import {authService} from '../shared/global';
import { RequestOptions } from '@angular/http';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
declare function require(name: string);
let Pact = require('pact-consumer-js-dsl');

// Commented Due to error - Alias flexible matchers for simplicity
/*
const term = Pact.Matchers.term;
const like = Pact.Matchers.somethingLike;
const eachLike = Pact.Matchers.eachLike;
*/

let mock_db: User[] = [
    new User({
        id: 2, email: 'admin1@aus.au', name: 'Joe Doe 2',
        password: 'secure_password', role: ROLE.Accountant
    }),
    new User({
        id: 1, email: 'admin1@aus.au', name: 'Joe Doe 1',
        password: 'secure_password', role: ROLE.Interpreter
    })
];

describe('UserService', () => {
    let userProvider;
    let val = '';
    beforeEach((done) => {
        TestBed.configureTestingModule({
            providers: [UserService, {
                provide: AuthHttp,
                useFactory: authService,
                deps: [Http, RequestOptions]
            }],
            imports: [HttpModule]
        });

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
    describe('Fetach All user Api', () => {

        it('should return a collection of users for fetch all users', function(done) {
            inject([UserService], (service: UserService) => {
                let int = userProvider
                    .given('there are users already added inside the database')
                    .uponReceiving('a request to get all users')
                    .withRequest({
                        method: 'GET',
                        path: '/api/v1/users',
                        headers: {
                            'Accept': 'application/json'
                        }
                    }
                    )
                    .willRespondWith(200, {
                        'Content-Type': 'application/json; charset=utf-8'
                    }, Pact.Match.somethingLike(mock_db));

                userProvider.run(done, function(runComplete) {
                    service.fetchUsers()
                        .subscribe((res: any) => {
                            expect(res.status).toEqual(200);
                            service.users = res.data;
                            expect(service.users.length).toBeGreaterThan(0);
                            done();
                        }, err => done.fail(err), () => {
                            runComplete();
                        });

                });
            })();
        });
    });

    it('should get an individual user by its *id*', function(done) {
        inject([UserService], (service: UserService) => {
            userProvider
                .given('user api should return user by its id')
                .uponReceiving('a request for singe users')
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
                        done();
                    }, err => done.fail(err), () => {
                        runComplete();
                    });

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
                        done.fail(res);
                    }, err => { expect(err.status).toEqual(404); done(); }, () => {
                        runComplete();
                    });
            });
        })();
    });

    it('should update an existing users', function(done) {
        inject([UserService], (service: UserService) => {
            userProvider
                .given('user exists in database')
                .uponReceiving('a request to update a user, containing user object')
                .withRequest('PATCH', '/api/v1/users/2', {
                    'Accept': 'application/json'
                }, { 'user': Pact.Match.somethingLike(mock_db[0]) }
                )
                .willRespondWith(200, {
                    'Content-Type': 'application/json; charset=utf-8'
                });

            userProvider.run(done, function(runComplete) {
                let u: User = mock_db[0];
                u.first_name = 'updated';

                let status_code = service.updateUser(u)
                    .subscribe((res: any) => {
                        expect(res.status).toEqual(200);
                        done();
                    }, err => done.fail(err), () => {
                        runComplete();
                    });

            });
        })();
    });

    it('should delete a user by its ID', function(done) {
        inject([UserService], (service: UserService) => {
            userProvider
                .given('user exists in database')
                .uponReceiving('a request to delete a user')
                .withRequest('DELETE', '/api/v1/users/1' , {
                    'Accept': 'application/json'
                })
                .willRespondWith(204, {
                    'Content-Type': 'application/json; charset=utf-8'
                });

            userProvider.run(done, function(runComplete) {
                service.deleteUser(1)
                    .subscribe((res: any) => {
                        expect(res.status).toEqual(204);
                        done();
                    }, err => done.fail(err), () => {
                        runComplete();
                    });
            });
        })();
    });

    it('should resendVerificationCode a user by its ID', function(done) {
        inject([UserService], (service: UserService) => {
            userProvider
                .given('user exists in database')
                .uponReceiving('a request to resendVerificationCode a user')
                .withRequest('GET', '/api/v1/users/1/resend_verification_code', {
                    'Accept': 'application/json'/*,
                    'Authorization': Pact.Match.somethingLike('Bearer eyJ0eXAiOi' +
                        'JKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjV9.jxJ' +
                        'FCXmk8SOCtmmHqczBlZZEra1qa8xly7zWZ42EnO4')*/
                })
                .willRespondWith(200, {
                    'Content-Type': 'application/json; charset=utf-8'
                });

            userProvider.run(done, function(runComplete) {
                service.resendVerificationCode(1)
                    .subscribe((res: any) => {
                        expect(res.status).toEqual(200);
                        done();
                    }, err => done.fail(err), () => {
                        runComplete();
                    });
            });
        })();
    });


    it('should resetUser a user by its ID', function(done) {
        inject([UserService], (service: UserService) => {
            userProvider
                .given('user exists in database')
                .uponReceiving('a request to resetUser a user')
                .withRequest('GET', '/api/v1/users/reset_password/' + (mock_db[0].email.toString()), {
                    'Accept': 'application/json',
                })
                .willRespondWith(200, {
                    'Content-Type': 'application/json; charset=utf-8'
                });

            userProvider.run(done, function(runComplete) {
                service.resetUser(mock_db[0].email)
                    .subscribe((res: any) => {
                        expect(res.status).toEqual(200);
                        done();
                    }, err => done.fail(err), () => {
                        runComplete();
                    });
            });
        })();
    });

    it('should getUserByEmail a user by its ID', function(done) {
        inject([UserService], (service: UserService) => {
            userProvider
                .given('user exists in database')
                .uponReceiving('a request to getUserByEmail a user')
                .withRequest('GET', '/api/v1/users/email/' + (mock_db[0].email.toString()), {
                    'Accept': 'application/json'/*,
                    'Authorization': Pact.Match.somethingLike('Bearer eyJ0eXAiOi' +
                        'JKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjV9.jxJ' +
                        'FCXmk8SOCtmmHqczBlZZEra1qa8xly7zWZ42EnO4')*/
                })
                .willRespondWith(200, {
                    'Content-Type': 'application/json; charset=utf-8'
                }, Pact.Match.somethingLike(mock_db[0]));

            userProvider.run(done, function(runComplete) {
                service.getUserByEmail(mock_db[0].email)
                    .subscribe((res: any) => {
                        expect(res.status).toEqual(200);
                        done();
                    }, err => done.fail(err), () => {
                        runComplete();
                    });
            });
        })();
    });

    it('should verify a user by its ID', function(done) {
        inject([UserService], (service: UserService) => {
            userProvider
                .given('user exists in database')
                .uponReceiving('a request to verify a user')
                .withRequest('POST', '/api/v1/users/1/confirm_verification_code', {
                    'Accept': 'application/json'/*,
                    'Authorization': Pact.Match.somethingLike('Bearer eyJ0eXAiOi' +
                        'JKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjV9.jxJ' +
                        'FCXmk8SOCtmmHqczBlZZEra1qa8xly7zWZ42EnO4')*/
                }, { 'code': Pact.Match.somethingLike('12345') })
                .willRespondWith(200, {
                    'Content-Type': 'application/json; charset=utf-8'
                });

            userProvider.run(done, function(runComplete) {
                service.verifyUser(1, '12345')
                    .subscribe((res: any) => {
                        expect(res.status).toEqual(200);
                        done();
                    }, err => done.fail(err), () => {
                        runComplete();
                    });
            });
        })();
    });

    it('should create an OrganisationalRepresentative', function(done) {
        inject([UserService], (service: UserService) => {
                    let u: User = new User({
                        id: 3, email: 'admin1@aus.au', name: 'Joe Doe',
                        password: 'secure_password', role: ROLE.OrganisationalRepresentative
                    });
                    userProvider
                        .given('user does not exists in database')
                        .uponReceiving('a request to create OrganisationalRepresentative')
                        .withRequest('POST', '/api/v1' + service.getRoute(u), {
                            'Accept': 'application/json'
                        })
                        .willRespondWith(201, {
                            'Content-Type': 'application/json; charset=utf-8'
                        }, Pact.Match.somethingLike(123));

                    userProvider.run(done, function(runComplete) {

                        service.createUser(u)
                            .subscribe((res: any) => {
                                service.users.push(res.data);
                                done();
                            }, err => done.fail(err), () => {
                                runComplete();
                            });
                    });
        })();
    });

    it('should create an Accountant', function(done) {
        inject([UserService], (service: UserService) => {
                    let u: User = new User({
                        id: 3, email: 'admin1@aus.au', name: 'Joe Doe',
                        password: 'secure_password', role: ROLE.Accountant
                    });
                    userProvider
                        .given('user does not exists in database')
                        .uponReceiving('a request to create Accountant')
                        .withRequest('POST', '/api/v1' + service.getRoute(u), {
                            'Accept': 'application/json'
                        })
                        .willRespondWith(201, {
                            'Content-Type': 'application/json; charset=utf-8'
                        }, Pact.Match.somethingLike(123));

                    userProvider.run(done, function(runComplete) {

                        service.createUser(u)
                            .subscribe((res: any) => {
                                expect(res.status).toEqual(201);
                                done();
                            }, err => done.fail(err), () => {
                                runComplete();
                            });
                    });
        })();
    });

    it('should create an Client', function(done) {
        inject([UserService], (service: UserService) => {
                    let u: User = new User({
                        id: 3, email: 'admin1@aus.au', name: 'Joe Doe',
                        password: 'secure_password', role: ROLE.Client
                    });
                    userProvider
                        .given('user does not exists in database')
                        .uponReceiving('a request to create Client')
                        .withRequest('POST', '/api/v1' + service.getRoute(u), {
                            'Accept': 'application/json'
                        })
                        .willRespondWith(201, {
                            'Content-Type': 'application/json; charset=utf-8'
                        }, Pact.Match.somethingLike(123));

                    userProvider.run(done, function(runComplete) {

                        service.createUser(u)
                            .subscribe((res: any) => {
                                expect(res.status).toEqual(201);
                                done();
                            }, err => done.fail(err), () => {
                                runComplete();
                            });
                    });
        })();
    });

    it('should create an Interpreter', function(done) {
        inject([UserService], (service: UserService) => {
                    let u: User = new User({
                        id: 3, email: 'admin1@aus.au', name: 'Joe Doe',
                        password: 'secure_password', role: ROLE.Interpreter
                    });
                    userProvider
                        .given('user does not exists in database')
                        .uponReceiving('a request to create Interpreter')
                        .withRequest('POST', '/api/v1' + service.getRoute(u), {
                            'Accept': 'application/json'
                        })
                        .willRespondWith(201, {
                            'Content-Type': 'application/json; charset=utf-8'
                        }, Pact.Match.somethingLike(123));

                    userProvider.run(done, function(runComplete) {

                        service.createUser(u)
                            .subscribe((res: any) => {
                                expect(res.status).toEqual(201);
                                done();
                            }, err => done.fail(err), () => {
                                runComplete();
                            });
                    });
        })();
    });

    it('should logs in a registered user', function(done) {
        inject([UserService], (service: UserService) => {
                    let u: User = new User({
                        id: 3, email: 'admin1@aus.au', name: 'Joe Doe',
                        password: 'secure_password', role: ROLE.Interpreter
                    });
                    userProvider
                        .given('user alread exists in database')
                        .uponReceiving('a request to login Interpreter')
                        .withRequest('POST', '/api/v1/users/login', {
                            'Accept': 'application/json'
                        }, { 'auth': u })
                        .willRespondWith(200, {
                            'Content-Type': 'application/json; charset=utf-8'
                        }, {'jwt': Pact.Match.somethingLike(123)});

                    userProvider.run(done, function(runComplete) {

                        service.login(u)
                            .subscribe((res: any) => {
                                expect(res.status).toEqual(200);
                                done();
                            }, err => done.fail(err), () => {
                                runComplete();
                            });
                    });
        })();
    });

    it('should log out a registered user', function(done) {
        inject([UserService], (service: UserService) => {

                    userProvider
                        .given('user alread exists in database')
                        .uponReceiving('a request to logout Interpreter')
                        .withRequest('GET', '/api/v1/users/logout', {
                            'Accept': 'application/json'
                        })
                        .willRespondWith(200, {
                            'Content-Type': 'application/json; charset=utf-8'
                        });

                    userProvider.run(done, function(runComplete) {

                        service.logout()
                            .subscribe((res: any) => {
                                expect(res.status).toEqual(200);
                                done();
                            }, err => done.fail(err), () => {
                                runComplete();
                            });
                    });
        })();
    });


    it('should create an BookingOfficer', function(done) {
        inject([UserService], (service: UserService) => {
                    let u: User = new User({
                        id: 3, email: 'admin1@aus.au', name: 'Joe Doe',
                        password: 'secure_password', role: ROLE.BookingOfficer
                    });
                    userProvider
                        .given('user does not exists in database')
                        .uponReceiving('a request to create BookingOfficer')
                        .withRequest('POST', '/api/v1' + service.getRoute(u), {
                            'Accept': 'application/json'
                        })
                        .willRespondWith(201, {
                            'Content-Type': 'application/json; charset=utf-8'
                        }, Pact.Match.somethingLike(123));

                    userProvider.run(done, function(runComplete) {

                        service.createUser(u)
                            .subscribe((res: any) => {
                                service.users.push(res.data);
                                expect(res.status).toEqual(201);
                                done();
                            }, err => done.fail(err), () => {
                                runComplete();
                            });
                    });
        })();
    });

});
