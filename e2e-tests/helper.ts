import {execSync} from 'child_process';
import {environment} from '../src/environments/environment';
import {browser} from 'protractor';
/**
 * Created by hientran on 8/5/17.
 */
export class CONSTANT {

    static YES = 0;
    static NO = 1;
    static OPTION_NUM = 1;

}

export class User {
    private _email: string;
    private _pass: string;
    private _first_name: string;
    private _last_name: string;
    private _mobile_num: string;

    static user_type(type: string) {
        return type.replace(/ /g, '');
    }


    static returnValidUser(type: string) {
        let chosen_type = '';
        let valid_user;
        switch (type) {
            case 'Administrator':
                chosen_type = 'Administrator';
                valid_user = new Administrator('admin1@auslan.com.au', 'Abcd#1234');
                break;
            case 'Booking Officer':
                chosen_type = 'Booking Officer';
                valid_user = new BookingOfficer('bookingofficer@auslan.com.au', 'Abcd#1234');
                break;
            case 'Interpreter':
                chosen_type = 'Interpreter';
                valid_user = new Interpreter('interpreter@auslan.com.au', 'Abcd#1234');
                break;
            case 'Client':
                chosen_type = 'Individual Client';
                valid_user = new Client('client@auslan.com.au', 'Abcd#1234');
                break;
            case 'Organisational Representative':
                chosen_type = 'Organisational';
                valid_user = new Organisation('orgrepn@auslan.com.au', 'Abcd#1234');
                break;
        }
        valid_user.first_name = 'MOH';
        valid_user.last_name = 'JAY';
        valid_user.mobile_num = '0444 555 666';
        return {type: chosen_type, user: valid_user};
    }

    static returnTypeAndUser(type: string) {
        return User.returnValidUser(type);
    }

