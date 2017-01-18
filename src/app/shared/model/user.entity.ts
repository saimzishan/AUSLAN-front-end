import {ROLE} from './role.enum';

export class User {
    public _id: number = 0; // We need this only to mocking backend
    constructor(private email: string, private name: string,
      private password: string, private confirm_password: string, private role: ROLE ) {
      this._id++;
    }

}
