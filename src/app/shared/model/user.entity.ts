import { ROLE } from './role.enum';
import { Address ,  Venue } from './venue.entity';
import {Contact} from './contact.entity';

export enum interpreter_avalability {}
export enum blockout_availability {}

export class UserFactory {

  // This is boring ,  we should rather have templated function to return the object with right class
  public static createUser(data:  any) {
    let type = data.type;
    switch (type) {
      case 'OrganisationalRepresentative': return new  OrganisationalRepresentative ()
          .fromJSON(data);
      case 'Accountant': return new  Accountant (data);
      case 'IndividualClient': return new  IndividualClient ()
          .fromJSON(data);
      case 'BookingOfficer': return new  BookingOfficer (data);
      case 'Administrator': return new  Administrator (data);
      case 'Interpreter': return new  Interpreter (data);
      default: return new User (data);
    }
  }
}

// We should use a Builder Pattern here
export class User {

  public email:  string;
  public password: string;
  public confirm_password: string;
  public role: ROLE;
  public first_name: string;
  public last_name: string;
  public id: number;
  public mobile: string;
  public token = '';
  public verified = false;
  public disabled = true;
  public type= '';

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
    Object.assign(this ,  values);
  }
}


export class Organisational extends User {
  public abn: number;
  public organisation_primary_contact: Contact = new Contact();
  public organisation_address: Address = new Address();
  public organisation_billing_account: Accountant = new Accountant();
  public name = '';
  public group_email = '';
  public branch_office = '';
  public preferred_contact_method = '';
  public phone: string;
  public email_receipt: boolean;
  public email_confirmation: boolean;
  public reffered_by: string;
  public customer_ref: string;
  public special_instructions = '';

  get user_type() {
    return 'Organisational';
  }
}

export class OrganisationalRepresentative extends Organisational {
  public business_hours_phone = this.phone;

  get user_type() {
    return 'OrganisationalRepresentative';
  }


  toJSON() {
    let o = {'user' :
        {'first_name'  :  this.first_name , 'last_name' : this.last_name , 'email' : this.email ,
          'password' : this.password , 'business_hours_phone' : this.business_hours_phone , 'mobile' : this.mobile ,
          'organisation_attributes' :
              {'abn' : this.abn , 'name' : this.name , 'group_email' : this.group_email ,
                'branch_office' : this.branch_office , 'phone_number' : this.phone ,
                'preferred_contact_method' : this.preferred_contact_method ,
                'address_attributes' : this.organisation_address ,
                'billing_account_attributes' : {'primary_contact_first_name' : this.organisation_primary_contact.first_name ,
                  'primary_contact_last_name' : this.organisation_primary_contact.last_name ,
                  'email_address' : this.organisation_primary_contact.email ,
                  'account_number' : 'ABCD-1234' , 'preferred_billing_method_email' : this.email_confirmation ,
                  'external_reference' : '' , 'address_attributes' : this.organisation_billing_account}}}};
    return o;
  }

  fromJSON(obj) {
    this.first_name = obj.first_name;
    this.last_name = obj.last_name;
    this.email = obj.email;
    this.password = obj.password;
    this.business_hours_phone = obj.business_hours_phone;
    this.mobile = obj.mobile;
    this.abn = obj.organisation_attributes.abn;
    this.name = obj.organisation_attributes.name;
    this.group_email = obj.organisation_attributes.group_email;
    this.branch_office = obj.organisation_attributes.branch_office;
    this.phone = obj.organisation_attributes.phone_number;
    this.preferred_contact_method = obj.organisation_attributes.preferred_contact_method;
    this.preferred_contact_method = obj.organisation_attributes.preferred_contact_method;
    this.organisation_address = obj.organisation_attributes.address_attributes;
    this.organisation_primary_contact.first_name = obj.organisation_attributes.billing_account_attributes.primary_contact_first_name || '';
    this.organisation_primary_contact.last_name = obj.organisation_attributes.billing_account_attributes.primary_contact_last_name || '';
    this.organisation_primary_contact.email = obj.organisation_attributes.billing_account_attributes.email_address || '';
    this.email_confirmation = obj.organisation_attributes.billing_account_attributes.preferred_billing_method_email;
    this.organisation_billing_account = obj.organisation_attributes.billing_account_attributes.address_attributes;
  }
}

export class Accountant extends User {
  public account_number:  number;
  public organisation_billing_address:  Address = new Address();

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

  public individual_client_primary_contact: Contact = new Contact();
  public address_attributes: Address = new Address();
  public individual_client_billing_account: Accountant = new Accountant();
  public email_receipt: boolean;
  public email_confirmation: boolean;
  public reffered_by: string;

  get user_type() {
    return 'IndividualClient';
  }

  toJSON() {
    let o = {'user':
        {'first_name': this.first_name, 'last_name': this.last_name , 'email': this.email, 'password': this.password,
          'mobile': this.mobile, 'ndis_id': this.ndis_id, 'ndis_budget_limit': this.ndis_budget_limit,
          'ndis_validity_start_date': this.ndis_validity_start_date, 'ndis_validity_end_date': this.ndis_validity_end_date,
          'eaf_id': this.eaf_id, 'eaf_budget_limit': this.eaf_budget_limit, 'eaf_start_date': this.eaf_start_date,
          'eaf_end_date': this.eaf_end_date,
          'address_attributes': this.address_attributes,
          'billing_account_attributes': {'primary_contact_first_name': this.individual_client_primary_contact.first_name ,
            'primary_contact_last_name': this.individual_client_primary_contact.last_name ,
            'email_address': this.individual_client_primary_contact.email ,
            'account_number': 'ABCD-1234', 'preferred_billing_method_email': this.email_confirmation ,
            'external_reference': 'Curve and Sanj',
            'address_attributes': this.individual_client_billing_account.organisation_billing_address}}};
    return o;
  }


  fromJSON(obj) {
    this.first_name = obj.first_name;
    this.last_name = obj.last_name;
    this.email = obj.email;
    this.password = obj.password;
    this.ndis_id = obj.ndis_id;
    this.ndis_budget_limit = obj.ndis_budget_limit;
    this.ndis_validity_start_date = obj.ndis_validity_start_date;
    this.ndis_validity_end_date = obj.ndis_validity_end_date;
    this.mobile = obj.mobile;
    this.eaf_id = obj.eaf_id;
    this.eaf_budget_limit = obj.eaf_budget_limit;
    this.eaf_start_date = obj.eaf_start_date;
    this.eaf_end_date = obj.eaf_end_date;

    this.address_attributes = obj.address_attributes;
    this.individual_client_primary_contact.first_name = obj.billing_account_attributes.primary_contact_first_name;
    this.individual_client_primary_contact.last_name = obj.billing_account_attributes.primary_contact_last_name;
    this.individual_client_primary_contact.email = obj.billing_account_attributes.email_address;
    this.email_confirmation = obj.billing_account_attributes.preferred_billing_method_email;
    this.individual_client_billing_account.organisation_billing_address = obj.billing_account_attributes.address_attributes;


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

export class Interpreter extends User {
  public naati_id: string;
  public naati_validity_start_date: Date;
  public naati_validity_end_date: Date;
  public business_hours_phone: string;
  public after_hours_phone: string;
  public date_of_birth: Date;
  public address_attributes: Address = new Address();
  public long_term_availability: interpreter_avalability;
  public override_availabilty: blockout_availability;
  public skill_level= '';
  public highest_level_edu = '';
  public location_pref = '';
  public comm_pref = '';

  get user_type() {
    return 'Interpreter';
  }

}
