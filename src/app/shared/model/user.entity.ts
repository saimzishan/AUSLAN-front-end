import {ROLE} from './role.enum';
import {Address, Venue} from './venue.entity';
import {Contact} from './contact.entity';
import {AvailabilityBlock} from './availability-block.entity';

export enum interpreter_avalability {}

export enum blockout_availability {}

export class UserFactory {

    // This is boring ,  we should rather have templated function to return the object with right class
    public static createUser(data: any) {
        let type = data.type;
        switch (type) {
            case 'OrganisationalRepresentative':
                let or = new OrganisationalRepresentative(data);
                or.fromJSON(data);
                return or;
            case 'Accountant':
                return new Accountant(data);
            case 'IndividualClient':
                let ic = new IndividualClient(data);
                ic.fromJSON(data);
                return ic;
            case 'BookingOfficer':
                return new BookingOfficer(data);
            case 'Administrator':
                return new Administrator(data);
            case 'Interpreter':
                let inte = new Interpreter(data);
                inte.fromValues(data);
                inte.address_attributes = <Address> data.address_attributes;
                inte.availability_blocks_attributes = data.availability_blocks_attributes;
                return inte;
            default:
                return new User(data);
        }
    }
}

// We should use a Builder Pattern here
export class User {

    public email: string;
    public password: string;
    public confirm_password: string;
    public role: ROLE;
    public first_name: string;
    public last_name: string;
    public id: number;
    public mobile: string;
    public phone: string;
    public token = '';
    public verified = false;
    public disabled = true;
    public type = '';
    public avatar: any;
    public photo_url = '';

    protected get user_type() {
        return '';
    }

    // This should be deleted in favour of right user cast and user_type
    public getRole() {
        if (Boolean(!this.role && this.type && this.type.length > 1)) {
            return ROLE[this.type];
        }
        return ROLE.NONE;
    }

    // This should be deleted in favour of right user cast and user_type
    public getType() {
        if (Boolean(!this.role && this.type && this.type.length > 1)) {
            return this.type;
        }
        return ROLE[ROLE.NONE];
    }

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}

/* This needs to be fixed*/
export class Organisational extends User {
    public org_id: number;
    public abn: number;
    public organisation_primary_contact: Contact = new Contact();
    public address_attributes: Address = new Address();
    public organisation_billing_account: Accountant = new Accountant();
    public organisation_name = '';
    public group_email = '';
    public branch_office = '';
    public preferred_contact_method = 'email_only';
    public email_receipt = false;
    public email_confirmation = false;
    public reffered_by: string;
    public reffered_other: string;
    public customer_ref: string;
    public special_instructions = '';
    public billingAddressIsSame = true;
    public prefferedInterpreters = [];

    constructor(data) {
        super(data);
        this.organisation_billing_account.organisation_billing_address =
            this.billingAddressIsSame ? this.address_attributes :
                this.organisation_billing_account.organisation_billing_address;
    }

    get user_type() {
        return 'Organisation';
    }
}

export class OrganisationalRepresentative extends Organisational {
    // public business_hours_phone = this.phone;

    get user_type() {
        return 'OrganisationalRepresentative';
    }


    toJSON() {
        this.preferred_contact_method = 'email_only';
        let o = {
            'first_name': this.first_name,
            'last_name': this.last_name,
            'type': this.type,
            'email': this.email,
            'password': this.password,
            'business_hours_phone': this.phone,
            'mobile': this.mobile,
            'send_email_on_receipt_of_request': this.email_receipt,
            'email_confirmation_on_interpreter_allocation': this.email_confirmation,
            'special_instructions': this.special_instructions,
            'discovery_of_auslan': this.reffered_by === 'OTHER' ?
                'O:' + this.reffered_other : this.reffered_by,
            'customer_reference': this.customer_ref,
            'communication_preference': this.preferred_contact_method,
            'organisation_attributes':
                {
                    'abn': this.abn,
                    'id': this.org_id,
                    'name': this.organisation_name, 'group_email': this.group_email,
                    'branch_office': this.branch_office,
                    'preferred_contact_method': this.organisation_billing_account.preferred_contact_method,
                    'address_attributes': this.address_attributes,
                    'preference_allocations_attributes': this.prefferedInterpreters,
                    'billing_account_attributes': {
                        'id': this.organisation_billing_account.id,
                        'primary_contact_first_name': this.organisation_primary_contact.first_name,
                        'primary_contact_last_name': this.organisation_primary_contact.last_name,
                        'primary_contact_email': this.organisation_primary_contact.email,
                        'primary_contact_phone_number': this.organisation_primary_contact.phone_number,
                        'account_number': 'ABCD-1234',
                        'external_reference': this.organisation_billing_account.external_reference,
                        'address_attributes': this.organisation_billing_account.organisation_billing_address
                    }
                }
        };
        return o;
    }

