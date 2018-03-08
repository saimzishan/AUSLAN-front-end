import {Component} from '@angular/core';
import {URLSearchParams} from '@angular/http';
import {BookingService} from '../api/booking.service';
import {Booking} from '../shared/model/booking.entity';
import {SpinnerService} from '../spinner/spinner.service';
import {RolePermission} from '../shared/role-permission/role-permission';
import {IndividualClient, Interpreter, OrganisationalRepresentative} from '../shared/model/user.entity';
import {GLOBAL} from '../shared/global';
import {BOOKING_STATE} from '../shared/model/booking-state.enum';
import {BookingInterpreter} from '../shared/model/contact.entity';


@Component({
    selector: 'app-booking',
    templateUrl: './booking.component.html',
    styleUrls: ['./booking.component.css']
})
export class BookingComponent  {
    bookings: Array<Booking> = [];
    activeFilter = '';
    totalItems = 0;
    page = 0;
    tempPage = 0;
    search: URLSearchParams;
    constructor(public spinnerService: SpinnerService, public bookingDataService: BookingService,
                private rolePermission: RolePermission) {
    }

    setActiveFilter(activeFilter: string) {
        this.activeFilter = activeFilter;
    }

    isActiveFilter(activeFilter: string) {
        return this.activeFilter === activeFilter;
    }
    onPageEmit(page: number) {
        this.tempPage = page;
        this.getPaginatedBooking();
    }
    getPaginatedBooking() {
        this.spinnerService.requestInProcess(true);
        this.bookingDataService.fetchPaginatedBookings(this.tempPage, this.search)
            .subscribe((res: any) => {
                    if (res.status === 200) {
                        this.bookings = [];
                        this.totalItems = Boolean(res.data.paginates) ? res.data.paginates.total_records : res.data.bookings.length;
                        for (let o of res.data.bookings) {
                            if (Boolean(!this.rolePermission.isDataRestrictedForCurrentUser('booking-management', o.created_by.type))
                                || (GLOBAL.currentUser instanceof OrganisationalRepresentative && GLOBAL.currentUser.id === o.created_by.id)
                                || (GLOBAL.currentUser instanceof IndividualClient && GLOBAL.currentUser.id === o.created_by.id)
                                || o.interpreters_attributes.filter(int =>
                                    int.id === GLOBAL.currentUser.id).length > 0) {
                                let b = new Booking();
                                b.fromJSON(o);
                                let currentInt: BookingInterpreter;
                                b.interpreters.filter(int => int.id === GLOBAL.currentUser.id)
                                    .map(int => currentInt = int);
                                if (GLOBAL.currentUser instanceof Interpreter && Boolean(currentInt)
                                    && b.state === BOOKING_STATE.Allocated
                                    && (currentInt.state === 'Invited' ||
                                        currentInt.state === 'Rejected')) {
                                    continue;
                                } else {
                                    this.bookings.push(b);
                                }
                            }
                        }
                        this.page = this.tempPage;
                    }
                    this.spinnerService.requestInProcess(false);
                }
                ,
                err => {
                    this
                        .spinnerService
                        .requestInProcess(
                            false
                        );
                }
            )
        ;
    }
    fetchBookings() {
        this.tempPage = this.page = 1;
        this.search =  GLOBAL.getSearchParameter();
        this.getPaginatedBooking();

    }

}
