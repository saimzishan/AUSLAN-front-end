import {ROLE} from './role.enum'

export class User {
    _id:number = 0; //We need this only to mocking backend
    constructor(email:string, name:string, password:string, confirm_password:string, role:ROLE ){
      this._id++;
    }

}