    static returnJSONForUser(type: string, i, user?: User) {
        const extend_email = User.user_type(type).toLowerCase();
        let email = 'mohjay_test_' + extend_email + /*( (i === 0) ? '' :*/ i.toString() /*)*/ + '@auslan.com.au';
        let password = 'Abcd#1234';
        let firstName = 'MOH';
        let lastName = 'JAY';
        let mobileNum = '0444 555 666';

        if (typeof user !== 'undefined') {
            email = user.email;
            password = user.pass;
            firstName = user.first_name;
            lastName = user.last_name;
            mobileNum = user.mobile_num;
        }
        console.log(email);

        // Similar for every user
        let data_to_sent = {};
        data_to_sent['type'] = type;
        data_to_sent['email'] = email;
        data_to_sent['password'] = password;
        data_to_sent['first_name'] = firstName;
        data_to_sent['last_name'] = lastName;
        data_to_sent['mobile'] = mobileNum;
        data_to_sent['verified'] = false;
        let billing_account_attributes_fields = {};
        let billing_address_attributes_fields = {};

        switch (type) {
            case 'Client':
                data_to_sent['send_email_on_receipt_of_request'] = true;
                data_to_sent['email_confirmation_on_interpreter_allocation'] = true;
                billing_account_attributes_fields['primary_contact_first_name'] = 'MOH';
                billing_account_attributes_fields['primary_contact_last_name'] = 'JAY';
                billing_account_attributes_fields['email_address'] = 'mohjay_client ' + i * 9 + 5 + '@auslan.com.au';
                billing_account_attributes_fields['account_number'] = (1111111 + (i * 4)).toString();
                billing_account_attributes_fields['preferred_billing_method_email'] = true;
                billing_address_attributes_fields['unit_number'] = i;
                billing_address_attributes_fields['street_number'] = i * 2 + 1;
                billing_address_attributes_fields['street_name'] = 'Flemington Road';
                billing_address_attributes_fields['suburb'] = 'Flemington Road';
                billing_address_attributes_fields['state'] = 'VIC';
                billing_address_attributes_fields['post_code'] = 3054 + i;
                billing_account_attributes_fields['address_attributes'] = billing_address_attributes_fields;
                data_to_sent['billing_account_attributes'] = billing_account_attributes_fields;
                break;
            case 'Interpreter':
                data_to_sent['date_of_birth'] = '20/05/1987';
                data_to_sent['naati_id'] = 1234;
                let address_attributes_fields = {};
                address_attributes_fields['unit_number'] = i;
                address_attributes_fields['street_number'] = i * 2 + 1;
                address_attributes_fields['street_name'] = 'Flemington Road';
                address_attributes_fields['suburb'] = 'Flemington Road';
                address_attributes_fields['state'] = 'VIC';
                address_attributes_fields['post_code'] = 3054 + i;
                data_to_sent['address_attributes'] = address_attributes_fields;
                break;
            case 'Organisational Representative':
                data_to_sent['send_email_on_receipt_of_request'] = true;
                data_to_sent['email_confirmation_on_interpreter_allocation'] = true;
                let organisation_attributes_fields = {};
                organisation_attributes_fields['abn'] = 13878943 + i;
                organisation_attributes_fields['name'] = 'CompanyName' + (i * 2).toString();
                organisation_attributes_fields['group_email'] = 'info_group_' + (i * 2).toString();
                organisation_attributes_fields['branch_office'] = 'Melbourne ' + (i * 2).toString();
                organisation_attributes_fields['phone_number'] = 'info_group_' + (i * 2).toString();
                organisation_attributes_fields['branch_office'] = 'Melbourne ' + (i * 2).toString();
                let organisation_address_attributes_fields = {};
                organisation_address_attributes_fields['unit_number'] = i;
                organisation_address_attributes_fields['street_number'] = i * 2 + 1;
                organisation_address_attributes_fields['street_name'] = 'Flemington Road';
                organisation_address_attributes_fields['suburb'] = 'Flemington Road';
                organisation_address_attributes_fields['state'] = 'VIC';
                organisation_address_attributes_fields['post_code'] = 3054 + i;
                organisation_attributes_fields['address_attributes'] = organisation_address_attributes_fields;

                let org_billing_account_attributes_fields = {};
                org_billing_account_attributes_fields['primary_contact_first_name'] = 'MOH';
                org_billing_account_attributes_fields['primary_contact_last_name'] = 'JAY';
                org_billing_account_attributes_fields['email_address'] = 'mohjay_client ' + i * 9 + 5 + '@auslan.com.au';
                org_billing_account_attributes_fields['account_number'] = (1111111 + (i * 4)).toString();
                org_billing_account_attributes_fields['preferred_billing_method_email'] = true;
                let org_billing_address_attributes_fields = {};
                org_billing_address_attributes_fields['unit_number'] = i;
                org_billing_address_attributes_fields['street_number'] = i * 2 + 1;
                org_billing_address_attributes_fields['street_name'] = 'Flemington Road';
                org_billing_address_attributes_fields['suburb'] = 'Flemington Road';
                org_billing_address_attributes_fields['state'] = 'VIC';
                org_billing_address_attributes_fields['post_code'] = 3054 + i;
                org_billing_account_attributes_fields['address_attributes'] = org_billing_address_attributes_fields;
                organisation_attributes_fields['billing_account_attributes'] = org_billing_account_attributes_fields;
                data_to_sent['organisation_attributes'] = organisation_attributes_fields;
                break;
            default:
                break;
        }

        return data_to_sent;
    }

    constructor(email: string, pass: string, first_name?: string, last_name?: string, mobile_num?: string) {
        this._email = email;
        this._pass = pass;
        this._first_name = first_name;
        this._last_name = last_name;
        this._mobile_num = mobile_num;
    }

    set email(value: string) {
        this._email = value;
    }

    set pass(value: string) {
        this._pass = value;
    }

    set first_name(value: string) {
        this._first_name = value;
    }

    set last_name(value: string) {
        this._last_name = value;
    }

    set mobile_num(value: string) {
        this._mobile_num = value;
    }

    get email(): string {
        return this._email;
    }

    get pass(): string {
        return this._pass;
    }

    get first_name(): string {
        return this._first_name;
    }

    get last_name(): string {
        return this._last_name;
    }

    get mobile_num(): string {
        return this._mobile_num;
    }
}


export class Organisation extends User {
}


export class Interpreter extends User {
}


export class Client extends User {
}


export class BookingOfficer extends User {
}


export class Administrator extends User {
}

export class Heroku {

