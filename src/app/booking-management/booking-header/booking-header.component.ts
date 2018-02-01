import {Component, Input, ViewContainerRef, OnInit, OnDestroy} from '@angular/core';
import {BookingHeaderService} from '../booking-header/booking-header.service';
import {BOOKING_STATE} from '../../shared/model/booking-state.enum';
import {Booking} from '../../shared/model/booking.entity';
import {GLOBAL} from '../../shared/global';
import {Administrator, BookingOfficer, Interpreter, OrganisationalRepresentative} from '../../shared/model/user.entity';
import {Router} from '@angular/router';
import {MdDialog, MdDialogConfig, MdDialogRef} from '@angular/material';
import {PopupComponent} from '../../shared/popup/popup.component';
import {NotificationServiceBus} from '../../notification/notification.service';

@Component({
    selector: 'app-booking-header',
    templateUrl: './booking-header.component.html',
    styleUrls: ['./booking-header.component.css']
})
export class BookingHeaderComponent implements OnInit, OnDestroy {

    @Input() bookingModel: Booking = new Booking();
    @Input() oldBookingModel: Booking = new Booking();
    @Input() isCancelOrUnable = false;
    @Input() invitePress = false;
    @Input() unAssignPress = false;
    @Input() reAssignPress = false;
    @Input() unlinkPress = false;
    @Input() bookingState = BOOKING_STATE.None;
    @Input() showButtons = false;
    dialogRef: MdDialogRef<any>;
    dialogSub;
    @Input() disableAccept = false;
    @Input() disableReject = false;
    @Input() hasLinkId: boolean;

    constructor(private bookingHeaderService: BookingHeaderService, private router: Router, public dialog: MdDialog, public viewContainerRef: ViewContainerRef,
         public notificationService: NotificationServiceBus) {
    }

    ngOnInit() {
        if (this.isCurrentUserInterpreter()) {
            this.showButtons = false;
        }
    }

    ngOnDestroy() {
        return this.dialogSub && this.dialogSub.unsubscribe();
    }

    showDialogBoxClick(data) {
        if (this.isCurrentUserAdminOrBookingOfficer()) {
        this.bookingHeaderService.notifyOther({option: 'showDialogBox', value: data});
        } else {
            this.notificationService.launchNotification(true, ' If you want to cancel this booking, please contact the booking office');
        }
    }

    showDialogBoxInterpreter(data) {
        this.bookingHeaderService.notifyOther({option: 'showDialogBoxInterpreter', value: data});
    }

    bookingDetailClick() {
        this.bookingHeaderService.notifyOther({option: 'editBooking', value: ''});
    }

    duplicateClick() {
        this.bookingHeaderService.notifyOther({option: 'duplicateBooking', value: ''});
    }

    unlinkBooking() {
        this.bookingHeaderService.notifyOther({option: 'unlinkBooking'});
    }

    linkBooking() {
        this.bookingHeaderService.notifyOther({option: 'linkBooking'});
    }

    saveClick() {
        this.bookingHeaderService.notifyOther({option: 'saveChanges', value: ''});
    }
    undoCancelClick() {
        this.bookingHeaderService.notifyOther({option: 'undoCancel', value: ''});
    }

    isActiveState(bookingStatus: string) {
        return BOOKING_STATE[this.bookingModel.state].toLowerCase() === bookingStatus.toLowerCase();
    }
    isUnableToServiceOrCanceled_States() {
        let isState = false ;
        if (Date.now() < Date.parse(this.bookingModel.venue.start_time_iso)) {
        isState = this.bookingModel.state === BOOKING_STATE.Cancelled_chargeable ? true :
                this.bookingModel.state === BOOKING_STATE.Unable_to_service ? true :
                this.bookingModel.state === BOOKING_STATE.Cancelled_no_charge ? true : false ;
            }
        return isState;
    }
    isPassedState(bookingStatus: string) {
        return parseInt(this.bookingModel.state.toString(), 10) >
            parseInt(BOOKING_STATE[bookingStatus].toString(), 10);
    }

    infoClick() {
        if (this.isActive('booking-job') || this.isActive('job-detail')) {
            return;
       } else {
            if (this.isModelChanged(this.oldBookingModel, this.bookingModel)) {
                let config: MdDialogConfig = {
                    disableClose: true
                };
                config.viewContainerRef = this.viewContainerRef;
                this.dialogRef = this.dialog.open(PopupComponent, config);
                this.dialogRef.componentInstance.title = 'Unsaved changes';
                this.dialogRef.componentInstance.cancelTitle = 'Leave page';
                this.dialogRef.componentInstance.okTitle = 'Stay on page';
                this.dialogRef.componentInstance.closeVal = true;
                this.dialogRef.componentInstance.popupMessage =
                    `There are unsaved changes on this page. Are you sure you want to leave?`;

                this.dialogSub = this.dialogRef.afterClosed().subscribe(result => {
                    if (result) {
                        return;
                    } else {
                        this.gotoBookingInfo();
                    }
                });
            } else {
                this.gotoBookingInfo();
            }
        }
    }

    isActive(route: string) {
        return this.router.url.includes(route);
    }

    isModelChanged(oldModel, currentModel) {
        return !(JSON.stringify(oldModel) === JSON.stringify(currentModel));
    }

    gotoBookingInfo() {
        let route = GLOBAL.currentUser instanceof Interpreter || GLOBAL.currentUser instanceof OrganisationalRepresentative
            ? 'job-detail' : 'booking-job';
        this.router.navigate(['/booking-management/' + GLOBAL.selBookingID, route]);
    }

    isCurrentUserInterpreter() {
        return GLOBAL.currentUser instanceof Interpreter;
    }

    isCurrentUserAdminOrBookingOfficer(): boolean {
        return Boolean(GLOBAL.currentUser instanceof Administrator ||
            GLOBAL.currentUser instanceof BookingOfficer);
    }

}
