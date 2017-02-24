export class Booking {
    // title: string = '';
    public email = 'john@doe.com';
    public password: string;
    public confirm_password: string;
    public first_name = 'John';
    public last_name = 'Dane';
    public id: number;
    public mobile = 'xxxx xxx xxx';
    public token = '';

    constructor(values: Object = {}) {
      Object.assign(this, values);
    }
}
