import {Component, Input} from '@angular/core';
import {Booking} from '../../shared/model/booking.entity';
import {Administrator, BookingOfficer, Interpreter, IndividualClient, OrganisationalRepresentative} from '../../shared/model/user.entity';
import {GLOBAL} from '../../shared/global';
import {BOOKING_STATE} from '../../shared/model/booking-state.enum';
import * as moment from 'moment';
import { BookingInterpreter } from '../../shared/model/contact.entity';

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
        return Boolean(GLOBAL.currentUser instanceof Interpreter || GLOBAL.currentUser instanceof IndividualClient);
    };

    isOrgRep(): boolean {
        return Boolean(GLOBAL.currentUser instanceof OrganisationalRepresentative);
    }

    isClientOrOrgRep(): boolean {
        return Boolean(GLOBAL.currentUser instanceof IndividualClient || GLOBAL.currentUser instanceof OrganisationalRepresentative);
    }

    isClientInterpAndBookInProgress(): boolean {
        return this.isClientOrInterpreter() && this.isBookingInProgress();
    }

    isClientAndBookingInProgress(): boolean {
        return Boolean(GLOBAL.currentUser instanceof IndividualClient && this.isBookingInProgress());
    }

    isAcceptedByCurrentInterpreter(): boolean {
        if (GLOBAL.currentUser instanceof Interpreter && this.selectedBookingModel.interpreters.length > 0) {
            let currentInterpreter: BookingInterpreter = this.selectedBookingModel.interpreters.find(i => i.id === GLOBAL.currentUser.id);
            return (currentInterpreter.state === 'Accepted');
        } else {
            return true;
        }
    }

    calculateDaysAgo(created_at) {
        let createdDate = moment(created_at);
        let currentDate = moment(Date.now());
        return currentDate.diff(createdDate, 'days');
    }
}