    /*
    * {"id":2,"type":"OrganisationalRepresentative","email":"nauman+orgrep@curvetomorrow.com.au",
    * "first_name":"Nauman","last_name":"OrgRep","mobile":null,"verified":true,"disabled":false,
    * "photo_url":"/avatars/thumbnail/missing.png","business_hours_phone":"0490398821",
    * "send_email_on_receipt_of_request":true,"email_confirmation_on_interpreter_allocation":true,
    * "special_instructions":"No instructions","discovery_of_auslan":"Internet search engine",
    * "customer_reference":"AZZ-34",
    * "organisation":{"id":1,"abn":"05123456789","name":"Curve","group_email":"",
    * "branch_office":"Melbourne","phone_number":"0490398821",
    * "preferred_contact_method":"0","address_attributes":
    * {"id":1,"unit_number":"123","street_number":"62","street_name":"62, DIANNE",
    * "suburb":"CRAIGIEBURN","state":"VIC","post_code":"3064"},
    * "billing_account":{"id":1,"account_number":"ABCD-1234",
    * "primary_contact_first_name":"Thijs","primary_contact_last_name":"Song",
    * "preferred_billing_method_email":true,
    * "external_reference":"",
    * "address_attributes":{"id":2,"unit_number":"123","street_number":"62","street_name":"62, DIANNE",
    * "suburb":"CRAIGIEBURN","state":"VIC","post_code":"3064"}}}}
    * */
    fromJSON(obj) {
        this.email_receipt = obj.send_email_on_receipt_of_request;
        this.email_confirmation = obj.email_confirmation_on_interpreter_allocation;
        this.phone = obj.business_hours_phone;
        obj.organisation = obj.organisation || obj.organisation_attributes;
        obj.organisation.billing_account = obj.organisation.billing_account ||
            obj.organisation.billing_account_attributes;
        this.org_id = obj.organisation.id;
        this.abn = obj.organisation.abn;
        this.organisation_name = obj.organisation.name;
        this.group_email = obj.organisation.group_email;
        this.special_instructions = obj.special_instructions;
        this.branch_office = obj.branch_office;
        this.reffered_by = Boolean(obj.discovery_of_auslan) ? obj.discovery_of_auslan.startsWith('O:') ?
            'Other' : obj.discovery_of_auslan : '';
        this.reffered_other = this.reffered_by === 'OTHER' ?
            obj.discovery_of_auslan.replaceAll('O:') : '';
        this.customer_ref = obj.customer_reference;
        this.prefferedInterpreters = obj.organisation.preference_allocations_attributes;
        this.preferred_contact_method = obj.communication_preference;
        this.address_attributes = obj.organisation.address_attributes;
        this.organisation_primary_contact.first_name = obj.organisation.billing_account.primary_contact_first_name || '';
        this.organisation_primary_contact.last_name = obj.organisation.billing_account.primary_contact_last_name || '';
        this.organisation_primary_contact.email = obj.organisation.billing_account.primary_contact_email || '';
        this.organisation_primary_contact.phone_number = obj.organisation.billing_account.primary_contact_phone_number || '';
        this.organisation_billing_account.organisation_billing_address = obj.organisation.billing_account.address_attributes;
        this.organisation_billing_account.external_reference = obj.organisation.billing_account.external_reference;
        this.organisation_billing_account.id = obj.organisation.billing_account.id;
        this.organisation_billing_account.preferred_contact_method = obj.organisation.preferred_contact_method;

    }
}

