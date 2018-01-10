import {Component, Input, ViewContainerRef, OnInit, OnDestroy} from '@angular/core';
import {BookingHeaderService} from '../booking-header/booking-header.service';
import {BOOKING_STATE} from '../../shared/model/booking-state.enum';
import {Booking} from '../../shared/model/booking.entity';
import {GLOBAL} from '../../shared/global';
import {Administrator, BookingOfficer, Interpreter, OrganisationalRepresentative} from '../../shared/model/user.entity';
import {Router} from '@angular/router';
import {MdDialog, MdDialogConfig, MdDialogRef} from '@angular/material';
import {PopupComponent} from '../../shared/popup/popup.component';

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

    constructor(private bookingHeaderService: BookingHeaderService, private router: Router, public dialog: MdDialog, public viewContainerRef: ViewContainerRef) {
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
        this.bookingHeaderService.notifyOther({option: 'showDialogBox', value: data});
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

    isActiveState(bookingStatus: string) {
        return BOOKING_STATE[this.bookingState].toLowerCase() === bookingStatus.toLowerCase();
    }

    isPassedState(bookingStatus: string) {
        return parseInt(this.bookingState.toString(), 10) >
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
