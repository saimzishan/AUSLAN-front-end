/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { UserService } from './user.service';
import { GLOBAL } from '../shared/global';
import { User } from '../shared/model/user.entity';
import { ROLE } from '../shared/model/role.enum';
import {
    ResponseOptions,
    Response,
    Http, HttpModule,
    BaseRequestOptions,
    RequestMethod
} from '@angular/http';
import { } from 'jasmine';
import { authService } from '../shared/global';
import { RequestOptions } from '@angular/http';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
declare function require(name: string);
let Pact = require('pact-consumer-js-dsl');



let mock_response: Object[] = [
    new Object({
        id: Pact.Match.somethingLike(2) ,
        email: Pact.Match.somethingLike('admin1@aus.au'), first_name: 'Joe', last_name: 'Joe',
        mobile: 'xxxx xxx xxx', verified: false, disabled: false
    })
];

let count = 2;

let mock_db: User[] = [
    new User({
        id: 2, email: 'admin' + count++ + '@aus.au', first_name: 'Joe', last_name: 'Joe',
        mobile: 'xxxx xxx xxx', password: 'Secure_password@123', verified: false, disabled: false, role: ROLE.NONE
    }),
    new User({
        id: 2, email: 'admin' + count++ + '@aus.au', first_name: 'Joe', last_name: 'Joe',
        mobile: 'xxxx xxx xxx', password: 'Secure_password@123', verified: false, disabled: false, token: GLOBAL.FAKE_TOKEN
    })
];

