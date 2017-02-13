import { Component, OnInit } from '@angular/core';
import {UserService} from '../api/user.service';
import {NotificationComponent} from '../notification/notification.component';

@Component({
    selector: 'app-verify',
    templateUrl: './verify.component.html',
    styleUrls: ['./verify.component.css']
})
export class VerifyComponent implements OnInit {
    errors: any;
    public verificationCode= '';
    constructor(private service: UserService) { }

    ngOnInit() {
    }

    verifyUser() {

        this.service.verifyUser(this.verificationCode)
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
