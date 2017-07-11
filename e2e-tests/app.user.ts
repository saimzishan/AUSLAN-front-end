/**
 * Created by hientran on 8/5/17.
 */

export class User {
    private _email: string;
    private _pass: string;
    private _first_name: string;
    private _last_name: string;
    private _mobile_num: string;
    //
    // constructor(email: string, pass: string) {
    //     this.email = email;
    //     this.pass = pass;
    //     this.first_name = this.last_name = this.mobile_num = '';
    // }

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