import {Injectable} from '@angular/core';
import {Headers, RequestOptions} from '@angular/http';
import {IndividualClient, OrganisationalRepresentative, User} from '../shared/model/user.entity';
import {ROLE} from '../shared/model/role.enum';
import {GLOBAL} from '../shared/global';
import {Observable} from 'rxjs/Observable';
import {ApiService} from './api.service';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/observable/throw';
import {AvailabilityBlock} from '../shared/model/availability-block.entity';

@Injectable()
export class UserService extends ApiService {
    public token: string;
    users: User[] = [];
    /*
      While this method seems to have no significance, Most of the method below would fail, if DI fails.
      Also when running test cases, mocking backend needs to ensure the HTTP is in provider and injector
     */
    isValidHttp(): boolean {
        return (this.http !== undefined || this.http !== null);
    }
    /*Only making it public for test case*/
    public getRoute(u: User): string {
        let route = '';

        switch (+u.role) {
            case ROLE.Organisation:
            case ROLE.OrganisationalRepresentative:
                route = '/organisational_representatives';
                break;

            case ROLE.Accountant:
                route = '/accountants';
                break;

            case ROLE.IndividualClient:
                route = '/individual_clients';
                break;

            case ROLE.BookingOfficer:
                route = '/booking_officers';
                break;

            case ROLE.Administrator:
                route = '/administrators';
                break;

            case ROLE.Interpreter:
                route = '/interpreters';
                break;

        }
        return route;
    }

    /*
      The Api should be able to create different type of users.
    */
    createUser(user: User): Observable<Object> {

        let headers = new Headers({'Accept': 'application/json',
            'Content-Type': 'application/json'});
        let options = new RequestOptions({ headers: headers });
        let obj = { 'user':
            user instanceof OrganisationalRepresentative ? (<OrganisationalRepresentative>user).toJSON() :
                    user instanceof IndividualClient ? (<IndividualClient>user).toJSON() :
                        user };

        return this.http.post(GLOBAL.USER_API_ENDPOINT + this.getRoute(user), JSON.stringify(obj), options)
            .map(this.extractData)
            .catch((err) => { return this.handleError(err); });
    }

    duplicateUser(toCreate: string, user: User): Observable<Object> {

                let headers = new Headers({'Accept': 'application/json',
                    'Content-Type': 'application/json'});
                let options = new RequestOptions({ headers: headers });
                let obj = { 'user':
                    user instanceof OrganisationalRepresentative ? (<OrganisationalRepresentative>user).jsonForDuplicate() :
                            user instanceof IndividualClient ? (<IndividualClient>user).toJSON() :
                                user };
                return this.http.post(GLOBAL.USER_API + '/' + toCreate, JSON.stringify(obj), options)
                    .map(this.extractData)
                    .catch((err) => { return this.handleError(err); });
    }
    /*
      The Api should be able to update already created users.
    */
    updateUser(user: User): Observable<Object> {

        let headers = new Headers({'Accept': 'application/json',
            'Content-Type': 'application/json'});
        let options = new RequestOptions({ headers: headers });
        let obj = { 'user':
            user instanceof OrganisationalRepresentative ? (<OrganisationalRepresentative>user).toJSON() :
                    user instanceof IndividualClient ? (<IndividualClient>user).toJSON() :
                        user };

        return this.http.patch(GLOBAL.USER_API + '/' + user.id, JSON.stringify(obj), options)
            .catch((err) => { return this.handleError(err); });

    }

    /*
      The Api should be able to fetch all the users.
    */
    fetchUsers(): Observable<Object> {
        let headers = new Headers({'Accept': 'application/json'});
        let options = new RequestOptions({ headers: headers });
        return this.http.get(GLOBAL.USER_API, options)
            .map(this.extractData)
            .catch((err) => { return this.handleError(err); });

    }

