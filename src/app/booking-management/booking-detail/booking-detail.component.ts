import {Component, AfterViewChecked, OnDestroy, OnChanges, Directive, SimpleChanges, OnInit, ViewContainerRef} from '@angular/core';
import {Booking} from '../../shared/model/booking.entity';
import {BookingService} from '../../api/booking.service';
import {BA, BOOKING_NATURE} from '../../shared/model/booking-nature.enum';
import {PARKING} from '../../shared/model/parking.enum';
import {SpinnerService} from '../../spinner/spinner.service';
import {BOOKING_STATE} from '../../shared/model/booking-state.enum';
import {GLOBAL} from '../../shared/global';
import {NotificationServiceBus} from '../../notification/notification.service';
import {Router, ActivatedRoute} from '@angular/router';
import {RolePermission} from '../../shared/role-permission/role-permission';
import {DatePipe} from '@angular/common';
import {FormGroup, NgForm} from '@angular/forms';
import {FileUploader, FileUploaderOptions} from 'ng2-file-upload';

import {Address} from '../../shared/model/venue.entity';
import {MdDialog, MdDialogConfig, MdDialogRef} from '@angular/material';
import {IndividualClient, OrganisationalRepresentative} from '../../shared/model/user.entity';
import {PopupComponent} from '../../shared/popup/popup.component';
import {Contact} from '../../shared/model/contact.entity';


const _ONE_HOUR = 1000 /*milliseconds*/
    * 60 /*seconds*/
    * 60 /*minutes*/;

@Component({
    selector: 'app-booking-detail',
    templateUrl: './booking-detail.component.html',
    styleUrls: ['./booking-detail.component.css']

})
export class BookingDetailComponent implements OnInit, OnDestroy {


    private sub: any;
    public uploader: FileUploader = new FileUploader({url: '', maxFileSize: 20 * 1024 * 1024});
    bookingModel: Booking;
    oldBookingModel;
    standardInvoice = 'false';
    rdgSpecialInstruction = 'false';
    dialogSub;
    appointment_types = Object.keys(BOOKING_NATURE).filter(value => value === BOOKING_NATURE[value]
        || BOOKING_NATURE[value].startsWith(value)).map(v => BOOKING_NATURE[v]) as string[];

    specific_appointment_types = [];
    parking_types = PARKING;
    currentUserIsContact = 'true';
    currentUserIsClient = 'true';
    prefInterpreter: boolean;
    dialogRef: MdDialogRef<any>;
    fileName = '';
    termsAndConditionAccepted = false;
    bookingHeading='';
    shouldEdit='';
    assignedInterpreter =0;
    oldDocuments =[];
    deleteDocuments=[];

    constructor(public bookingService: BookingService, private router: Router,
                private route: ActivatedRoute, private rolePermission: RolePermission,
                public notificationServiceBus: NotificationServiceBus, public spinnerService: SpinnerService,
                private datePipe: DatePipe, public dialog: MdDialog,
                public viewContainerRef: ViewContainerRef) {
        BA.loadItems();

        this.bookingModel = new Booking();
        this.oldBookingModel = new Booking();

        /** http://stackoverflow.com/questions/38008334/angular2-rxjs-when-should-i-unsubscribe-from-subscription */
        this.sub = this.route.queryParams.subscribe(params => {
            let param = params['bookingModel'] || '';
             this.shouldEdit = params ['shouldEdit'] || '';
             this.assignedInterpreter = params ['assignedInterpreter'] || '';

            if (param.length > 0) {
                let jsonData = JSON.parse(param);
                this.bookingModel.fromJSON(jsonData);
                this.oldDocuments = jsonData.documents_attributes;
                this.bookingModel.documents_attributes = [];
                this.bookingModel.venue.start_time_iso =
                    this.datePipe.transform(this.bookingModel.venue.start_time_iso, 'yyyy-MM-ddTHH:mm:ss');
                this.bookingModel.venue.end_time_iso =
                    this.datePipe.transform(this.bookingModel.venue.end_time_iso, 'yyyy-MM-ddTHH:mm:ss');
                this.natureOfApptChange(null);

                this.oldBookingModel = this.deepCopy(this.bookingModel);
            } 

            this.bookingHeading = (this.shouldEdit.length > 0 && this.shouldEdit  === 'edit' ) ? "EDIT BOOKING" : "NEW BOOKING"

        });
 
    }

