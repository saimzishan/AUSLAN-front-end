import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChange, ViewContainerRef } from '@angular/core';
import {MdDialog, MdDialogConfig, MdDialogRef} from '@angular/material';
import {BookingDetailComponent} from '../booking-detail/booking-detail.component';
import {Booking} from '../../shared/model/booking.entity';

@Component({
  selector: 'app-booking-filter',
  templateUrl: './booking-filter.component.html',
  styleUrls: ['./booking-filter.component.css']
})
export class BookingFilterComponent implements OnChanges {
    @Input('bookingModel') bookingModel: Booking;
    @Output() refreshEmitter = new EventEmitter();

    isNewBooking = true;

    dialogRef: MdDialogRef<any>;

    constructor(
        public dialog: MdDialog,
        public viewContainerRef: ViewContainerRef) { }

    onRefresh() {
      this.refreshEmitter.emit();
    }

    ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
        for (let propName in changes) {
            if (!changes[propName].isFirstChange()) {
                let to = JSON.stringify(changes[propName].currentValue);
                let from = JSON.stringify(changes[propName].previousValue);
                console.log(`${propName} changed from ${from} to ${to}`);
                this.isNewBooking = false;
                this.showDialogBox();
            }
        }
    }

    newBooking() {
      this.isNewBooking = true;
      this.bookingModel = new Booking();
      this.showDialogBox();
    }

    public showDialogBox() {

        let config = new MdDialogConfig();
        config.viewContainerRef = this.viewContainerRef;

        this.dialogRef = this.dialog.open(BookingDetailComponent, config);
        this.dialogRef.componentInstance.bookingModel = this.bookingModel;
        this.dialogRef.componentInstance.isNewBooking = this.isNewBooking;
        this.dialogRef.componentInstance.showForm = !this.isNewBooking;
        this.dialogRef.componentInstance.setRole();

        this.dialogRef.componentInstance.onRefresh.subscribe( res => {
          this.onRefresh();
        });

        this.dialogRef.afterClosed().subscribe(result => {
          this.isNewBooking = true;
          this.bookingModel = new Booking();

        });
    }

}
