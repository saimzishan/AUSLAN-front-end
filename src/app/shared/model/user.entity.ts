import {ROLE} from './role.enum';
import {Venue} from './venue.entity';

export enum interpreter_avalability {}
export enum blockout_availability {}


export class User {

  public email = 'john@doe.com';
  public password: string;
  public confirm_password: string;
  public role: ROLE;
  public first_name = 'John';
  public last_name = 'Dane';
  public id: number;
  public mobile = 'xxxx xxx xxx';
  public token = '';
  public verified = false;
  public disabled = true;
  public type= '';

  protected get user_type() {
    return '';
  }

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}

export class OrganisationalRepresentative extends User {
  public business_hours_phone = '';

  get user_type() {
    return 'OrganisationalRepresentative';
  }
}

export class Organisational extends User {
  public abn: number;
  public primary_contact: User;
  public name: string;
  public group_email: string;
  public branch_office: string;
  public preferred_contact_method: string;
  public phone: string;

  get user_type() {
    return 'Organisational';
  }
}

export class Accountant extends User {
  public primary_contact: User;
  public account_number: number;
  public billing_address: Venue;
  get user_type() {
    return 'Accountant';
  }
}

export class Client extends User {

public ndis_id: string;
public ndis_budget_limit: number;
public ndis_validity_start_date: Date;
public ndis_validity_end_date: Date;
public eaf_id: string;
public eaf_budget_limit: number;
public eaf_start_date: Date;
public eaf_end_date: Date;

  get user_type() {
    return 'Client';
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
public home_address: Venue;
public postal_address: Venue;
public long_term_availability: interpreter_avalability;
public override_availabilty: blockout_availability;

  get user_type() {
    return 'Interpreter';
  }
}
