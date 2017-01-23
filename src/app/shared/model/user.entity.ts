import {ROLE} from './role.enum';

export class User {

    constructor(public _id: number, private _email: string, private _name: string,
        private _pass: string, private _confirm_pass: string, private _role: ROLE) {
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
