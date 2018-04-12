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
    public type: string;

    static user_type(type: string) {
        return type.replace(/ /g, '').replace(/[0-9]/g, '');
    }

    static returnValidUser(type: string) {
        let chosen_type = '';
        let valid_user;
        switch (type.trim()) {
            case 'Administrator':
                chosen_type = 'Administrator';
                valid_user = new Administrator('robin@auslan.com.au', 'Abcd#1234');
                break;
            case 'Accountant':
                chosen_type = 'Accountant';
                valid_user = new Administrator('george@auslan.com.au', 'Abcd#1234');
                break;
            case 'Booking Officer':
                chosen_type = 'Booking Officer';
                valid_user = new BookingOfficer('frank@auslan.com.au', 'Abcd#1234');
                break;
            case 'Interpreter':
                chosen_type = 'Interpreter';
                valid_user = new Interpreter('dragana@auslan.com.au', 'Abcd#1234');
                break;
            case 'Interpreter1':
                chosen_type = 'Interpreter';
                valid_user = new Interpreter('dragana_2@auslan.com.au', 'Abcd#1234');
                break;
            case 'Interpreter2':
                chosen_type = 'Interpreter';
                valid_user = new Interpreter('dragana_3@auslan.com.au', 'Abcd#1234');
                break;
            case 'Individual Client':
                chosen_type = 'Individual Client';
                valid_user = new Client('ted@auslan.com.au', 'Abcd#1234');
                break;
            case 'Organisational Representative':
                chosen_type = 'Organisational';
                valid_user = new Organisation('alana@auslan.com.au', 'Abcd#1234');
                break;
        }
        valid_user.first_name = valid_user.email.replace('@auslan.com.au', '');
        valid_user.last_name = chosen_type;
        valid_user.mobile_num = '0444555666';
        return {type: chosen_type, user: valid_user};
    }

    static returnTypeAndUser(type: string) {
        return User.returnValidUser(type);
    }

    static returnJSONForUser(type: string, i, user?: User) {
        const extend_email = User.user_type(type).toLowerCase();
        let email = 'george' + extend_email + /*( (i === 0) ? '' :*/ i.toString() /*)*/ + '@auslan.com.au';
        let password = 'Abcd#1234';
        let firstName = 'MOH';
        let lastName = 'JAY';
        let mobileNum = '0444555666';
        let stateWhereMostBookingsOccur = 'TAS';

        if (typeof user !== 'undefined') {
            email = user.email;
            password = user.pass;
            firstName = user.first_name;
            lastName = user.last_name;
            mobileNum = user.mobile_num;
        }

        // Similar for every user
        let data_to_sent = {};
        data_to_sent['type'] = type;
        data_to_sent['email'] = email;
        data_to_sent['password'] = password;
        data_to_sent['first_name'] = firstName;
        data_to_sent['last_name'] = lastName;
        data_to_sent['mobile'] = mobileNum;
        data_to_sent['verified'] = false;
        data_to_sent['state_where_most_bookings_occur'] = stateWhereMostBookingsOccur;

        let address_attributes_fields = {};
        address_attributes_fields['unit_number'] = 22;
        address_attributes_fields['street_number'] = 62;
        address_attributes_fields['street_name'] = 'Flemington Road';
        address_attributes_fields['suburb'] = 'Parkville';
        address_attributes_fields['state'] = 'VIC';
        address_attributes_fields['post_code'] = 3054;

        let billing_account_attributes_fields = {};

        switch (type) {
            case 'Individual Client':
                data_to_sent['business_hours_phone'] = data_to_sent['mobile'];
                billing_account_attributes_fields['primary_contact_first_name'] = 'MOH';
                billing_account_attributes_fields['primary_contact_last_name'] = 'JAY';
                billing_account_attributes_fields['primary_contact_email'] = 'mohjay_client@auslan.com.au';
                billing_account_attributes_fields['primary_contact_phone_number'] = '0490000001';
                billing_account_attributes_fields['account_number'] = (12345).toString();
                billing_account_attributes_fields['address_attributes'] = address_attributes_fields;
                data_to_sent['address_attributes'] = address_attributes_fields;
                data_to_sent['billing_account_attributes'] = billing_account_attributes_fields;
                break;
            case 'Interpreter':
            case 'Interpreter1':
            case 'Interpreter2':
                data_to_sent['date_of_birth'] = '20/05/1987';
                data_to_sent['naati_id'] = 12345;
                address_attributes_fields['state'] = type === 'Interpreter1' ? 'WA' : 'VIC';
                address_attributes_fields['post_code'] = type === 'Interpreter1' ? 3054 : 6064;
                data_to_sent['address_attributes'] = address_attributes_fields;
                data_to_sent['skill_level'] = 'Recognised';
                break;
            case 'Organisational Representative':
                data_to_sent['business_hours_phone'] = data_to_sent['mobile'];
                let organisation_attributes_fields = {};
                organisation_attributes_fields['abn'] = 12345678900;
                organisation_attributes_fields['name'] = 'Curve Tomorrow';
                organisation_attributes_fields['group_email'] = 'group@ct.com.au';
                organisation_attributes_fields['branch_office'] = 'Melbourne';
                organisation_attributes_fields['phone_number'] = '049090001';
                organisation_attributes_fields['preferred_contact_method'] = 'EMAIL';

                organisation_attributes_fields['address_attributes'] = address_attributes_fields;

                let org_billing_account_attributes_fields = {};
                org_billing_account_attributes_fields['primary_contact_first_name'] = 'MOH';
                org_billing_account_attributes_fields['primary_contact_last_name'] = 'JAY';
                org_billing_account_attributes_fields['primary_contact_email'] = 'mohjay_client@auslan.com.au';
                org_billing_account_attributes_fields['primary_contact_phone_number'] = '0490000001';
                org_billing_account_attributes_fields['account_number'] = (12346).toString();
                org_billing_account_attributes_fields['preferred_billing_method_email'] = true;
                org_billing_account_attributes_fields['external_reference'] = 1233;

                org_billing_account_attributes_fields['address_attributes'] = address_attributes_fields;
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


export class Accountant extends User {
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


export class Booking {

    private static what_will_be_discussed = new Object({
        'CONFERENCE/FORUM': [
            'COMMUNITY CONSULTATION',
            'CONFERENCE (PLEASE SPECIFY IN NOTES)',
            'CREATIVE ARTS / FESTIVAL',
            'EXPO',
            'INFORMATION SESSION',
            'OTHER',
            'RALLY/PROTEST'
        ],
        'COUNSELLING': [
            'FAMILY',
            'FINANCIAL',
            'INDIVIDUAL',
            'MARRIAGE',
            'OTHER'
        ],
        'COURT': [
            'CHILDREN AND FAMILY COURT - MENTION',
            'CHILDREN AND FAMILY COURT – CONTESTED HEARING/DHS',
            'CHILDREN AND FAMILY COURT – INTERVENTION ORDER',
            'CHILDREN AND FAMILY COURT – MEDIATION',
            'CORONERS - DIRECTIONS',
            'CORONERS - INQUEST',
            'COUNTY/SUPREME – DIRECTIONS',
            'COUNTY/SUPREME – TRIAL',
            'DHS ORDER',
            'MAGISTRATES - CONTESTED HEARING',
            'MAGISTRATES - CRIMINAL',
            'MAGISTRATES - INTERVENTION ORDER',
            'MAGISTRATES - MENTION',
            'MENTAL HEALTH COURT',
            'OTHER'
        ],
        'EDUCATION': ['CHILDCARE',
            'EARLY INTERVENTION',
            'KINDERGARTEN',
            'PRIMARY SCHOOL – GRADUATION',
            'PRIMARY SCHOOL – OTHER',
            'PRIMARY SCHOOL – PARENT MEETING/INFORMATION SESSION',
            'PRIMARY SCHOOL – STAFF MEETING',
            'SECONDARY SCHOOL - GRADUATION',
            'SECONDARY SCHOOL – OTHER',
            'SECONDARY SCHOOL – PARENT MEETING/INFORMATION SESSION',
            'SECONDARY SCHOOL – STAFF MEETING',
            'TAFE - GRADUATION',
            'TAFE – PRACTICAL',
            'TAFE – THEORETICAL',
            'UNIVERSITY - GRADUATION',
            'UNIVERSITY – DEAF LECTURER',
            'UNIVERSITY – LECTURE',
            'UNIVERSITY – MEETING',
            'UNIVERSITY – PRACTICAL/TUTORIAL',
            'OTHER'],
        'EMPLOYMENT': ['JOB INTERVIEW – COMPLEX/DEAF PROFESSIONAL',
            'JOB INTERVIEW – ENTRY LEVEL',
            'MEETING - BOARD',
            'MEETING – 1:1',
            'MEETING – COACHING/MENTORING',
            'MEETING – HUMAN RESOURCES',
            'MEETING – LARGE GROUP (5 OR MORE)',
            'MEETING AT EMPLOYMENT SERVICE / WITH EMPLOYMENT CONSULTANT',
            'TRAINING SESSION',
            'OTHER'],
        'HUMAN SERVICES': [
            'CENTRELINK',
            'CHILD PROTECTION',
            'CRISIS/EMERGENCY',
            'HOME VISIT',
            'HOUSING',
            'OTHER'],
        'LEGAL/TRIBUNAL': ['ANTI-DISCRIMINATION',
            'FORENSIC ASSESSMENT',
            'GUARDIANSHIP',
            'MEDIATION',
            'MEETING – SOLICITOR/LAWYER',
            'PRISON VISIT',
            'TRIBUNAL',
            'WORK COVER',
            'OTHER'],
        'MEDIA': ['INTERVIEW – OTHER',
            'INTERVIEW – RADIO',
            'INTERVIEW – TELEVISION',
            'MEDIA CONFERENCE',
            'OTHER'],
        'MEDICAL': ['AUDIOLOGY',
            'COMPLIMENTARY MEDICINE (PLEASE SPECIFY IN NOTES)',
            'DENTAL',
            'DIETICIAN',
            'EMERGENCY',
            'FAMILY PLANNING',
            'GP',
            'HOME VISIT',
            'HOSPITAL CLINICS (PLEASE SPECIFY IN NOTES)',
            'IN-PATIENT (PLEASE SPECIFY IN NOTES)',
            'MEDICAL IMAGING',
            'MEN\'S HEALTH',
            'ONCOLOGY',
            'OPTOMETRIST',
            'PAEDIATRIC',
            'PALLIATIVE CARE',
            'PHYSICAL THERAPY (PLEASE SPECIFY IN NOTES)',
            'REHABILITATION (PLEASE SPECIFY IN NOTES)',
            'SEXUAL HEALTH',
            'SPECIALIST (PLEASE SPECIFY IN NOTES)',
            'SPEECH THERAPY',
            'WOMEN’S HEALTH',
            'OTHER'],
        'MENTAL HEALTH': ['ASSESSMENT',
            'FORENSIC ASSESSMENT',
            'HOME VISIT',
            'MEDICATION APPOINTMENT',
            'MENTAL HEALTH REVIEW BOARD',
            'ONGOING APPOINTMENT (PLEASE SPECIFY LENGTH IN NOTES)',
            'PSYCHIATRY',
            'PSYCHOLOGY',
            'OTHER'],
        'POLICE': ['ARREST',
            'INTERVIEW – ACCUSED',
            'INTERVIEW – VICTIM',
            'STATEMENT – ACCUSED',
            'STATEMENT – VICTIM',
            'WARRANT',
            'OTHER'],
        'SOCIAL/PRIVATE': [
            'ACCOUNTANT',
            'BAPTISM',
            'BODY CORPORATE MEETING',
            'CHURCH SERVICE',
            'FAMILY CELEBRATION',
            'FINANCIAL ADVISOR',
            'FUNERAL – FULL MASS',
            'FUNERAL – NON RELIGIOUS',
            'FUNERAL – SERVICE',
            'HEALTH AND LIFESTYLE',
            'SCHOOL PLAY',
            'SPORTS CLUB',
            'WEDDING',
            'OTHER'],
        'THEATRE': [
            'ADULTS ONLY',
            'COMEDY',
            'COMMUNITY',
            'SCHOOL',
            'STAGE SHOW',
            'OTHER'],
        'OTHER': ['PLEASE SPECIFY IN NOTES'],
        'NONE': []
    });

    static getWhatWillBeDiscussed(nature: string) {
        const obj = this.what_will_be_discussed;
        let returnVal = (obj.hasOwnProperty(nature)) ? obj[nature] : [];
        return returnVal;
    }
}


export class Heroku {

    static sendCommandToHeroku(command) {
        const exec = require('child_process').execSync;
        console.log(command);
        command = 'ActiveRecord::Base.logger.level = Logger::INFO;' + command + ';nil;exit';
        let herokuCommand = 'cd ../booking-system-api/ && echo  \'' + command + '\' | bundle exec rails c && cd ../booking-system-frontend/';
        exec(herokuCommand);
    }

    static sendTaskToHeroku(task) {
        const exec = require('child_process').execSync;
        let herokuCommand = 'cd ../booking-system-api/ && bundle exec rails ' + task + ' && cd ../booking-system-frontend/';

        exec(herokuCommand, (o1, o2, o3) => {
            console.log('Heroku Command => Output', o1);
            console.log('Heroku Command => StdError', o2);
            console.log('Heroku Command => Error', o3);
        });
    }

    static updateInterpretersPreference(order: string, count: string, preference: string) {
        let task = 'seed:test_data:interpreters:allocate[' + order + ',' + count + ',' + preference + ']';
        Heroku.sendTaskToHeroku(task);
    }
    static updateInterpretersSkillLevel(order: string, count: string, skill: string) {
        let task = 'seed:test_data:interpreters:skill[' + order + ',' + count + ',' + skill + ']';
        Heroku.sendTaskToHeroku(task);
    }
    static updateInterpretersTravelPayStatus(order: string, count: string, status: string) {
        let task = 'seed:test_data:interpreters:travel_pay[' + order + ',' + count + ',' + status + ']';
        Heroku.sendTaskToHeroku(task);
    }
    static createInterpreterOfType (type: string) {
        // blocked, booked, blockout
        let task = 'seed:test_data:preload_booking:with_' + type + '_interpreter'; // Will create one booking with one interpreter as type
        Heroku.sendTaskToHeroku(task);
    }

    static runAllBackgroundTasks() {
        const command = 'Delayed::Job.all.map(&:invoke_job)';
        Heroku.sendCommandToHeroku(command);
    }

    static createSingleBooking() {
        const data = Heroku.createBooking(1);
        let command = 'b = Booking.new(' + JSON.stringify(data) + '); b.bookable = IndividualClient.first; b.save';
        Heroku.sendCommandToHeroku(command);
    }

    static createSingleBookingWithMoreInterpreter() {
        const data = Heroku.createBooking(2);
        let command = 'b = Booking.new(' + JSON.stringify(data) + '); b.bookable = IndividualClient.first; b.save';
        Heroku.sendCommandToHeroku(command);
    }

    static createBulkBookings(count: string) {
        let command = 'i=IndividualClient.first;FactoryGirl.create(:ted_individual_client) if !i;';
        command += 'Time.zone = "Hobart";FactoryGirl.create_list(:booking, ' + count
            + ', bookable: IndividualClient.first, start_time: Date.today.next_week.beginning_of_day + 9.hours, end_time: Date.today.next_week.beginning_of_day + 11.hours)';
        Heroku.sendCommandToHeroku(command);
    }
    static setInterpreterType(type: string) {
       let command = 'i=Interpreter.first;';
        command += 'i.update_attributes(employment_type: ' + type + ');';
        command += 'i.save;';
        Heroku.sendCommandToHeroku(command);
    }

    static createBulkBookingsWithLinkId(count: number, negate: string) {
        const newLinkIdRequired = String(!(negate === 'out'));
        let command = 'i=IndividualClient.first;FactoryGirl.create(:ted_individual_client) if !i;';
        command += 'FactoryGirl.create_list(:booking, ' + count + ', bookable: IndividualClient.first, new_link_id_required: ' + newLinkIdRequired + ')';
        Heroku.sendCommandToHeroku(command);
    }

    static preloadOrgBookings() {
        let task = 'seed:test_data:preloaded_org_bookings';
        Heroku.sendTaskToHeroku(task);
    }

    static preloadVerifiedInterpreters(count: string) {
        let task = 'seed:test_data:preloaded_interpreters[' + count + ']';
        Heroku.sendTaskToHeroku(task);
    }

    static preloadAllTypesVerifiedUsers() {
        let task = 'seed:test_data:preload_users:all_types';
        Heroku.sendTaskToHeroku(task);
    }

    static createSingleUser(data) {
        let return_command = '';
        let userType = User.user_type(data.type);
        delete data.type;
        return_command += 'a = ' + userType + '.create(' + JSON.stringify(data) + ')';
        return return_command;
    }

    static createBulkUsers(numberOfUser: string, active: string, type: string) {
        const num_of_user = parseInt(numberOfUser, 10);
        for (let i = 0; i < num_of_user; i++) {
            let verified = (active === 'active');
            const data_to_sent = User.returnJSONForUser(type, i);
            const command = Heroku.createSingleUser(data_to_sent);
            Heroku.sendCommandToHeroku(command);
            Heroku.sendCommandToHeroku(User.user_type(type) + '.find_by(email: "' + data_to_sent['email'] +
                '").update_attributes(verified:' + true + ')');
        }
    }

    static verifyAllInterpreter() {
        Heroku.sendCommandToHeroku('Interpreter.first.update_attributes(verified:' + true + ')');
    }

    static setUserStatus(status: string, record: string, userType: string) {
        let user = {
            'Accountant': 'Accountant',
            'Administrator': 'Administrator',
            'Booking Officer': 'BookingOfficer',
            'Individual Client': 'IndividualClient',
            'Interpreter': 'Interpreter',
            'Organisational Representative': 'OrganisationalRepresentative'
        }[userType];

        let updatableFields = '';
        switch (status) {
            case 'disabled':
                updatableFields = 'disabled: true';
                break;
            case 'unverified':
                updatableFields = 'disabled: false, verified: false';
                break;
            case 'active':
                updatableFields = 'disabled: false, verified: true';
                break;
        }
        const command = user + '.' + record + '.update_attributes(' + updatableFields + ')';
        Heroku.sendCommandToHeroku(command);
    }

    static createBulkAdministrator(numberOfUser: string) {
        const num_of_user = parseInt(numberOfUser, 10);
        for (let i = 0; i < num_of_user; i++) {
            const data_to_sent = User.returnJSONForUser('Administrator', i);
            const command = Heroku.createSingleUser(data_to_sent);
            Heroku.sendCommandToHeroku(command);
        }
    }

    static addVerifiedUser(valid_login_user: User, type: string) {
        Heroku.createUser(valid_login_user, type);
        Heroku.setUserStatus('active', 'last', type.replace(/[0-9]/g, ''));
    }

    static createUser(valid_login_user: User, type: string) {
        const data_to_sent = User.returnJSONForUser(type, 1, valid_login_user);
        const command = Heroku.createSingleUser(data_to_sent);
        Heroku.sendCommandToHeroku(command);
    }

    static inviteInterpreter() {
        let command = 'b=Booking.first;';
        command += 'i=Interpreter.first;';
        command += 'b.interpreter_ids=[i.id];';
        command += 'b.add_interpreters_to_booking;';
        command += 'b.invite_url = "' + browser.baseUrl +
            '/#/booking-management/#{b.id}/job-detail";';
        command += 'b.next_state = Booking::STATE_IN_PROGRESS;';
        command += 'b.save;';
        Heroku.sendCommandToHeroku(command);
    }

    static inviteAllInterpreter() {
        Heroku.inviteInterpreter();
        let command = 'b=Booking.first;';
        command += 'i=Interpreter.last;';
        command += 'b.interpreter_ids=[i.id];';
        command += 'b.add_interpreters_to_booking;';
        command += 'b.save;';
        Heroku.sendCommandToHeroku(command);
    }

    static specialOrgRepSetup() {
        let command = 'o=OrganisationalRepresentative.first;';
        command += 'o.special_instructions="I am special";';
        command += 'o.save;';
        Heroku.sendCommandToHeroku(command);
    }

    static changeUserBusiness(userType: string) {
        let command = 'o=' + userType + '.first;';
            command += 'o.update(state_where_most_bookings_occur: "NSW");';
        Heroku.sendCommandToHeroku(command);
    }

    static assignEntityToDependant(entity: string, dependant: string) {
        let command = entity.replace(' ', '') + '.last.update(';
        command += dependant.replace(' ', '_').toLowerCase() + ': ';
        command += dependant.replace(' ', '') + '.last)';
        Heroku.sendCommandToHeroku(command);
    }

    static updateBookingWithCategory(category: string) {
        const task = 'seed:test_data:preload_booking:with_assignment_category[' + category + ']';
        Heroku.sendTaskToHeroku(task);
    }

    private static updateBookingWithStatus(status: string, updateFirst?: boolean) {
        const greenStatus = status === 'green';
        const updateIndex = updateFirst ? 'first' : 'last'; // the default is last
        let command = '';
        if (greenStatus) {
            command += `Booking.${updateIndex}.update(number_of_interpreters_required: 0);`;
        }
        command += `Booking.${updateIndex}.update_status`;
        Heroku.sendCommandToHeroku(command);
    }

    static updateFirstBookingWithStatus(status: string) {
        Heroku.updateBookingWithStatus(status, true);
    }

    static updateLastBookingWithStatus(status: string) {
        Heroku.updateBookingWithStatus(status, false);
    }

    static updateBookingWithMethodType(method: string) {
        let method_type = method === 'VRI' ? '1' : '0';
        let command = 'Booking.last.update(method_type: ' + method_type + ')';
        Heroku.sendCommandToHeroku(command);
    }

    private static updateBookingWithServiceType(serviceType: string, updateFirst?: boolean) {
        const updateIndex = updateFirst ? 'first' : 'last'; // the default is last
        const command = `Booking.${updateIndex}.update(type: '${serviceType}')`;
        Heroku.sendCommandToHeroku(command);
    }

    static updateFirstBookingWithServiceType(serviceType: string) {
        Heroku.updateBookingWithServiceType(serviceType, true);
    }

    static updateLastBookingWithServiceType(serviceType: string) {
        Heroku.updateBookingWithServiceType(serviceType, false);
    }

    static updateBookingWithClientName(client_name: string) {
        let command = 'Booking.last.update(deaf_persons_first_name: "' + client_name + '")';
        Heroku.sendCommandToHeroku(command);
    }

    static updateBookingWithLastClientName(client_name: string) {
        let command = 'Booking.last.update(deaf_persons_last_name: "' + client_name + '")';
        Heroku.sendCommandToHeroku(command);
    }

    static updateBookingWithInterpreterFirstName(interpreter_first_name: string) {
        let command = 'Interpreter.last.update(first_name: "' + interpreter_first_name + '");';
        command += 'Booking.last.interpreters << Interpreter.last;';
        command += 'Interpreter.last.translation_allocations.first.accept!';
        Heroku.sendCommandToHeroku(command);
    }

    static updateBookingWithInterpreterLastName(interpreter_last_name: string) {
        let command = 'Interpreter.last.update(last_name: "' + interpreter_last_name + '");';
        command += 'Booking.last.interpreters << Interpreter.last;';
        command += 'Interpreter.last.translation_allocations.first.accept!';
        Heroku.sendCommandToHeroku(command);
    }

    static updateBookingWithOrgName(org_name: string) {
        let command = 'b = Booking.last;o = OrganisationalRepresentative.last;o.organisation.update(name: "' + org_name + '");o.save;b.bookable = o;b.save';
        Heroku.sendCommandToHeroku(command);
    }

    static updateBookingWithSuburb(suburb: string) {
        let command = 'Booking.last.address.update(suburb: "' + suburb + '")';
        Heroku.sendCommandToHeroku(command);
    }

    static updateBookingStartAndEndDateTime() {
        let command = 'start_date = DateTime.current.utc.beginning_of_day + 2.week; end_date = start_date + 2.hours;';
        command += 'Booking.first.update(start_time: start_date, end_time: end_date);';
        command += 'Booking.last.update(start_time: start_date, end_time: end_date)';
        Heroku.sendCommandToHeroku(command);
    }

    static updateBookingCreatedDateTime() {
        let command = 'created_date = DateTime.yesterday;';
        command += 'Booking.first.update(created_at: created_date);';
        Heroku.sendCommandToHeroku(command);
    }

    static assignExistingBooking(bookable: string) {
        let command = 'Booking.update_all(bookable_id: ' + bookable.replace(' ', '') + '.first.id)';
        Heroku.sendCommandToHeroku(command);
    }

    static createUserWithPreferedInterpreters(userType: string) {
        userType = userType.split(/\s/).map(str => {
            return (str.charAt(0).toUpperCase() + str.slice(1).toLowerCase());
        }).join('');
        let command = 'client = ' + userType + '.last;';
        command += 'Interpreter.all.each { |i| client.preference_allocations';
        command += '<< PreferenceAllocation.new(clientable: client, interpreter: i, preference: :preferred) }';
        Heroku.sendCommandToHeroku(command);
    }

    static createBulkMessages(count: string, user_type: string) {
        let command = 'Time.zone = "Hobart";FactoryGirl.create_list(:message, ' + count
            + ', message_thread: ' + user_type + '.last.message_thread, sender_id: ' + user_type + '.last.id)';
        Heroku.sendCommandToHeroku(command);
    }

    private static createBooking(int_required: number) {

        let today = new Date();
        today.setDate(today.getDate() + 5);
        const currentDate = [
            today.getFullYear().toString(),
            this.prettyDate(today.getMonth() + 1), // January is 0!,
            this.prettyDate(today.getDate())
        ].join('-');
        return new Object({
            'method_type': 'onsite',
            'type': 'AuslanInterpreting',
            'venue': 'Fed Square',
            'requested_by_first_name': 'Georgious',
            'requested_by_last_name': 'Chara',
            'nature_of_appointment': 'Medical',
            'specific_nature_of_appointment': 'Audiology',
            'contact_first_name': 'Hadrian',
            'contact_last_name': 'French',
            'contact_email': 'a@a.com',
            'contact_phone_number': '0323422343',
            'deaf_persons_first_name': 'Clifford',
            'deaf_persons_last_name': 'Waz',
            'deaf_persons_mobile': '0444555666',
            'deaf_persons_email': 'clifford@vicdeaf.org.au',
            'deaf_persons_eaf_no': '124',
            'number_of_people_attending': 1,
            'number_of_interpreters_required': int_required,
            'start_time': currentDate + 'T06:26:00+11:00',
            'end_time': currentDate + 'T07:26:00+11:00',
            'billing_account_attributes': {
                'primary_contact_first_name': 'Paul',
                'primary_contact_last_name': 'Biller',
                'primary_contact_email': 'a@a.com',
                'primary_contact_phone_number': '0482232232',
                'account_number': 'ABCD-1234',
                'external_reference': '3421',
                'address_attributes': {
                    'unit_number': '02',
                    'street_number': '50',
                    'street_name': 'Flemington Rd',
                    'suburb': 'Parkville',
                    'state': 'VIC',
                    'post_code': '3025'
                }
            },
            'address_attributes': {
                'unit_number': '02',
                'street_number': '50',
                'street_name': 'Flemington Rd',
                'suburb': 'Parkville',
                'state': 'VIC',
                'post_code': '3025'
            },
            'parking_availability': 'None - Use the Tram',
            'bookable_id': 1,
            'bookable_type': 'OrganisationalRepresentative'
        });
    }

    // Adds a '0' in the start if the date < 10
    public static prettyDate = (date: number | string): string => {
        date = date.toString();
        return ('00' + date).slice(date.length);
    }
}
