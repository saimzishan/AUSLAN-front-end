import {Component, OnInit} from '@angular/core';
import {SpacerPipe} from '../../shared/pipe/spacer.pipe';
import {ROLE} from '../../shared/model/role.enum';
import {GLOBAL} from '../../shared/global';
import {Administrator, BookingOfficer} from '../../shared/model/user.entity';

@Component({
    selector: 'app-user-filter',
    templateUrl: './user-filter.component.html',
    styleUrls: ['./user-filter.component.css']
})
export class UserFilterComponent implements OnInit {
    selRoles = [ROLE.IndividualClient, ROLE.Organisation, ROLE.Interpreter];
    _selRoles = [];
    public spacerPipe: SpacerPipe = new SpacerPipe();

    ngOnInit() {
        if (GLOBAL.currentUser.getRole() === ROLE.Administrator) {
            this.selRoles.push(ROLE.Administrator);
            this.selRoles.push(ROLE.BookingOfficer);
            this.selRoles.push(ROLE.Accountant);
        }
        if (GLOBAL.currentUser.getRole() === ROLE.BookingOfficer) {
            this.selRoles.push(ROLE.BookingOfficer);
            this.selRoles.push(ROLE.Accountant);

        }

        for (let r of this.selRoles) {
            this._selRoles.push(this.spacerPipe.transform(ROLE[r]));
        }
    }

    makeQueryable(r) {
        return r.toUpperCase().replace(/\s/g, '');
    }
    checkUserAdminORBookOfficer(): Boolean {
        return Boolean(GLOBAL.currentUser instanceof Administrator ||
            GLOBAL.currentUser instanceof BookingOfficer) ;
    }
}
