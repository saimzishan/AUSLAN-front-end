  import {ROLE} from './role.enum';

export class User {

  public email = 'john@doe.com';
  public password: string;
  public confirm_password: string;
  public role: ROLE;
  public first_name = 'Major';
  public last_name = 'Lazer';
  public id: number;
  public type = 'unknown';
  public mobile = null;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}

export class OrganisationalRepresentative extends User {

}


export class Accountant extends User {

}

export class Client extends User {

}

export class BookingOfficer extends User {

}


export class Administrator extends User {

}

export class Interpreter extends User {

}
