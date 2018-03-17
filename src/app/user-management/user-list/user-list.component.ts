import {Component, Input, Output, EventEmitter} from '@angular/core';
import {
    Administrator, BookingOfficer, IndividualClient, Interpreter, OrganisationalRepresentative,
    User
} from '../../shared/model/user.entity';
import {SpacerPipe} from '../../shared/pipe/spacer.pipe';
import {LinkAuth} from '../../shared/router/linkhelper';
import {ROLE} from '../../shared/model/role.enum';
import {GLOBAL} from '../../shared/global';
import {UserFilter} from '../../shared/model/user-filter.interface';
import {URLSearchParams} from '@angular/http';


@Component({
    selector: 'app-user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.css']
})
export class UserListComponent {
    @Input('userList') userList: Array<any> = [];
    @Output() onResetPass = new EventEmitter<User>();
    @Output() onPageEmit = new EventEmitter<number>();
    @Input() p = 1;
    @Input() totalItems = 0;
    userFilter:  UserFilter = {};
    searchParams: string;
    private filterUserParams = new URLSearchParams();
    private currentSort = {'field': 'first_name', 'order': 'asc'};

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

    getPage(page: number) {
        this.onPageEmit.emit(page);

    }

    isUserOrOrgrep(user) {
        return user instanceof OrganisationalRepresentative;
    }

    clearSearch() {
        this.searchParams = '';
        this.search();
    }

    search() {
        GLOBAL._filterUserVal.set('search', this.searchParams);
        this.onPageEmit.emit(this.p);
    }

    filterUsers(field: string, value: string) {
        this.userFilter[field] = this.formattedValueFor(field, value);
        for (let k in this.userFilter) {
            if (this.userFilter.hasOwnProperty(k)) {
                if (k === 'type') {
                    this.filterUserParams.set('filter[' + k + ']', this.userFilter[k].replace(/\s/g, ''));
                } else {
                    this.filterUserParams.set('filter[' + k + ']', this.userFilter[k]);
                }
            }
        }
        GLOBAL._filterUserVal = this.filterUserParams;
        this.onPageEmit.emit(this.p);
    }

    private formattedValueFor(field: string, value: string) {
        if (value !== undefined && value.toLowerCase() === 'all') {
            return '';
        }
        return value;
    }

    userTypes() {
        let keys = ['Administrator', 'Booking Officer', 'Individual Client', 'Interpreter', 'Organisational Representative'];
        return ['All', ...keys];
    }

    filterUserType() {
        return this.userFilter.type;
    }

    userStatuses() {
        let keys = ['Active', 'Disabled', 'Unverified'];
        return ['All', ...keys];
    }

    filterUserStatus() {
        return this.userFilter.account_status;
    }

    underScoreToSpaces(str: string) {
        if (!str) {
            return 'All';
        }
        return str.replace(/_/g, ' ');
    }

    private isCurrentSort(field: string) {
        return this.currentSort.field === field;
    }

    private setCurrentSort(field: string) {
        let order = 'asc';
        if (this.isCurrentSort(field)) {
            order = this.currentSort.order === 'asc' ? 'desc' : 'asc';
        }
        this.currentSort.field = field;
        this.currentSort.order = order;
    }

    getSortOrder(field: string) {
        return this.isCurrentSort(field) ? this.currentSort.order : '';
    }

    sortUsers(field: string) {
        this.setCurrentSort(field);
        this.filterUserParams.set('sort', this.currentSort.field);
        this.filterUserParams.set('direction', this.currentSort.order);
        GLOBAL._filterUserVal = this.filterUserParams;
        this.onPageEmit.emit(this.p);
    }

}
