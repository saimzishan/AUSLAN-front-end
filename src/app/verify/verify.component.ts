import { Component, OnInit } from '@angular/core';
import {UserService} from '../api/user.service';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css']
})
export class VerifyComponent implements OnInit {

  constructor(public errors: any, private verificationCode: string, private service: UserService) { }

  ngOnInit() {
  }

  verifyUser() {

    this.service.verifyUser(this.verificationCode)
    .subscribe((res: any) => {
      if ( res.data.verify) {
    }else { // show errors
    }
  },
  err => {
    console.log(err);
    this.errors = 'The verification Code is not right.';
  },
  () => {});
  }
}