    /*
      The Api should be able to fetch all the users in paged response
    */
    fetchPaginatedUsers(page: number): Observable<Object> {
        let headers = new Headers({'Accept': 'application/json'});
        let options = new RequestOptions({ headers: headers });
        return this.http.get(GLOBAL.USER_API + '?page=' + page , options)
            .map(this.extractData)
            .catch((err) => { return this.handleError(err); });

    }
    /*
     The Api should be able to fetch all interpreters.
    */
    fetchUsersOfType(userType: string, otherParams = {}): Observable<Object> {
        const headers = new Headers({'Accept': 'application/json',
            'Content-Type': 'application/json'});
        let options = new RequestOptions({ headers: headers });
        options = Object.assign(options, otherParams);
        return this.http.get(GLOBAL.USER_API_ENDPOINT + '/' + userType , options)
            .map(this.extractData)
            .catch((err) => { return this.handleError(err); });

    }
    /*
         The Api should be able to fetch basic data for interpreters.
        */
    fetchBasicDetailsForInterpreter(page?: number): Observable<Object> {
        let headers = new Headers({'Accept': 'application/json',
            'Content-Type': 'application/json'});
        let options = new RequestOptions({ headers: headers });
        return this.http.get(GLOBAL.USER_API_ENDPOINT + '/interpreters/basic_list?page=' + page , options)
            .map(this.extractData)
            .catch((err) => { return this.handleError(err); });

    }
    /*
      The Api should be get user by its ID (The Id should be email)
    */
    getUser(id: number): Observable<Object> {
        let headers = new Headers({'Accept': 'application/json'});
        let options = new RequestOptions({ headers: headers });

        return this.http
            .get(GLOBAL.USER_API + '/' + id, options)
            .map(this.extractData)
            .catch((err) => { return this.handleError(err); });
    }


    /*
      The Api should be to verify user
    */
    verifyUser(userID: number, verifyCode: string): Observable<Object> {
        let headers = new Headers({'Accept': 'application/json',
            'Content-Type': 'application/json'});
        let options = new RequestOptions({ headers: headers });
        let obj = { 'code': verifyCode };

        return this.http
            .post(GLOBAL.USER_API + '/' + userID + '/confirm_verification_code' ,
             JSON.stringify(obj) , options) // Better add verify in path
            .catch((err) => { return Observable.throw(err); });
    }

    /*
      The Api should be to verify user
    */
    resendVerificationCode(userID: number): Observable<Object> {
        let headers = new Headers({'Accept': 'application/json'});
        let options = new RequestOptions({ headers: headers });

        return this.http
            .get(GLOBAL.USER_API + '/' + userID + '/resend_verification_code' , options)
            .catch((err) => { return Observable.throw(err); });
    }
    /*
     The Api should be used to assign preferred or blocked interpreters
   */
    assignPreferredInterpreter(userID: number, interpreters: Array<Object>): Observable<Object> {

        let headers = new Headers({'Accept': 'application/json',
            'Content-Type': 'application/json'});
        let options = new RequestOptions({ headers: headers });
        let obj = { 'interpreters' : interpreters};

        return this.http.put(GLOBAL.USER_API + '/' + userID + '/assign_interpreters/' , JSON.stringify(obj), options)
            .map(this.extractData)
            .catch((err) => { return this.handleError(err); });
    }
    /*
         The Api should be used to un-assign preferred or blocked interpreters
       */
    unassignPreferredInterpreter(userID: number, interpreters_id): Observable<Object> {

        let headers = new Headers({'Accept': 'application/json',
            'Content-Type': 'application/json'});
        let options = new RequestOptions({ headers: headers });

        return this.http.put(GLOBAL.USER_API + '/' + userID +
            '/assign_interpreters/' + interpreters_id, options)
            .map(this.extractData)
            .catch((err) => { return this.handleError(err); });
    }

    /*
      The Api should be to reset user password
    */
    resetUser( emailAddress: string): Observable<Object> {
        let headers = new Headers({'Accept': 'application/json'});
        let options = new RequestOptions({ headers: headers });

        return this.http
            .get(GLOBAL.USER_API + '/reset_password/' + (emailAddress)  , options) // Better add verify in path
            .catch((err) => { return Observable.throw(err); });
    }
    /*
      The Api should be get user by its ID (The Id should be email)
    */
    getUserByEmail(email: string): Observable<Object> {
        let headers = new Headers({'Accept': 'application/json'});
        let options = new RequestOptions({ headers: headers });

        return this.http
            .get(GLOBAL.USER_API + '/email/' + (email) , options)
            .map(this.extractData)
            .catch((err) => { return Observable.throw(err); });
    }
    /*
      The Api that should login the user
    */
    login(user: User): Observable<Object> {
        let headers = new Headers({'Accept': 'application/json',
        'Content-Type': 'application/json'});
        let options = new RequestOptions({ headers: headers });
        let obj = { 'auth': user };

        return this.http
            .post(GLOBAL.USER_API + '/login', JSON.stringify(obj), options)
            .map(this.extractData)
            .catch((err) => { return Observable.throw(err); });
    }
    /*
      The Api that should logout the user
    */
    logout(): Observable<Object> {
        let headers = new Headers({'Accept': 'application/json',
            'Content-Type': 'application/json'});
        let options = new RequestOptions({ headers: headers });

        return this.http
            .get(GLOBAL.USER_API + '/logout', options)
            .catch((err) => { return Observable.throw(err); });
    }
    /*
      The Api should be get user by its ID (The Id should be email)
    */
    deleteUser(id: number): Observable<Object> {
        let headers = new Headers({'Accept': 'application/json',
            'Content-Type': 'application/json'});
        let options = new RequestOptions({ headers: headers });

        return this.http
            .delete(GLOBAL.USER_API + '/' + id, options)
            .map(this.extractData)
            .catch((err) => { return Observable.throw(err); });

    }