export class Accountant extends User {
    public account_number: number;
    public organisation_billing_address: Address = new Address();
    public external_reference: string;
    public preferred_contact_method = 'email';
    public preferred_billing_method_email = true;

    get user_type() {
        return 'Accountant';
    }
}

export class IndividualClient extends User {

    public ndis_id: string;
    public ndis_budget_limit: number;
    public ndis_validity_start_date: Date;
    public ndis_validity_end_date: Date;
    public eaf_id: string;
    public eaf_budget_limit: number;
    public eaf_start_date: Date;
    public eaf_end_date: Date;
    public special_instructions = '';
    public preferred_contact_method = 'email_and_sms';
    public individual_client_primary_contact: Contact = new Contact();
    public address_attributes: Address = new Address();
    public individual_client_billing_account: Accountant = new Accountant();
    public email_receipt: boolean;
    public email_confirmation: boolean;
    public reffered_by: string;
    public billingAddressIsSame = true;
    public reffered_other: string;
    public prefferedInterpreters = [];

    constructor(data) {
        super(data);
        this.individual_client_billing_account.organisation_billing_address =
            this.billingAddressIsSame ? this.address_attributes :
                this.individual_client_billing_account.organisation_billing_address;
    }

    get user_type() {
        return 'IndividualClient';
    }

    /*
    * {"id":4,"type":"IndividualClient","email":"nauman+ind@curvetomorrow.com.au",
    * "first_name":"Nauman","last_name":"IndClient","mobile":"xxxx xxx xxx","verified":true,
    * "disabled":false,"photo_url":"/avatars/thumbnail/missing.png",
    * "send_email_on_receipt_of_request":true,"email_confirmation_on_interpreter_allocation":true,
    * "special_instructions":null,"discovery_of_auslan":null,
    * "address_attributes":{"id":4,"unit_number":"22","street_number":"62","street_name":"DIANNE AVE",
    * "suburb":"CRAIGIEBURN","state":"VIC","post_code":"3064"},
    * "billing_account_attributes":{"id":2,"account_number":"ABCD-1234",
    * "primary_contact_first_name":"Thijs","primary_contact_last_name":"Song",
    * "external_reference":"Curve and Sanj",
    * "address_attributes":{"id":5,"unit_number":"22","street_number":"62",
    * "street_name":"DIANNE AVE","suburb":"CRAIGIEBURN","state":"VIC","post_code":"3064"}}}
    * */
    toJSON() {
        let o = {
            'first_name': this.first_name, 'last_name': this.last_name, 'email': this.email, 'password': this.password,
            'type': this.type, 'send_email_on_receipt_of_request': this.email_receipt,
            'email_confirmation_on_interpreter_allocation': this.email_confirmation,
            'special_instructions': this.special_instructions,
            'discovery_of_auslan': this.reffered_by === 'OTHER' ?
                'O:' + this.reffered_other : this.reffered_by,
            'mobile': this.mobile, 'ndis_id': this.ndis_id, 'ndis_budget_limit': this.ndis_budget_limit,
            'ndis_validity_start_date': this.ndis_validity_start_date, 'ndis_validity_end_date': this.ndis_validity_end_date,
            'eaf_id': this.eaf_id, 'eaf_budget_limit': this.eaf_budget_limit, 'eaf_start_date': this.eaf_start_date,
            'eaf_end_date': this.eaf_end_date,
            'business_hours_phone': this.phone,
            'address_attributes': this.address_attributes,
            'communication_preference': this.preferred_contact_method,
            'preference_allocations_attributes': this.prefferedInterpreters,
            'billing_account_attributes': {
                'id': this.individual_client_billing_account.id,
                'primary_contact_first_name': this.individual_client_primary_contact.first_name,
                'primary_contact_last_name': this.individual_client_primary_contact.last_name,
                'primary_contact_email': this.individual_client_primary_contact.email,
                'primary_contact_phone_number': this.individual_client_primary_contact.phone_number,
                'account_number': '',
                'external_reference': '',
                'address_attributes': this.individual_client_billing_account.organisation_billing_address
            }
        };
        return o;
    }