    public fileOverBase(e: any) {
    }

    natureOfApptChange($event) {
        let val: BOOKING_NATURE = <BOOKING_NATURE> BOOKING_NATURE[this.bookingModel.raw_nature_of_appointment];
        this.specific_appointment_types = BA.DISSCUSSION_ITEM[BOOKING_NATURE[val]];
    }

    ngOnDestroy() {
      
        if(this.dialogSub != null)
            this.dialogSub.unsubscribe();

        return this.sub && this.sub.unsubscribe();
    }

    ngOnInit() {
        if (GLOBAL.currentUser !== undefined) {
            this.onSelectionChange();
            this.onClientSelectionChange();
        }
    }

    public onClientSelectionChange() {
        this.bookingModel.deaf_person.first_name = this.currentUserIsClient === 'true' ? GLOBAL.currentUser.first_name : '';
        this.bookingModel.deaf_person.last_name = this.currentUserIsClient === 'true' ? GLOBAL.currentUser.last_name : '';
        this.bookingModel.deaf_person.email = this.currentUserIsClient === 'true' ? GLOBAL.currentUser.email : '';
        this.bookingModel.deaf_person.mobile_number = this.currentUserIsClient === 'true' ? GLOBAL.currentUser.mobile : '';
    }

    public onSelectionChange() {
        this.bookingModel.primaryContact.first_name =
            this.currentUserIsContact === 'true' ? GLOBAL.currentUser.first_name : '';
        this.bookingModel.primaryContact.last_name =
            this.currentUserIsContact === 'true' ? GLOBAL.currentUser.last_name : '';
        this.bookingModel.primaryContact.email =
            this.currentUserIsContact === 'true' ? GLOBAL.currentUser.email : '';
        this.bookingModel.primaryContact.mobile_number =
            this.currentUserIsContact === 'true' ? GLOBAL.currentUser.mobile : '';
    }

    isNotIndClient() {
        return GLOBAL.currentUser instanceof IndividualClient === false;
    }

    isUserOrgRepORIndClientTemp() {
    return GLOBAL.currentUser instanceof OrganisationalRepresentative ||
        GLOBAL.currentUser instanceof IndividualClient;
    }
    onSpecialInstruction () {
        this.bookingModel.special_instructions =
            this.rdgSpecialInstruction === 'true' ? (<OrganisationalRepresentative>GLOBAL.currentUser).special_instructions : '';
    }
    public onStandardInvoice() {
        if ( GLOBAL.currentUser instanceof OrganisationalRepresentative) {
            let currentUser = <OrganisationalRepresentative>GLOBAL.currentUser;

            this.bookingModel.client.organisation_primary_contact = this.standardInvoice === 'true' ?
                currentUser.organisation_primary_contact : new Contact();

            this.bookingModel.client.organisation_billing_account.organisation_billing_address = this.standardInvoice === 'true' ?
                currentUser.organisation_billing_account.organisation_billing_address : new Address();
        } else {
            let currentUser = <IndividualClient>GLOBAL.currentUser;

            this.bookingModel.client.organisation_primary_contact = this.standardInvoice === 'true' ?
                currentUser.individual_client_primary_contact : new Contact();

            this.bookingModel.client.organisation_billing_account.organisation_billing_address = this.standardInvoice === 'true' ?
                currentUser.individual_client_billing_account.organisation_billing_address : new Address();
        }
    }

