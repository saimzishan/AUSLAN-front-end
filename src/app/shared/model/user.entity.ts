import { ROLE } from './role.enum';
import { Address, Venue } from './venue.entity';
import {Contact} from './contact.entity';

export enum interpreter_avalability {}
export enum blockout_availability {}

export class UserFactory {

  // This is boring, we should rather have templated function to return the object with right class
  public static createUser(data: any) {
    let type = data.type;
    switch (type) {
      case 'OrganisationalRepresentative': return new  OrganisationalRepresentative (data);
      case 'Organisational': return new  Organisational (data);
      case 'Accountant': return new  Accountant (data);
      case 'IndividualClient': return new  IndividualClient (data);
      case 'BookingOfficer': return new  BookingOfficer (data);
      case 'Administrator': return new  Administrator (data);
      case 'Interpreter': return new  Interpreter (data);
      default: return new User (data);
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
    Object.assign(this, values);
  }
}


export class Organisational extends User {
  public abn: number;
  public organisation_primary_contact: Contact = new Contact();
  public organisation_address: Address = new Address();
  public organisation_billing_account: Accountant = new Accountant();
  public name: string;
  public group_email: string;
  public branch_office: string;
  public preferred_contact_method: string;
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
  public business_hours_phone = '';

  get user_type() {
    return 'OrganisationalRepresentative';
  }
}

export class Accountant extends User {
  public account_number: number;
  public organisation_billing_address: Address = new Address();

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

  public individual_client_primary_contact: Contact  = new Contact();
  public individual_client_address: Address = new Address();
  public individual_client_billing_account: Accountant = new Accountant();
  public email_receipt: boolean;
  public email_confirmation: boolean;
  public reffered_by: string;

  get user_type() {
    return 'IndividualClient';
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
  public home_address: Address = new Address();
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
