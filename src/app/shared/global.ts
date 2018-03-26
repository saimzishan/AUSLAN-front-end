import {environment} from '../../environments/environment';
import {AuthHttp, AuthConfig} from 'angular2-jwt';
import {Http, RequestOptions, URLSearchParams} from '@angular/http';
import {Interpreter, User} from './model/user.entity';

export interface ModalOptions {
    cancelTitle: string;
    okTitle: string;
    closeVal: string;
}
/* Change this class to use Using Application Providers import { Data } from "../../providers/data/data" */
export class GLOBAL {
    public static MOCK_BOOKING_SERVER_PORT = 1233;
    public static MOCK_USER_SERVER_PORT = 1234;
    public static RAILS_LOCAL_SERVER_PORT = 3000;

    public static BOOKING_JOB_INVITE =
        window.location.protocol + '//' + window.location.host + '/#' + '/booking-management/';

    public static LOG_LEVEL = 'INFO';
    public static USER_API_ENDPOINT = (environment.stage) ? 'https://auslan-staging.herokuapp.com/api/v1'
        : (environment.canary) ? 'https://auslan.herokuapp.com/api/v1' :
            (environment.localhost) ? `http://localhost:${GLOBAL.RAILS_LOCAL_SERVER_PORT}/api/v1` :
                (environment.test) ? `https://auslan-e2e-testing.herokuapp.com/api/v1` :
                    (environment.production) ? 'https://api.auslanconnections.com/api/v1' :
                    `http://localhost:${GLOBAL.MOCK_USER_SERVER_PORT}/api/v1`;
    public static BOOKING_API_ENDPOINT = (environment.stage) ? 'https://auslan-staging.herokuapp.com/api/v1'
        : (environment.canary) ? 'https://auslan.herokuapp.com/api/v1' :
            (environment.localhost) ? `http://localhost:${GLOBAL.RAILS_LOCAL_SERVER_PORT}/api/v1` :
                (environment.test) ? `https://auslan-e2e-testing.herokuapp.com/api/v1` :
                    (environment.production) ? 'https://api.auslanconnections.com/api/v1' :
                    `http://localhost:${GLOBAL.MOCK_BOOKING_SERVER_PORT}/api/v1`;
    public static USER_API = GLOBAL.USER_API_ENDPOINT + '/users';

    public static BOOKING_API = GLOBAL.BOOKING_API_ENDPOINT + '/bookings';
    public static TITLE = 'Auslan Booking System';
    public static VERSION = ' => 0.1.9'; // This should be broken into MAJOR and MINOR version?
    private static _currentUser: any;
    private static _interpreter: Interpreter;
    public static FAKE_TOKEN = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.' +
        'eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE0ODgxOTM0MTAsImV4cCI6MzMwNzY2M' +
        'zgyMTAsImF1ZCI6Ind3dy5wYWN0LmNvbSIsInN1YiI6Imthcm1hQHBhY3QuY29tIn0.lVWLJAYQRZcQTMtdDrxTHMwboSOqNQPISLDAKDkPy58';
    public static DSQ_STATES = ['ACT', 'NSW', 'QLD', 'NT', 'AUSTRALIAN\ CAPITAL\ TERRITORY', 'NEW\ SOUTH\ WALES', 'NORTHERN\ TERRITORY', 'QUEENSLAND'];
    public static VICDEAF_STATES = ['VIC', 'TAS', 'SA', 'WA', 'SOUTH\ AUSTRALIA', 'TASMANIA', 'VICTORIA', 'WESTERN\ AUSTRALIA'];
    public static GPO_ADDRESS_ONE = '350 Bourke Street, Melbourne VIC, 3000, Australia';
    public static GPO_ADDRESS_TWO = '261 Queens Street, Brisbane City QLD, 4000, Australia';
    public static MISSING_FIELDS_ERROR_MESSAGE = 'Oops! Please fill in all the fields correctly.';
    public static userStatusArray = [{name: 'Active'}, {name: 'Disabled'}];
    public static _extRefVal: URLSearchParams = new URLSearchParams();
    public static _filterVal: URLSearchParams = new URLSearchParams();
    public static _filterInterpreterVal: URLSearchParams = new URLSearchParams();
    public static _filterUserVal: URLSearchParams = new URLSearchParams();

    // UI Params
    public static selBookingID = '';

    public static getSearchParameter() {
        let p = new URLSearchParams();
        this._extRefVal.paramsMap.forEach((value: string[], key: string) => {
            for (let v of value) {
                p.set(key, v);
            }
        });
        this._filterVal.paramsMap.forEach((value: string[], key: string) => {
            for (let v of value) {
                p.set(key, v);
            }
        });
        return p;
    }

    public static getInterpreterSearchParameters() {
        let p = new URLSearchParams();
        this._filterInterpreterVal.paramsMap.forEach((value: string[], key: string) => {
            for (let v of value) {
                p.set(key, v);
            }
        });
        return p;
    }

    public static getUserSearchParameters() {
        let p = new URLSearchParams();
        this._filterUserVal.paramsMap.forEach((value: string[], key: string) => {
            for (let v of value) {
                p.set(key, v);
            }
        });
        return p;
    }

    public static get currentUser(): any {
        return this._currentUser;
    }

    public static set currentUser(user: any) {
        this._currentUser = user;
    }

    public static get currentInterpreter(): Interpreter {
        return this._interpreter;
    }

    public static set currentInterpreter(interpreter: Interpreter) {
        this._interpreter = interpreter;
    }
    static fixDateFormat(d: Date) {

        let dateStr = d.toString();
        dateStr = dateStr.substr(6, 4) +
            '-' + dateStr.substr(3, 2) +
            '-' + dateStr.substr(0, 2);

        return new Date(dateStr);

    }
}

export function authService(http: Http, options: RequestOptions) {
    return new AuthHttp(new AuthConfig({
        tokenName: 'jwt',
        noJwtError: true,
        tokenGetter: (() => localStorage.getItem('token')),
        globalHeaders: [{'Content-Type': 'application/json'}],
    }), http, options);
};
