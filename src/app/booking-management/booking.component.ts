import {Component, AfterViewChecked} from '@angular/core';
import {BookingService} from '../api/booking.service';
import {Booking} from '../shared/model/booking.entity';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/observable/throw';
import {SpinnerService} from '../spinner/spinner.service';
import {RolePermission} from '../shared/role-permission/role-permission';
import {IndividualClient, Interpreter, OrganisationalRepresentative, User} from '../shared/model/user.entity';
import {ROLE} from '../shared/model/role.enum';
import {GLOBAL} from '../shared/global';
import {MobileFooterComponent} from '../ui/mobile-footer/mobile-footer.component';
import {BOOKING_STATUS} from '../shared/model/booking-status.enum';
import {BookingInterpreter} from '../shared/model/contact.entity';


@Component({
    selector: 'app-booking',
    templateUrl: './booking.component.html',
    styleUrls: ['./booking.component.css']
})
export class BookingComponent {
    bookings: Array<Booking> = [];
    activeFilter = '';


    constructor(public spinnerService: SpinnerService, public bookingDataService: BookingService,
                private rolePermission: RolePermission) {
        this.fetchBookings();
    }


    setActiveFilter(activeFilter: string) {
        this.activeFilter = activeFilter;
    }

    isActiveFilter(activeFilter: string) {
        return this.activeFilter === activeFilter;
    }

    fetchBookings() {
        this.spinnerService.requestInProcess(true);
        this.bookingDataService.fetchBookings()
            .subscribe((res: any) => {
                    if (res.status === 200) {
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
                                    && b.state === BOOKING_STATUS.Allocated
                                    && (currentInt.state === 'Invited' ||
                                        currentInt.state === 'decline')) {
                                    continue;
                                } else {
                                    this.bookings.push(b);
                                }
                            }
                        }
                        this.bookings.sort((x, y) => parseInt(x.id, 10) - parseInt(y.id, 10));
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

}
