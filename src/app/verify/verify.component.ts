import { Component, OnInit } from '@angular/core';
import {UserService} from '../api/user.service';
import {NotificationComponent} from '../notification/notification.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-verify',
    templateUrl: './verify.component.html',
    styleUrls: ['./verify.component.css']
})
export class VerifyComponent implements OnInit {
    errors: any;
    private userID= -1;
    public verificationCode= '';
    constructor(private service: UserService , private routes: ActivatedRoute) { }

    ngOnInit() {
      this.routes.params.subscribe( (p: any) => {
        this.userID = p.id;
      });
    }

    verifyUser() {

        this.service.verifyUser(this.userID, this.verificationCode)
            .subscribe((res: any) => {
                if (res.data.verify) {
                } else { // show errors
                }
            },
            err => {
                console.log(err);
                this.errors = 'The verification Code is not right.';
            },
            () => { });
    }
}
