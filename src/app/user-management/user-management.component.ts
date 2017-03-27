import { Component, AfterViewChecked, ChangeDetectionStrategy } from '@angular/core';
import {UserService} from '../api/user.service';
import {User} from '../shared/model/user.entity';
import {ROLE} from '../shared/model/role.enum';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/observable/throw';
import {SpinnerService} from '../spinner/spinner.service';

declare var $: JQueryStatic;

@Component({
    selector: 'app-admin',
    templateUrl: './user-management.component.html',
    styleUrls: ['./user-management.component.css'],
    changeDetection: ChangeDetectionStrategy.Default

})

export class UserManagementComponent implements AfterViewChecked {
    newUser: User = new User();
    roles: any;
    users: Array<User> = [];
    // this is bad

    ngAfterViewChecked() {
      $(document).foundation();
    }


    constructor(public spinnerService: SpinnerService,
      public userDataService: UserService) {
      this.roles = ROLE;
      this.fetchUsers();
    }

    onEditUser(u: User) {
        this.newUser = u;
    }

    fetchUsers() {
      this.spinnerService.requestInProcess(true);
      this.userDataService.fetchUsers()
      .subscribe((res: any) => {
        if ( res.status === 200 ) {
        this.users = res.data.users;
      }
      this.spinnerService.requestInProcess(false);
      },
       err => {
         this.spinnerService.requestInProcess(false);

         console.log(err);
       });
    }

}
