import {ROLE} from './role.enum';

export enum interpreter_avalability {}
export enum blockout_availability {}

export class Address {

  public addressline_1: string;
  public addressline_2: string;
  public addressline_3: string;
  public state: string;
  public post_code: number;

}

export class User {

  public email = 'john@doe.com';
  public password: string;
  public confirm_password: string;
  public role: ROLE;
  public first_name = 'Major';
  public last_name = 'Lazer';
  public id: number;
  public mobile = '';
  public token = '';
  protected get type() {
    return '';
  }

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}

export class OrganisationalRepresentative extends User {
  public business_hours_phone = '';

  get type() {
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

  get type() {
    return 'Organisational';
  }
}

export class Accountant extends User {
  public primary_contact: User;
  public account_number: number;
  public billing_address: Address;
  get type() {
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

  get type() {
    return 'Client';
  }
}

export class BookingOfficer extends User {
  get type() {
    return 'BookingOfficer';
  }
}

export class Administrator extends User {
  get type() {
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
public home_address: Address;
public postal_address: Address;
public long_term_availability: interpreter_avalability;
public override_availabilty: blockout_availability;

  get type() {
    return 'Interpreter';
  }
}