import { environment } from '../../environments/environment';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { Http, RequestOptions } from '@angular/http';
import {User} from './model/user.entity';

export class GLOBAL {
    public static MOCK_SERVER_PORT = 3000;
    public static LOG_LEVEL = 'INFO';
    public static API_ENDPOINT = (environment.production) ? 'https://auslan.herokuapp.com/api/v1' :
        `http://localhost:${GLOBAL.MOCK_SERVER_PORT}/api/v1`;
    public static USER_API = GLOBAL.API_ENDPOINT + '/users';
    public static USER_API_DEPRECIATED = 'http://localhost:8080/api/v1/users/';

    public static BOOKING_API = GLOBAL.API_ENDPOINT + '/bookings';
    public static TITLE = 'Auslan Booking System';
    public static VERSION = ' => 0.1.9'; // This should be broken into MAJOR and MINOR version?
    public static currentUser: User;
}

export function authService(http: Http, options: RequestOptions) {
    return new AuthHttp(new AuthConfig({
        tokenName: 'jwt',
        noJwtError: true,
        tokenGetter: (() => sessionStorage.getItem('token')),
        globalHeaders: [{ 'Content-Type': 'application/json' }],
    }), http, options);
};
