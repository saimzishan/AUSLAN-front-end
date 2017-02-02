import {ROLE} from './role.enum';

export class User {

  private _email: string;
  private _name: string;
  private _pass: string;
  private _confirm_pass: string;
  private _role: ROLE;
  public _id: number;

    constructor(values: Object = {}) {
      Object.assign(this, values);
    }

    get id() { return this._id; }
    get email() { return this._email; }
    get name() { return this._name; }
    get pass() { return this._pass; }
    get role() { return this._role; }

    set email(val: string) {
        this._email = val;
    }
    set name(val: string) {
        this._name = val;
    }
    set pass(val: string) {
        this._pass = val;
    }
    set role(val: ROLE) {
        this._role = val;
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