    /*
     The Api should reset the current password
     */
    updatePassword(userID: number, current_password: string, new_password: string): Observable<Object> {
        let headers = new Headers({'Accept': 'application/json',
            'Content-Type': 'application/json'});
        let options = new RequestOptions({ headers: headers });
        let obj = { 'current_password': current_password , 'new_password': new_password };

        return this.http
            .patch(GLOBAL.USER_API + '/' + userID + '/update_password' ,
                JSON.stringify(obj) , options) // Better add verify in path
            .catch((err) => { return Observable.throw(err); });
    }

    /*
    * The api should add the blockout for interpreter
    */
    addBlockout(userID: number, availibilityBlock: AvailabilityBlock) {
        let headers = new Headers({'Accept': 'application/json',
            'Content-Type': 'application/json'});
        let options = new RequestOptions({ headers: headers });
        let obj = { 'availability_block': availibilityBlock };

        return this.http
            .post(GLOBAL.USER_API_ENDPOINT + '/interpreters/' + userID + '/availability_blocks' ,
                JSON.stringify(obj) , options) // Better add verify in path
            .catch((err) => { return Observable.throw(err); });
    }
    // ================= Added by Zeeshan yousaf ============================= //
    addStaffAvailabilities(userID: number, availibilityBlock: AvailabilityBlock) {
        let headers = new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        });
        let options = new RequestOptions({ headers: headers });
        let obj = { 'staff_availability': availibilityBlock };

        return this.http
            .post(GLOBAL.USER_API_ENDPOINT + '/interpreters/' + userID + '/staff_availabilities',
                JSON.stringify(obj), options) // Better add verify in path
            .catch((err) => { return Observable.throw(err); });
    }
    getStaffAvailabilities(userID: number) {
        let headers = new Headers({ 'Accept': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http
            .get(GLOBAL.USER_API_ENDPOINT + '/interpreters/' + userID + '/staff_availabilities', options)
            .map(this.extractData)
            .catch((err) => { return Observable.throw(err); });
    }

    editBlockout( userID: number, availabilityBlock: AvailabilityBlock) {
        let headers = new Headers({'Accept': 'application/json',
            'Content-Type': 'application/json'});
        let options = new RequestOptions({ headers: headers });
        let obj = { 'availability_block': availabilityBlock };

        return this.http
            .put(GLOBAL.USER_API_ENDPOINT + '/interpreters/' + userID + '/availability_blocks/' +
                availabilityBlock.id  ,
                JSON.stringify(obj) , options) // Better add verify in path
            .catch((err) => { return Observable.throw(err); });
    }
    editStaffAvailabilities(userID: number, availabilityBlock: AvailabilityBlock) {
        let headers = new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        });
        let options = new RequestOptions({ headers: headers });
        let obj = { 'staff_availability': availabilityBlock };

        return this.http
            .put(GLOBAL.USER_API_ENDPOINT + '/interpreters/' + userID + '/staff_availabilities/' +
                availabilityBlock.id,
                JSON.stringify(obj), options) // Better add verify in path
            .catch((err) => { return Observable.throw(err); });
    }

    deleteBlockout(userID: number, availability_block_id: number) {
        let headers = new Headers({'Accept': 'application/json',
            'Content-Type': 'application/json'});
        let options = new RequestOptions({ headers: headers });

        return this.http
            .delete(GLOBAL.USER_API_ENDPOINT + '/interpreters/' +
                userID + '/availability_blocks/' + availability_block_id ,
                options) // Better add verify in path
            .catch((err) => { return Observable.throw(err); });
    }
    deleteStaffAvailabilities(userID: number, availability_block_id: number) {
        let headers = new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        });
        let options = new RequestOptions({ headers: headers });

        return this.http
            .delete(GLOBAL.USER_API_ENDPOINT + '/interpreters/' +
            userID + '/staff_availabilities/' + availability_block_id,
                options) // Better add verify in path
            .catch((err) => { return Observable.throw(err); });
    }
}