let mock_db_reset_password: User =
    new User({
        id: 2, email: 'admin1@aus.au', first_name: 'Joe', last_name: 'Joe',
        mobile: 'xxxx xxx xxx', verified: false, disabled: false, role: ROLE.NONE
    });

    let mock_db_get_user_by_email = {
            id: 2, email: 'admin1@aus.au', first_name: 'Joe', last_name: 'Joe',
            mobile: 'xxxx xxx xxx', verified: false, disabled: false, type: 'BookingOfficer'
        };

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
            port: GLOBAL.MOCK_USER_SERVER_PORT,
            done: done
        });

        // This ensures your pact-mock-service is in a clean state before
        // running your test suite.
        // userProvider.resetSession(done);
        done();
    });


    afterAll(function (done) {
        userProvider.finalize()
            .then(function () { done(); }, function (err) { done.fail(err); });
    });

    it('should have valid http', inject([UserService], (service) => {
        expect(service.isValidHttp()).toEqual(true);
    }));

    it('should exists', function (done) {
        inject([UserService], (service: UserService) => {
            expect(service).toBeTruthy();
            done();
        })();
    });
    describe('Fetach All user Api', () => {

        it('should return a collection of users for fetch all users', function (done) {
            inject([UserService], (service: UserService) => {
                let int = userProvider
                    .given('there are users already added inside the database')
                    .uponReceiving('a request to get all users')
                    .withRequest({
                        method: 'GET',
                        path: '/api/v1/users',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        }
                    }
                    )
                    .willRespondWith(200, {
                        'Content-Type': 'application/json; charset=utf-8'
                    }, { 'users': Pact.Match.somethingLike(mock_response) });

                userProvider.run(done, function (runComplete) {
                    service.fetchUsers()
                        .subscribe((res: any) => {
                            expect(res.status).toEqual(200);
                            service.users = res.data.users;
                            expect(service.users.length).toBeGreaterThan(0);
                            done();
                        }, err => done.fail(err), () => {
                            runComplete();
                        });

                });
            })();
        });
    });

    it('should get an individual user by its *id*', function (done) {
        inject([UserService], (service: UserService) => {
            userProvider
                .given('user api should return user by its id')
                .uponReceiving('a request for singe users')
                .withRequest({
                    method: 'GET',
                    path: '/api/v1/users/2',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'

                    }
                }
                )
                .willRespondWith(200, {
                    'Content-Type': 'application/json; charset=utf-8'
                }, Pact.Match.somethingLike(mock_response[0]));

            userProvider.run(done, function (runComplete) {
                service.getUser(2)
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

    it('should throw 404 when trying to get user by its *id*', function (done) {
        inject([UserService], (service: UserService) => {
            userProvider
                .given('there are no users inside the database with that id')
                .uponReceiving('a request to get user by id')
                .withRequest({
                    method: 'GET',
                    path: '/api/v1/users/-1',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'

                    }
                })
                .willRespondWith(404);

            userProvider.run(done, function (runComplete) {
                service.getUser(-1)
                    .subscribe((res: any) => {
                        done.fail(res);
                    }, err => {
                        expect(err.status).toEqual(404); done();
                    }, () => {
                        runComplete();
                    });
            });
        })();
    });

    it('should update an existing users', function (done) {
        inject([UserService], (service: UserService) => {
            userProvider
                .given('user exists in database')
                .uponReceiving('a request to update a user, containing user object')
                .withRequest('PATCH', '/api/v1/users/2', {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }, { 'user': Pact.Match.somethingLike(mock_db[0]) }
                )
                .willRespondWith(204);

            userProvider.run(done, function (runComplete) {
                let u: User = mock_db[0];
                u.first_name = 'updated';

                let status_code = service.updateUser(u)
                    .subscribe((res: any) => {
                        expect(res.status).toEqual(204);
                        done();
                    }, err => done.fail(err), () => {
                        runComplete();
                    });

            });
        })();
    });

    it('should delete a user by its ID', function (done) {
        inject([UserService], (service: UserService) => {
            userProvider
                .given('user exists in database')
                .uponReceiving('a request to delete a user')
                .withRequest('DELETE', '/api/v1/users/2', {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'

                })
                .willRespondWith(204);

            userProvider.run(done, function (runComplete) {
                service.deleteUser(2)
                    .subscribe((res: any) => {
                        expect(res.status).toEqual(204);
                        done();
                    }, err => done.fail(err), () => {
                        runComplete();
                    });
            });
        })();
    });

    it('should resendVerificationCode a user by its ID', function (done) {
        inject([UserService], (service: UserService) => {
            userProvider
                .given('user exists in database')
                .uponReceiving('a request to resendVerificationCode a user')
                .withRequest('GET', '/api/v1/users/2/resend_verification_code', {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                    /*,
                                        'Authorization': Pact.Match.somethingLike('Bearer eyJ0eXAiOi' +
                                            'JKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjV9.jxJ' +
                                            'FCXmk8SOCtmmHqczBlZZEra1qa8xly7zWZ42EnO4')*/
                })
                .willRespondWith(200, {
                    'Content-Type': 'application/json; charset=utf-8'
                });

            userProvider.run(done, function (runComplete) {
                service.resendVerificationCode(2)
                    .subscribe((res: any) => {
                        expect(res.status).toEqual(200);
                        done();
                    }, err => done.fail(err), () => {
                        runComplete();
                    });
            });
        })();
    });


    it('should resetUser a user by its ID', function (done) {
        inject([UserService], (service: UserService) => {
            userProvider
                .given('user exists in database')
                .uponReceiving('a request to resetUser a user')
                .withRequest('GET', '/api/v1/users/reset_password/' + (mock_db_reset_password.email.toString()), {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'

                })
                .willRespondWith(200, {
                    'Content-Type': 'application/json; charset=utf-8'
                });

            userProvider.run(done, function (runComplete) {
                service.resetUser(mock_db_reset_password.email)
                    .subscribe((res: any) => {
                        expect(res.status).toEqual(200);
                        done();
                    }, err => done.fail(err), () => {
                        runComplete();
                    });
            });
        })();
    });

    it('should getUserByEmail a user by its ID', function (done) {
        inject([UserService], (service: UserService) => {
            userProvider
                .given('user exists in database')
                .uponReceiving('a request to getUserByEmail a user')
                .withRequest('GET', '/api/v1/users/email/' + (mock_db_get_user_by_email.email), {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                })
                .willRespondWith(200, {
                    'Content-Type': 'application/json; charset=utf-8'
                }, Pact.Match.somethingLike(mock_db_get_user_by_email));

            userProvider.run(done, function (runComplete) {
                service.getUserByEmail(mock_db_get_user_by_email.email)
                    .subscribe((res: any) => {
                        expect(res.status).toEqual(200);
                        done();
                    }, err => done.fail(err), () => {
                        runComplete();
                    });
            });
        })();
    });

    it('should verify a user by its ID', function (done) {
        inject([UserService], (service: UserService) => {
            userProvider
                .given('user exists in database')
                .uponReceiving('a request to verify a user')
                .withRequest('POST', '/api/v1/users/2/confirm_verification_code', {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }, { 'code': '12345' })
                .willRespondWith(200, {
                    'Content-Type': 'application/json; charset=utf-8'
                });

            userProvider.run(done, function (runComplete) {
                service.verifyUser(2, '12345')
                    .subscribe((res: any) => {
                        expect(res.status).toEqual(200);
                        done();
                    }, err => done.fail(err), () => {
                        runComplete();
                    });
            });
        })();
    });

    it('should add an assignment to an existing interpreter', function (done) {
        inject([UserService], (service: UserService) => {
            userProvider
                .given('interpreter exists in database')
                .uponReceiving('add an assignment')
                .withRequest('PATCH', '/api/v1/interpreters/2/update_assignment', {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }, Pact.Match.somethingLike({'assignment':
                    [{'category':
                        'Medical', 'name':
                        'Audiology', 'level':
                        2}]}))
                .willRespondWith(204, {
                    'Content-Type': 'application/json; charset=utf-8'
                });

            userProvider.run(done, function (runComplete) {
                service.updateInterpreterSkill(2, 'Medical', 'Medical', 2)
                    .subscribe((res: any) => {
                        expect(res.status).toEqual(204);
                        done();
                    }, err => done.fail(err), () => {
                        runComplete();
                    });
            });
        })();
    });

    it('should change a user password', function (done) {
        inject([UserService], (service: UserService) => {
            userProvider
                .given('user exists in database')
                .uponReceiving('a request to change a user')
                .withRequest('PUT', '/api/v1/users/2/update_password', {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }, Pact.Match.somethingLike({'current_password': 'Pass@1234' , 'new_password': 'Pass@12345' }))
                .willRespondWith(204, {
                    'Content-Type': 'application/json; charset=utf-8'
                });

            userProvider.run(done, function (runComplete) {
                service.updatePassword(2, 'Pass@1234', 'Pass@12345')
                    .subscribe((res: any) => {
                        expect(res.status).toEqual(204);
                        done();
                    }, err => done.fail(err), () => {
                        runComplete();
                    });
            });
        })();
    });

    it('should create an OrganisationalRepresentative', function (done) {
        inject([UserService], (service: UserService) => {
            let u: User = mock_db[0];
            u.role = ROLE.OrganisationalRepresentative;
            userProvider
                .given('user does not exists in database')
                .uponReceiving('a request to create OrganisationalRepresentative')
                .withRequest('POST', '/api/v1' + service.getRoute(u), {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'

                }, {'user': Pact.Match.somethingLike(u)})
                .willRespondWith(201, {
                    'Content-Type': 'application/json; charset=utf-8'
                }, Pact.Match.somethingLike({
  'id': 2731,
'type': 'OrganisationalRepresentative'
}));

            userProvider.run(done, function (runComplete) {

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

    it('should create an Accountant', function (done) {
        inject([UserService], (service: UserService) => {
            let u: User = mock_db[0];
            u.role = ROLE.Accountant;
            userProvider
                .given('user does not exists in database')
                .uponReceiving('a request to create Accountant')
                .withRequest('POST', '/api/v1' + service.getRoute(u), {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'

                }, {'user': Pact.Match.somethingLike(u)})
                .willRespondWith(201, {
                    'Content-Type': 'application/json; charset=utf-8'
                }, Pact.Match.somethingLike({
  'id': 2731,
  'type': 'Accountant'
}));


            userProvider.run(done, function (runComplete) {

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

    it('should create an Client', function (done) {
        inject([UserService], (service: UserService) => {
            let u: User = mock_db[0];
            u.role = ROLE.IndividualClient;
            userProvider
                .given('user does not exists in database')
                .uponReceiving('a request to create Client')
                .withRequest('POST', '/api/v1' + service.getRoute(u), {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'

                }, {'user': Pact.Match.somethingLike(u)})
                .willRespondWith(201, {
                    'Content-Type': 'application/json; charset=utf-8'
                }, Pact.Match.somethingLike({
  'id': 2731,
  'type': 'IndividualClient'
}));

            userProvider.run(done, function (runComplete) {

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

    it('should create an Interpreter', function (done) {
        inject([UserService], (service: UserService) => {
            let u: User = mock_db[0];
            u.role = ROLE.Interpreter;
            userProvider
                .given('user does not exists in database')
                .uponReceiving('a request to create Interpreter')
                .withRequest('POST', '/api/v1' + service.getRoute(u), {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'

                }, {'user': Pact.Match.somethingLike(u)})
                .willRespondWith(201, {
                    'Content-Type': 'application/json; charset=utf-8'
                }, Pact.Match.somethingLike({
  'id': 2731,
  'type': 'Interpreter'
}));

            userProvider.run(done, function (runComplete) {

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

    it('should logs in a registered user', function (done) {
        inject([UserService], (service: UserService) => {
            let u: User = new User({
                id: 3, email: 'admin1@aus.au', first_name: 'Joe',
                last_name: 'Doe',
                password: 'Secure_password@123', role: ROLE.Interpreter
            });
            userProvider
                .given('user alread exists in database')
                .uponReceiving('a request to login Interpreter')
                .withRequest('POST', '/api/v1/users/login', {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }, { 'auth': Pact.Match.somethingLike(u) })
                .willRespondWith(201, {
                    'Content-Type': 'application/json; charset=utf-8'
                }, Pact.Match.somethingLike({ 'jwt': '123' }));

            userProvider.run(done, function (runComplete) {

                service.login(u)
                    .subscribe((res: any) => {
                        expect(res.status).toEqual(201);
                        done();
                    }, err => done.fail(err), () => {
                        runComplete();
                    });
            });
        })();
    });

/** Commented for now to make server side work correctly */
/*
    it('should log out a registered user', function (done) {
        inject([UserService], (service: UserService) => {

            userProvider
                .given('user alread exists in database')
                .uponReceiving('a request to logout Interpreter')
                .withRequest('GET', '/api/v1/users/logout', {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'

                })
                .willRespondWith(200, {
                    'Content-Type': 'application/json; charset=utf-8'
                });

            userProvider.run(done, function (runComplete) {

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
*/

    it('should create an BookingOfficer', function (done) {
        inject([UserService], (service: UserService) => {
             let u: User = mock_db[0];
            u.role = ROLE.BookingOfficer;
            userProvider
                .given('user does not exists in database')
                .uponReceiving('a request to create BookingOfficer')
                .withRequest('POST', '/api/v1' + service.getRoute(u), {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'

                }, {'user': Pact.Match.somethingLike(u)})
                .willRespondWith(201, {
                    'Content-Type': 'application/json; charset=utf-8'
                }, Pact.Match.somethingLike({
  'id': 2731,
  'type': 'BookingOfficer'
}));

            userProvider.run(done, function (runComplete) {

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
