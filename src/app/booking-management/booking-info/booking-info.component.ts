import {Component, Input} from '@angular/core';
import {Booking} from '../../shared/model/booking.entity';
import {Administrator, BookingOfficer, Interpreter, IndividualClient, OrganisationalRepresentative} from '../../shared/model/user.entity';
import {GLOBAL} from '../../shared/global';
import {BOOKING_STATE} from "../../shared/model/booking-state.enum";

@Component({
    selector: 'app-booking-info',
    templateUrl: './booking-info.component.html',
    styleUrls: ['./booking-info.component.css']
})
export class BookingInfoComponent {

    @Input() selectedBookingModel: Booking = new Booking();

    constructor() { }

    isBookingInProgress(): boolean {
        return Boolean(this.selectedBookingModel.state === BOOKING_STATE.In_progress);
    }

    isCurrentUserAdminOrBookingOfficer(): boolean {
        return Boolean(GLOBAL.currentUser instanceof Administrator || GLOBAL.currentUser instanceof BookingOfficer);
    }

    isClientOrInterpreter(): boolean {
        return Boolean(GLOBAL.currentUser instanceof Interpreter || GLOBAL.currentUser instanceof IndividualClient)
    };

    isOrgRep(): boolean {
        return Boolean(GLOBAL.currentUser instanceof OrganisationalRepresentative);
    }
}