    fromJSON(obj) {
        this.first_name = obj.first_name;
        this.last_name = obj.last_name;
        this.email = obj.email;
        this.password = obj.password;
        this.ndis_id = obj.ndis_id;
        this.phone  = obj.business_hours_phone;
        this.ndis_budget_limit = obj.ndis_budget_limit;
        this.ndis_validity_start_date = obj.ndis_validity_start_date;
        this.ndis_validity_end_date = obj.ndis_validity_end_date;
        this.mobile = obj.mobile;
        this.eaf_id = obj.eaf_id;
        this.eaf_budget_limit = obj.eaf_budget_limit;
        this.eaf_start_date = obj.eaf_start_date;
        this.eaf_end_date = obj.eaf_end_date;
        this.special_instructions = obj.special_instructions;
        this.preferred_contact_method = obj.communication_preference;
        this.prefferedInterpreters = obj.preference_allocations_attributes;
        this.reffered_by = Boolean(obj.discovery_of_auslan) ? obj.discovery_of_auslan.startsWith('O:') ?
            'Other' : obj.discovery_of_auslan : '';
        this.reffered_other = this.reffered_by === 'OTHER' ?
            obj.discovery_of_auslan.replaceAll('O:') : '';
        this.email_receipt = obj.send_email_on_receipt_of_request;
        this.email_confirmation = obj.email_confirmation_on_interpreter_allocation;
        this.address_attributes = obj.address_attributes;
        this.individual_client_primary_contact.first_name = obj.billing_account_attributes.primary_contact_first_name;
        this.individual_client_primary_contact.last_name = obj.billing_account_attributes.primary_contact_last_name;
        this.individual_client_primary_contact.email = obj.billing_account_attributes.primary_contact_email;
        this.individual_client_primary_contact.phone_number = obj.billing_account_attributes.primary_contact_phone_number;
        this.individual_client_billing_account.organisation_billing_address = obj.billing_account_attributes.address_attributes;
        this.individual_client_billing_account.id = obj.billing_account_attributes.id;
    }
}

export class BookingOfficer extends User {
    get user_type() {
        return 'BookingOfficer';
    }
}

export class Administrator extends User {
    get user_type() {
        return 'Administrator';
    }
}

/*
* {"user":{"address_attributes":
* {"unit_number":"22","street_number":"62","street_name":"DIANNE AVE",
* "suburb":"CRAIGIEBURN","post_code":"3064","state":"VIC"},
* "skill_level":"Deaf Interpreter Accredited","highest_level_edu":"Diploma of Interpreting Auslan/English",
* "location_pref":"QLD","comm_pref":"SMS and Email","role":6,"first_name":"Nauman","last_name":"Interpreter",
* "password":"Abcd#1234","confirm_password":"Abcd#1234","email":"nauman+int@curvetomorrow.com.au","phone":"0490398821",
* "mobile":"xxxx xxx xxx","naati_id":"NA-234","naati_validity_start_date":"2017-06-30",
* "naati_validity_end_date":"2017-07-31","after_hours_phone":"0490221122",
* "date_of_birth":"2017-08-31"}}
 */
export class Interpreter extends User {


    public naati_id: string;
    public naati_validity_start_date: string;
    public naati_validity_end_date: string;
    public business_hours_phone: string;
    public after_hours_phone: string;
    public date_of_birth: string;
    public address_attributes: Address = new Address();
    public long_term_availability: interpreter_avalability;
    public override_availabilty: blockout_availability;
    public skill_level = 'ASL Certified';
    public highest_level_edu = 'Diploma of Interpreting Auslan/English';
    public location_pref = 'VIC';
    public communication_preference = 'email_and_sms';
    public assignments_attributes = [];
    public availability_blocks_attributes: Array<AvailabilityBlock> = [];

    get user_type() {
        return 'Interpreter';
    }

    fromValues(values: Object = {}) {
        Object.assign(this, values);
    }

}