    static sendCommandToHeroku(command) {
        const exec = require('child_process').execSync;
        let herokuCommand = browser.params.env === 'localhost' ?
            'cd ../booking-system-api/ && echo  \'' + command + ';exit\' | bundle exec rails c && cd ../booking-system-frontend/' :
            'echo  \'' + command + ';exit\' | heroku run console --app auslan-e2e-testing';
        console.log(browser.params.env);
        console.log(herokuCommand);

        exec(herokuCommand
            , (o1, o2, o3) => {
                console.log('Heroku Command => Output', o1);
                console.log('Heroku Command => StdError', o2);
                console.log('Heroku Command => Error', o3);

            });
    }

    static createSingleBooking() {
        const data = new Object({
            'venue': 'Fed Square',
            'requested_by_first_name': 'Georgious',
            'requested_by_last_name': 'Chara',
            'nature_of_appointment': 'Medical',
            'specific_nature_of_appointment': 'Audiology',
            'contact_first_name': 'Hadrian',
            'contact_last_name': 'French',
            'contact_email': 'a@a.com',
            'contact_phone_number': '03 2342 2343',
            'deaf_persons_first_name': 'Clifford',
            'deaf_persons_last_name': 'Waz',
            'deaf_persons_mobile': '0444 555 666',
            'deaf_persons_email': 'clifford@vicdeaf.org.au',
            'deaf_persons_eaf_no': '1231 0900',
            'number_of_people_attending': 1,
            'number_of_interpreters_required': 1,
            'start_time': '2017-08-05T09: 01: 26.298+00: 00',
            'end_time': '2017-08-05T10: 01: 26.298+00: 00',
            'billing_account_attributes': {
                'primary_contact_first_name': 'Paul',
                'primary_contact_last_name': 'Biller',
                'primary_contact_email': 'a@a.com',
                'primary_contact_phone_number': '0482 232 232',
                'account_number': 'ABCD-1234',
                'preferred_billing_method_email': false,
                'external_reference': 'Curve and Sanj',
                'address_attributes': {
                    'unit_number': 'Curve Tomorrow',
                    'street_number': 'L4 West RCH',
                    'street_name': '50 Flemington Rd',
                    'suburb': 'Parkville',
                    'state': 'VIC',
                    'post_code': '3025'
                }
            },
            'address_attributes': {
                'unit_number': 'Curve Tomorrow',
                'street_number': 'L4 West RCH',
                'street_name': '50 Flemington Rd',
                'suburb': 'Parkville',
                'state': 'VIC',
                'post_code': '3025'
            },
            'parking_availability': 'None - Use the Tram',
            'bookable_id': 1,
            'bookable_type': 'Administrator'
        });
        let command = 'Booking.create(' + JSON.stringify(data) + ')';
        Heroku.sendCommandToHeroku(command);

    }

    static createSingleUser(data) {
        let return_command = '';
        let userType = User.user_type(data.type);
        // delete the key type
        delete data.type;
        return_command += 'a = ' + userType + '.create(' + JSON.stringify(data) +  ')';
        return return_command;
    }

    static createBulkUsers(numberOfUser: string, active: string, type: string) {
        const num_of_user = parseInt(numberOfUser, 10);
        for (let i = 0; i < num_of_user; i++) {
            let verified = (active === 'active');
            const data_to_sent = User.returnJSONForUser(type, i);
            const command = Heroku.createSingleUser(data_to_sent);
            Heroku.sendCommandToHeroku(command);
            Heroku.sendCommandToHeroku(User.user_type(type) + '.find_by_email!(params[:' + data_to_sent['email'] +
                ']).update_attributes(verified:' + true + ')');
        }
    }

    static addVerifiedUser(valid_login_user: User, type: string) {
        Heroku.createUser(valid_login_user, type);
        Heroku.sendCommandToHeroku(User.user_type(type) + '.find_by_email!(params[:' + valid_login_user.email +
            ']).update_attributes(verified:' + true + ')');
    }

    static createUser(valid_login_user: User, type: string) {
        const data_to_sent = User.returnJSONForUser(type, 1, valid_login_user);
        const command = Heroku.createSingleUser(data_to_sent);
        Heroku.sendCommandToHeroku(command);
    }

}