    /*
      Calling this method will create a new booking
    */
    public onCreateBooking(form: FormGroup, addressForm: any, billingForm: any, uploader: FileUploader) {
        if (!this.termsAndConditionAccepted) {
            this.notificationServiceBus.
            launchNotification(true, 'Kindly accept Terms and Conditions');
            return;
        }
        if (form.invalid || addressForm.form.invalid || billingForm.form.invalid) {
            this.notificationServiceBus.launchNotification(true, 'Kindly fill all the required (*) fields');
            return;
        }
        if (this.isBookingTimeInNonStandardHours()) {
            let config: MdDialogConfig = {
                disableClose: true
            };
            config.viewContainerRef = this.viewContainerRef;
            this.dialogRef = this.dialog.open(PopupComponent, config);
            this.dialogRef.componentInstance.title = 'NON-STANDARD HOURS WARNING';
            this.dialogRef.componentInstance.cancelTitle = 'BACK';
            this.dialogRef.componentInstance.okTitle = 'CREATE';
            this.dialogRef.componentInstance.popupMessage =
                `This booking is not within the standard booking hours (8AM - 6PM).
                 Do you still want to create booking?`;

            this.dialogSub = this.dialogRef.afterClosed().subscribe(result => {

                if (result) {
                    if (this.shouldEdit.length > 0 && this.shouldEdit === 'edit')
                        this.updateBooking()
                    else
                        this.createBooking();
                }
            });
        } else {
            if (this.shouldEdit.length > 0 && this.shouldEdit === 'edit')
                this.updateBooking()
            else
                this.createBooking();
        }
    }

    isMoreInterpreterNeeded() {
        let startDate = new Date(this.bookingModel.venue.start_time_iso);
        let endDate = new Date(this.bookingModel.venue.end_time_iso);
        let timeDiff = Math.abs(endDate.getTime() - startDate.getTime());

        return timeDiff > _ONE_HOUR;
        /* One hour */
    }

    private isBookingTimeInNonStandardHours() {
        let startDate = new Date(this.bookingModel.venue.start_time_iso);
        let endDate = new Date(this.bookingModel.venue.end_time_iso);

        return startDate.getHours() < 6 || (
            (endDate.getHours() === 20 && (endDate.getMinutes() > 0
                || endDate.getSeconds() > 0) ) || endDate.getHours() > 20);
    }

    createBooking() {
        this.spinnerService.requestInProcess(true);
        this.bookingModel.state = BOOKING_STATE.Requested; // res.data.state;
        this.bookingModel.clean(this.bookingModel.toJSON());
        this.bookingService.createBooking(this.bookingModel)
            .subscribe((res: any) => {
                    if (res.status === 201 && res.data.id && 0 < res.data.id) {
                        this.bookingModel.id = res.data.id;
                        this.notificationServiceBus.launchNotification(false, 'The Booking has been created.');
                        let route = this.rolePermission.getDefaultRouteForCurrentUser();
                        this.router.navigate([route]);
                    }
                    this.spinnerService.requestInProcess(false);
                },
                errors => {
                    this.spinnerService.requestInProcess(false);
                    let e = errors.json() || '';
                    this.notificationServiceBus.launchNotification(true,
                        'Error occured on server side. ' + errors.statusText + ' ' + JSON.stringify(e || e.errors));
                });
    }

    updateBooking() { 

        if (this.bookingModel.state == 4 || this.bookingModel.state == 5) {
            if (this.isImportantFieldsChanged()) {
                let config: MdDialogConfig = {
                    disableClose: true
                };
                config.viewContainerRef = this.viewContainerRef;
                this.dialogRef = this.dialog.open(PopupComponent, config);
                this.dialogRef.componentInstance.title = 'Important Fields Changed WARNING';
                this.dialogRef.componentInstance.cancelTitle = 'BACK/YES';
                this.dialogRef.componentInstance.okTitle = 'SAVE CHANGES';
                this.dialogRef.componentInstance.popupMessage =
                    `Interpreter(s) have been/is allocated for this job. Did you get confirmation from the interpreter(s) that these changes are OK?`;

                this.dialogSub = this.dialogRef.afterClosed().subscribe(result => {
                    this.saveBooking();
                });
            }
            else
                this.saveBooking();
        }
        else
            this.saveBooking();
        
    }

