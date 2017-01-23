/* tslint:disable:no-unused-variable */

import {GLOBAL} from '../shared/global';
import { ApiService } from '../api/api.service';
import { MockBackend, MockConnection } from '@angular/http/testing';
import {User} from '../shared/model/user.entity';
import {ROLE} from '../shared/model/role.enum';
import {} from 'jasmine';
import { BrowserModule } from '@angular/platform-browser';

import {
    ResponseOptions,
    Response,
    Http, HttpModule,
    BaseRequestOptions,
    RequestMethod
} from '@angular/http';

import {
    TestBed, fakeAsync, inject, ComponentFixture, async
} from '@angular/core/testing';

const mockHttpProvider = {
        provide: Http,
        deps: [MockBackend, BaseRequestOptions],
        useFactory: (backend: MockBackend, defaultOptions: BaseRequestOptions) => {
           return new Http(backend, defaultOptions);
         }
    };


// globally loaded lodash
declare let _: any;
let mock_db: User[] = [
    new User(1, 'admin1@aus.au', 'Jane Doe', 'mockme', 'mockme', ROLE.SITE_ADMIN),
    new User(2, 'admin2@aus.au', 'Jane Doe', 'mockme', 'mockme', ROLE.SITE_ADMIN)
];
describe('ApiService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                ApiService
            ],
            imports: [
                HttpModule
            ]
        });
    });

    it('should construct', async(inject([ApiService], (service) => {
        expect(service).toBeDefined();
    })));
});

describe('ApiService (Mocked)', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                mockHttpProvider,
                MockBackend,
                BaseRequestOptions, ApiService],
            imports: [
                HttpModule, BrowserModule
            ]
        });
    });

    it('should construct', async(inject([ApiService, MockBackend], (service, mockBackend) => {

        expect(service).toBeDefined();
    })));

    it('should have no user', async(inject([ApiService, MockBackend], (service, mockBackend) => {
        expect(service.users.length).toEqual(0);
    })));

    it('should have valid http', async(inject([ApiService, MockBackend], (service, mockBackend) => {
        expect(service.isValidHttp()).toEqual(true);
    })));

    it('should fetch all users',
        fakeAsync(inject([ApiService, MockBackend, Http], (service: ApiService, backend: MockBackend, http: Http) => {
            backend.connections.subscribe(
                (c) => {

                    // return all Users GET: /User
                    if (c.request.url === GLOBAL.USER_API && c.request.method === RequestMethod.Get) {
                        let res = new Response(new ResponseOptions({
                            body: JSON.stringify(mock_db)
                        }));
                        c.mockRespond(res);
                    }
                }
            );
            expect(service.users.length).toEqual(0);
            service.fetchUsers();
            expect(service.users.length).toEqual(mock_db.length);

        })));

    it('should create a new users',
        fakeAsync(inject([ApiService, MockBackend, Http], (service: ApiService, backend: MockBackend, http: Http) => {
            backend.connections.subscribe(
                (c) => {

                    if (c.request.url === GLOBAL.USER_API
                        && c.request.method === RequestMethod.Post) {   // Add or update a User POST: /User
                        let data = JSON.parse(c.request._body);
                        let newUser: User = new User(data._id, data._email, data._name, data._pass, data._confirm_pass, data._role);
                        mock_db.push(newUser);
                        c.mockRespond(new Response(new ResponseOptions({
                            body: JSON.stringify(newUser)
                        })));
                    }
                }
            );
            const nou = mock_db.length;
            service.createUser(new User(3, 'admin1@aus.au', 'Joe Doe',
                'secure_password', 'secure_password', ROLE.SHITTY_DEVELOPER));
            expect(mock_db.length).toEqual(nou + 1);


        })));


    it('should get an individual user by its *id*',
        fakeAsync(inject([ApiService, MockBackend, Http], (service: ApiService, backend: MockBackend, http: Http) => {
            backend.connections.subscribe(
                (c) => {
                    let singleUserMatcher = /\/api\/v1\/users\/([0-9]+)/i;
                    if (singleUserMatcher.test(c.request.url)
                        && c.request.method === RequestMethod.Get) {   // Get existing User GET: /User
                        let UserId = c.request.url.match(singleUserMatcher)[1];
                        let existingUser = mock_db.filter(
                            (u: User) => { return u.id === Number(UserId); }
                        );
                        if (existingUser && existingUser.length === 1) {
                            c.mockRespond(new Response(new ResponseOptions({
                                body: JSON.stringify(existingUser[0])
                            })));
                        }
                    }
                }
            );
            expect(service.getUser(1)).toBeTruthy();

        })));

    it('should update an existing users',
        fakeAsync(inject([ApiService, MockBackend, Http], (service: ApiService, backend: MockBackend, http: Http) => {
            backend.connections.subscribe(
                (c) => {

                    if (c.request.url === GLOBAL.USER_API
                        && c.request.method === RequestMethod.Patch) {   // Add or update a User Patch: /User
                          let data = JSON.parse(c.request._body);
                          let newUser: User = new User(data._id, data._email, data._name, data._pass, data._confirm_pass, data._role);
                          let existingUser = mock_db.filter((u: User) => { return u.id === Number(newUser.id); });
                        if (existingUser && existingUser.length === 1) {
                            Object.assign(existingUser[0], newUser);

                            c.mockRespond(new Response(new ResponseOptions({
                                body: JSON.stringify(existingUser[0])
                            })));
                        }
                    }
                }
            );



            let u: User = service.updateUser(new User(3, 'admin1@aus.au', 'Joe Doe 3',
                'secure_password', 'secure_password', ROLE.SHITTY_DEVELOPER));
            expect(u.name).toEqual('Joe Doe 3');

        })));

    it('should delete a user by its ID',
        fakeAsync(inject([ApiService, MockBackend, Http], (service: ApiService, backend: MockBackend, http: Http) => {
            backend.connections.subscribe(
                (c) => {
                    let singleUserMatcher = /\/api\/v1\/users\/([0-9]+)/i;

                    if (singleUserMatcher.test(c.request.url)
                        && c.request.method === RequestMethod.Delete) {   // Delete User Delete: /User
                        let UserId = c.request.url.match(singleUserMatcher)[1];
                        let removeIndex = mock_db.map((u) => { return u.id; }).indexOf(Number(UserId));
                        mock_db.splice(removeIndex, 1);

                        c.mockRespond(new Response(new ResponseOptions({
                            body: JSON.stringify({})
                        })));
                    }
                }
            );
            const nou = mock_db.length;
            service.deleteUser(new User(3, 'admin1@aus.au', 'Joe Doe',
                'secure_password', 'secure_password', ROLE.SHITTY_DEVELOPER));
            expect(mock_db.length).toEqual(nou - 1);

        })));
});
