import {Component, Input, Output, EventEmitter} from '@angular/core';
import {
    Administrator, BookingOfficer, IndividualClient, Interpreter, OrganisationalRepresentative,
    User
} from '../../shared/model/user.entity';
import {SpacerPipe} from '../../shared/pipe/spacer.pipe';
import {LinkAuth} from '../../shared/router/linkhelper';
import {ROLE} from '../../shared/model/role.enum';


@Component({
    selector: 'app-user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.css']
})
export class UserListComponent {
    @Input('userList') userList: Array<any> = [];
    @Output() onResetPass = new EventEmitter<User>();
    p = 1;
    @Input() totalItems = 0;
    constructor(private linkAuth: LinkAuth) {

    }

    getQueryableRole(user) {
        return ROLE[user.getRole()].toUpperCase().replace(/\s/g, '');
    }

    stringifyUser(user) {
        return JSON.stringify(user);
    }

    onResetPassword(user: User) {
        this.onResetPass.emit(user);
    }

    canEditLink(linkName, data_owner) {
        return this.linkAuth.canEditLink(linkName, data_owner);
    }

    isUserInterpreter(user) {
        return user instanceof Interpreter;
    }

    isUserOrOrgrep(user) {
        return user instanceof OrganisationalRepresentative;
    }

}