    saveBooking(){

        if (this.assignedInterpreter > this.bookingModel.interpreters_required) {
            let config: MdDialogConfig = {
                disableClose: true
            };
            config.viewContainerRef = this.viewContainerRef;
            this.dialogRef = this.dialog.open(PopupComponent, config);
            this.dialogRef.componentInstance.title = 'Assigned Interpreter WARNING';
            this.dialogRef.componentInstance.cancelTitle = 'BACK';
            this.dialogRef.componentInstance.okTitle = 'Ok';
            this.dialogRef.componentInstance.popupMessage =
                `"Oops! Too many interpreters already allocated. Please unassign first.`;
        }
        else {
            
        this.spinnerService.requestInProcess(true);
        let bookingID = this.bookingModel.id;
        this.bookingModel.clean(this.bookingModel.toJSON());

        this.deleteDocuments.forEach(element => {
            this.bookingModel.documents_attributes.push(element);
        });
        
        this.bookingService.updateBooking(bookingID, this.bookingModel)
            .subscribe((res: any) => {
                if (res.status === 204 && res.ok === true) {
                    this.notificationServiceBus.launchNotification(false, 'The Booking has been Updated.');
                    let route = this.rolePermission.getDefaultRouteForCurrentUser();
                    this.router.navigate([route]);
                }
                this.spinnerService.requestInProcess(false);
            },
            errors => {
                this.spinnerService.requestInProcess(false);
                let e = errors.json() || '';
                this.notificationServiceBus.launchNotification(true,
                    'Error occured on server side. ' + errors.statusText + ' ' + JSON.stringify(e || e.errors));
            });
        }
    }

    onCancelBooking() {
        let route = this.rolePermission.getDefaultRouteForCurrentUser();
        this.router.navigate([route]);
    }

    tocChanged (val: boolean) {
        this.termsAndConditionAccepted = val;
    }

    handleFileSelect(evt) {

        let files = evt.target.files;

        let file = files[0];
        // File uploader wont add a duplicate file
        if (files && file) {
            this.fileName = file.name;

                let reader = new FileReader();
                reader.onload = this._handleReaderLoaded.bind(this);
                reader.readAsDataURL(file);
        }
    }

    _handleReaderLoaded(readerEvt) {
        this.bookingModel.documents_attributes.push({document: readerEvt.target.result, document_file_name: this.fileName});
    }
    removeDocuments(item) {
        if (this.bookingModel.documents_attributes.filter( d => d.document_file_name === item.file.name).length > 0) {
            item.remove();
            this.bookingModel.documents_attributes =
                this.bookingModel.documents_attributes.filter(d => d.document_file_name !== item.file.name);
        }
    }

    confirmDelete(docID){
          
        let obj = {"id":docID,"_destroy":"1"};
        this.deleteDocuments.push(obj); 
        this.oldDocuments= this.oldDocuments.filter(d => d.id !== docID);
    }

    isImportantFieldsChanged()
    { 
        if ((this.bookingModel.venue.start_time_iso != this.oldBookingModel.venue.start_time_iso) || (this.bookingModel.venue.end_time_iso != this.oldBookingModel.venue.end_time_iso)
            || (this.bookingModel.raw_nature_of_appointment != this.oldBookingModel.raw_nature_of_appointment) || (this.bookingModel.specific_nature_of_appointment != this.oldBookingModel.specific_nature_of_appointment)
            || (this.bookingModel.venue.street_name != this.oldBookingModel.venue.street_name) || (this.bookingModel.venue.state != this.oldBookingModel.venue.state)
            || (this.bookingModel.venue.suburb != this.oldBookingModel.venue.suburb) || (this.bookingModel.venue.post_code != this.oldBookingModel.venue.post_code)
        )
            return true;
        else
            return false;
    }

 //   https://stackoverflow.com/questions/36124363/deep-copying-objects-in-angular2
    deepCopy(oldObj: any) {
        var newObj = oldObj;
        if (oldObj && typeof oldObj === "object") {
            newObj = Object.prototype.toString.call(oldObj) === "[object Array]" ? [] : {};
            for (var i in oldObj) {
                newObj[i] = this.deepCopy(oldObj[i]);
            }
        }
        return newObj;
    }
}
