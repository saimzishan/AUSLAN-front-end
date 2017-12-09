import {Component, OnDestroy, OnInit, ViewContainerRef} from '@angular/core';
import {Booking} from '../../shared/model/booking.entity';
import {BookingService} from '../../api/booking.service';
import {BA, BOOKING_NATURE} from '../../shared/model/booking-nature.enum';
import {SpinnerService} from '../../spinner/spinner.service';
import {BOOKING_STATE} from '../../shared/model/booking-state.enum';
import {GLOBAL} from '../../shared/global';
import {NotificationServiceBus} from '../../notification/notification.service';
import {Router, ActivatedRoute} from '@angular/router';
import {RolePermission} from '../../shared/role-permission/role-permission';
import {DatePipe} from '@angular/common';
import {FormGroup} from '@angular/forms';
import {FileUploader} from 'ng2-file-upload';
import {Address} from '../../shared/model/venue.entity';
import {MdDialog, MdDialogConfig, MdDialogRef} from '@angular/material';
import {PreferedAllocationService} from '../../shared/prefered-allocation.service';
import {IndividualClient, OrganisationalRepresentative, Interpreter, BookingOfficer, Administrator , UserFactory} from '../../shared/model/user.entity';
import {PopupComponent} from '../../shared/popup/popup.component';
import {Contact} from '../../shared/model/contact.entity';
import {UserService} from '../../api/user.service';
import {isNullOrUndefined} from 'util';

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
    standardInvoice = 'true';
    rdgSpecialInstruction = 'true';
    oldBookingModel;
    dialogSub;
    appointment_types = Object.keys(BOOKING_NATURE)
        .filter(value => {
            return (value === BOOKING_NATURE[value] || BOOKING_NATURE[value].startsWith(value)) && value !== BOOKING_NATURE[BOOKING_NATURE.None];
        }).map(v => BOOKING_NATURE[v]) as string[];

    specific_appointment_types = [];
    currentUserIsContact = false;
    currentUserIsClient = 'true';
    prefInterpreter: boolean;
    dialogRef: MdDialogRef<any>;
    fileName = '';
    termsAndConditionAccepted = false;
    showPreferred = 'false';
    showProfilePreferred = 'false';
    // userModel - Used only for preferred interpreters
    userModel;
    showBlocked = 'false';
    showProfileBlocked = 'false';
    bookingHeading = '';
    shouldEdit = '';
    assignedInterpreter = 0;
    oldDocuments = [];
    deleteDocuments = [];
    allClientsOrg = [];
    bookingForItems = [];
    isDisabledForOrgRepIndClient: boolean;
    isUserAdminORBookOfficer: boolean;
    preferAllocSub: any;
    oldInterpreterPreference = [];
    isDisabledForAdmin: boolean;

    constructor(public bookingService: BookingService, private router: Router,
                private route: ActivatedRoute, private rolePermission: RolePermission,
                public notificationServiceBus: NotificationServiceBus, public spinnerService: SpinnerService,
                private datePipe: DatePipe, public dialog: MdDialog,
                public viewContainerRef: ViewContainerRef, public userService: UserService, private _sharedPreferedAllocationService: PreferedAllocationService) {
        BA.loadItems();

        this.bookingModel = new Booking();
        this.onSpecialInstruction();

        /** http://stackoverflow.com/questions/38008334/angular2-rxjs-when-should-i-unsubscribe-from-subscription */
        this.sub = this.route.queryParams.subscribe(params => {
            let param = params['bookingModel'] || '';
            this.shouldEdit = params['shouldEdit'] || '';
            this.assignedInterpreter = params['assignedInterpreter'] || '';

            if (param.length > 0) {
                let jsonData = JSON.parse(param);
                this.bookingModel.fromJSON(jsonData);
                this.oldDocuments = jsonData.documents_attributes;
                this.oldInterpreterPreference = jsonData.preference_allocations_attributes;
                this.bookingModel.documents_attributes = [];
                this.bookingModel.venue.start_time_iso =
                    this.datePipe.transform(this.bookingModel.venue.start_time_iso, 'yyyy-MM-ddTHH:mm:ss');
                this.bookingModel.venue.end_time_iso =
                    this.datePipe.transform(this.bookingModel.venue.end_time_iso, 'yyyy-MM-ddTHH:mm:ss');
                this.natureOfApptChange(null);
            }

            if (this.forEdit()) {
                this.bookingHeading = 'EDIT BOOKING';
                this.termsAndConditionAccepted = true;
            } else {
                this.bookingHeading = 'NEW BOOKING';
                this.bookingModel.bookable_type = this.bookingModel.bookable_type || 'IndividualClient';
            }
        });
    }

    private isCurrentUserContact(): boolean {
        if (this.forEdit()) {
            return GLOBAL.currentUser.email === this.bookingModel.primaryContact.email;
        } else {
            return true;
        }
    }
    getOrgName(item) {
        return (item instanceof OrganisationalRepresentative ?
            (item.organisation_name.toUpperCase()  + ' - ') : '') + item.first_name + ' ' + item.last_name;
    }
    onStartTimeChanged() {
        this.bookingModel.venue.end_time_iso = this.bookingModel.venue.start_time_iso;
    }
    natureOfApptChange($event) {
        let val: BOOKING_NATURE = <BOOKING_NATURE> BOOKING_NATURE[this.bookingModel.raw_nature_of_appointment];
        this.specific_appointment_types = BA.DISSCUSSION_ITEM[BOOKING_NATURE[val]];
    }

    ngOnDestroy() {
        if (this.dialogSub != null) {
            this.dialogSub.unsubscribe();
        }

        let prefSub = this.preferAllocSub && this.preferAllocSub.unsubscribe();
        return prefSub && this.sub && this.sub.unsubscribe();
    }

    ngOnInit() {
        if (GLOBAL.currentUser !== undefined) {
            this.isDisabledForOrgRepIndClient = Boolean(this.isUserOrgRepORIndClientTemp() && this.forEdit()) ;
            this.isUserAdminORBookOfficer = <boolean> this.checkUserAdminORBookOfficer();
            this.isDisabledForAdmin = (this.forEdit() && !this.bookingModel.created_by_admin);
            this.currentUserIsContact = this.isCurrentUserContact();
            if (!this.forEdit()) {
                this.onSelectionChange();
                this.onClientSelectionChange();
            }
            this.currentUserIsClient = this.isUserOrgRep() ? 'false' : 'true';
            this.getUser();
            this.bookingModel.bookable_type = this.bookingModel.bookable_type || 'IndividualClient';
            if (this.isUserAdminORBookOfficer) {
                this.getAllUsers();
                this.bookingModel.created_by_admin = true;
            } else {
                this.oldBookingModel = this.deepCopy(this.bookingModel);
            }
        }
    }

    public onClientSelectionChange() {
        let user = this.isUserAdminORBookOfficer ? this.getBookableUser() : GLOBAL.currentUser;
        if (user) {
            ['first_name', 'last_name', 'email', 'mobile_number', 'ndis_id'].forEach((field) => {
                let currentUserFieldMap = { mobile_number: 'mobile' };
                let currentUserField = currentUserFieldMap[field] || field;
                let value = this.currentUserIsClient === 'true' ? user[currentUserField] : (this.bookingModel.deaf_person[field] || '');
                let mapForNsid = { ndis_id: 'eaf' };
                field = mapForNsid[field] || field;
                this.bookingModel.deaf_person[field] = value;
            });
        }
    }

    public onSelectionChange() {
        let user = this.isUserAdminORBookOfficer ? this.getBookableUser() : GLOBAL.currentUser;
        if (user) {
            ['first_name', 'last_name', 'email', 'mobile_number'].forEach((field) => {
                let currentUserFieldMap = { mobile_number: 'mobile' };
                let currentUserField = currentUserFieldMap[field] || field;
                let value = this.currentUserIsContact ? user[currentUserField] : '';
                this.bookingModel.primaryContact[field] = value;
            });
        }
    }

    public setInvoiceField() {
        let user = this.getBookableUser();
        if (user) {
            if (user['type'] === 'IndividualClient') {
                this.bookingModel.client.organisation_primary_contact = this.standardInvoice === 'true' ?
                    user.individual_client_primary_contact : new Contact();
                this.bookingModel.client.organisation_billing_account.organisation_billing_address = this.standardInvoice === 'true' ?
                    user.individual_client_billing_account.organisation_billing_address : new Address();
                this.bookingModel.client.organisation_billing_account.external_reference = this.standardInvoice === 'true' ?
                    user.individual_client_billing_account.external_reference : '';
                this.bookingModel.deaf_person.eaf = this.standardInvoice === 'true' ? user.ndis_id : '';
            } else {
                this.bookingModel.client.organisation_primary_contact = this.standardInvoice === 'true' ?
                    user.organisation_primary_contact : new Contact();
                this.bookingModel.client.organisation_billing_account.organisation_billing_address = this.standardInvoice === 'true' ?
                    user.organisation_billing_account.organisation_billing_address : new Address();
                this.bookingModel.client.organisation_billing_account.external_reference = this.standardInvoice === 'true' ?
                    user.organisation_billing_account.external_reference : '';
                this.bookingModel.deaf_person.eaf = '';
            }
        }
    }

    private getBookableUser() {
        return this.allClientsOrg.find(u => u.type === this.bookingModel.bookable_type && +u.id === +this.bookingModel.bookable_id);
    }

    public onBookingForSelectionChange() {
        this.userModel = this.isUserAdminORBookOfficer ? this.getBookableUser() : this.userModel;
        this.onSelectionChange();
        this.onClientSelectionChange();
        this.setInvoiceField();
    }

    public onPreferredSelectionChange() {
        if (this.showPreferred === 'false') {
            this.showProfilePreferred = 'false';
            this.bookingModel.preference_allocations_attributes = this.bookingModel.preference_allocations_attributes.filter(a => a.preference !== 'preferred');
        }

    }

    public onProfilePreferredSelectionChange() {
        if (!this.forEdit()) {
            let prefInt = this.userModel.prefferedInterpreters.filter(itm => itm.preference === 'preferred');
            if (this.showProfilePreferred === 'true') {
                this.oldInterpreterPreference = this.oldInterpreterPreference.concat(prefInt);
            } else {
                this.oldInterpreterPreference = this.oldInterpreterPreference.filter(item => prefInt.every(item2 => item2.interpreter_id !== item.interpreter_id));
            }
            this.filterUserPreference(this.oldInterpreterPreference);
        }
    }

    public onBlockedSelectionChange() {
        if (this.showBlocked === 'false') {
            this.showProfileBlocked = 'false';
            this.bookingModel.preference_allocations_attributes = this.bookingModel.preference_allocations_attributes.filter(a => a.preference !== 'blocked');
        }
    }

    public onProfileBlockedSelectionChange() {
        if (!this.forEdit()) {
            let blockInt = this.userModel.prefferedInterpreters.filter(itm => itm.preference === 'blocked');
            if (this.showProfileBlocked === 'true') {
                this.oldInterpreterPreference = this.oldInterpreterPreference.concat(blockInt);
            } else {
                this.oldInterpreterPreference = this.oldInterpreterPreference.filter(item => blockInt.every(item2 => item2.interpreter_id !== item.interpreter_id));
            }
            this.filterUserPreference(this.oldInterpreterPreference);
        }
    }

    public onBookingForChange() {
        this.bookingModel.preference_allocations_attributes = [];
        this.bookingForItems =  this.bookingModel.bookable_type === 'IndividualClient' ?
            this.allClientsOrg.filter(u => u.type === 'IndividualClient') :
            this.allClientsOrg.filter(u => u.type === 'OrganisationalRepresentative');
    }

    isNotIndClient() {
        return !(GLOBAL.currentUser instanceof IndividualClient);
    }

    isUserOrgRepORIndClientTemp(): Boolean {
        return Boolean(GLOBAL.currentUser instanceof OrganisationalRepresentative ||
            GLOBAL.currentUser instanceof IndividualClient);
    }
    isUserOrgRep(): Boolean {
        return Boolean(GLOBAL.currentUser instanceof OrganisationalRepresentative);
    }
    onSpecialInstruction() {
        let special_instructions =
            isNullOrUndefined(<OrganisationalRepresentative>GLOBAL.currentUser) ? '' : (<OrganisationalRepresentative>GLOBAL.currentUser).special_instructions;
        this.bookingModel.special_instructions =
            this.rdgSpecialInstruction === 'true' ? special_instructions : '';
    }

    checkUserAdminORBookOfficer(): Boolean {
        return Boolean(GLOBAL.currentUser instanceof Administrator ||
            GLOBAL.currentUser instanceof BookingOfficer) ;
    }

    forEdit(): Boolean {
        return Boolean(this.shouldEdit.length > 0 && this.shouldEdit === 'edit');
    }

    public onStandardInvoice() {
        if (GLOBAL.currentUser instanceof OrganisationalRepresentative) {
            let currentUser = <OrganisationalRepresentative>GLOBAL.currentUser;

            this.bookingModel.client.organisation_primary_contact = this.standardInvoice === 'true' ?
                currentUser.organisation_primary_contact : new Contact();

            this.bookingModel.client.organisation_billing_account.organisation_billing_address = this.standardInvoice === 'true' ?
                currentUser.organisation_billing_account.organisation_billing_address : new Address();
        } else if (this.isUserAdminORBookOfficer) {
            this.setInvoiceField();
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

        if (addressForm.isTravelCostApplicable && !form.value.travel_cost_applicable) {
            this.notificationServiceBus.launchNotification(true, 'Travel cost must be applicable as your booking distance is more than 40 kms');
            return;
        }
        if (!this.termsAndConditionAccepted && !this.forEdit()) {
            this.notificationServiceBus.launchNotification(true, 'Kindly accept Terms and Conditions');
            return;
        }
        if (form.invalid || addressForm.form.invalid || billingForm.form.invalid) {
            this.notificationServiceBus.launchNotification(true, GLOBAL.MISSING_FIELDS_ERROR_MESSAGE);
            return;
        }

        if (this.bookingModel.interpreters_required < 2 && this.isMoreInterpreterNeeded()) {
            let message = `This booking might require more than 1 interpreter. You've only requested 1 interpreter.
                            Are you sure you want to create this booking?` ;
            let title   = 'Warning: this interpreter might require more interpreters';
            this.createModal(title, message);
            this.dialogSub = this.dialogRef.afterClosed().subscribe(result => {
                if (result) {
                    this.proceedWithBooking();
                }
            });
        } else if (this.isLongBooking()) {
            let message = `This booking will take 12 hours or more. Are you sure you want to submit this booking?` ;
            let title   = 'Long Booking WARNING';
            this.createModal(title, message);
            this.dialogSub = this.dialogRef.afterClosed().subscribe(result => {

                if (result) {
                    this.proceedWithBooking();
                }
            });

        } else {
            this.proceedWithBooking();
        }
    }

    // have to merge this with save booking later.
    proceedWithBooking() {
        if (this.isBookingTimeInNonStandardHours()) {
            let message = `This booking is not within the standard booking hours (8AM - 6PM).
                            Do you still want to create booking?` ;
            let title   = 'NON-STANDARD HOURS WARNING';
            this.createModal(title, message);
            this.dialogSub = this.dialogRef.afterClosed().subscribe(result => {

                if (result) {
                    if (this.shouldEdit.length > 0 && this.shouldEdit === 'edit') {
                        this.updateBooking();
                    } else {
                        this.createBooking();
                    }
                }
            });
        } else {
            if (this.shouldEdit.length > 0 && this.shouldEdit === 'edit') {
                this.updateBooking();
            } else {
                this.createBooking();
            }
        }
    }

    isMoreInterpreterNeeded() {
        return this.calculateTimeDiff() > _ONE_HOUR;
        /* One hour */
    }

    calculateTimeDiff() {
        let startDate = new Date(this.bookingModel.venue.start_time_iso);
        let endDate = new Date(this.bookingModel.venue.end_time_iso);
        let timeDiff = Math.abs(endDate.getTime() - startDate.getTime());

        return timeDiff;
    }

    isLongBooking() {
          return this.calculateTimeDiff() >= _ONE_HOUR * 12;
    }

    createModal(title: any, message: any) {
        let config: MdDialogConfig = {
            disableClose: true
        };
        config.viewContainerRef = this.viewContainerRef;
        this.dialogRef = this.dialog.open(PopupComponent, config);
        this.dialogRef.componentInstance.title = title;
        this.dialogRef.componentInstance.cancelTitle = 'BACK';
        this.dialogRef.componentInstance.okTitle = 'CREATE';
        this.dialogRef.componentInstance.popupMessage = message;

    }

    private isBookingTimeInNonStandardHours() {
        let startDate = new Date(this.bookingModel.venue.start_time_iso);
        let endDate = new Date(this.bookingModel.venue.end_time_iso);

        return startDate.getHours() < 6 || (
            (endDate.getHours() === 20 && (endDate.getMinutes() > 0
                || endDate.getSeconds() > 0) ) || endDate.getHours() > 20);
    }

    createBooking() {
        if (!this.bookingModel.bookable_id) {
            this.bookingModel.bookable_id = GLOBAL.currentUser.id;
            this.bookingModel.bookable_type = GLOBAL.currentUser.type;
        }
        this.spinnerService.requestInProcess(true);
        this.bookingModel.state = BOOKING_STATE.Requested; // res.data.state;
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
        if ((this.bookingModel.state === BOOKING_STATE.In_progress || this.bookingModel.state === BOOKING_STATE.Allocated) && this.isImportantFieldsChanged()) {
            let config: MdDialogConfig = {
                disableClose: true
            };
            config.viewContainerRef = this.viewContainerRef;
            this.dialogRef = this.dialog.open(PopupComponent, config);
            this.dialogRef.componentInstance.title = 'Important Fields Changed';
            this.dialogRef.componentInstance.cancelTitle = 'Back';
            this.dialogRef.componentInstance.okTitle = 'Yes';
            this.dialogRef.componentInstance.popupMessage =
                `Interpreter(s) have been/is allocated for this job. You're charging important fields of the booking.
                 Do you have confirmation from the interpreter(s) that these changes are OK?`;

            this.dialogSub = this.dialogRef.afterClosed().subscribe(result => {
                if (result) {
                    this.saveBooking();
                }
            });
        } else {
            this.saveBooking();
        }
    }

    saveBooking() {
        if (this.assignedInterpreter > this.bookingModel.interpreters_required) {
            this.notificationServiceBus.launchNotification(true, 'Oops! Too many interpreters already allocated. Please unassign first.');
            return;
        } else {
            this.spinnerService.requestInProcess(true);
            let bookingID = this.bookingModel.id;

            this.deleteDocuments.forEach(element => {
                this.bookingModel.documents_attributes.push(element);
            });

            this.bookingService.updateBooking(bookingID, this.bookingModel)
                .subscribe((res: any) => {
                        if (res.status === 204 && res.ok === true) {
                            this.notificationServiceBus.launchNotification(false, 'The Booking has been Updated.');
                            this.gotoBookingInfo();
                        }
                        this.spinnerService.requestInProcess(false);
                    },
                    errors => {
                        this.spinnerService.requestInProcess(false);
                        let e = errors.json() || '';
                        this.notificationServiceBus.launchNotification(true,
                            'Error occurred on server side. ' + errors.statusText + ' ' + JSON.stringify(e || e.errors));
                    });
        }
    }

    gotoBookingInfo() {
        let route = GLOBAL.currentUser instanceof Interpreter || GLOBAL.currentUser instanceof OrganisationalRepresentative
          ? 'job-detail' : 'booking-job';
        this.router.navigate(['/booking-management/' + GLOBAL.selBookingID, route]);
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

    fireNotification(evnt) {
        if ((evnt.target as Element).hasAttribute('readonly')) {
            this.notificationServiceBus.launchNotification(true, 'In order to change this field, please contact the booking office.');
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

    handleBulkUploadSelect(evt) {
        let files = evt.target.files;
        let file = files[0];
        evt.srcElement.value = '';
        // File uploader wont add a duplicate file
        if (files && file) {
            this.fileName = file.name;

            let reader = new FileReader();
            reader.onload = this._handleBulkUploadReaderLoaded.bind(this);
            reader.readAsDataURL(file);
        }
    }

    _handleBulkUploadReaderLoaded(readerEvt) {
        this.spinnerService.requestInProcess(true);
        this.bookingService.bulkUploadBookings(readerEvt.target.result)
            .subscribe((res: any) => {
                    if (res.status === 204) {
                        this.notificationServiceBus.launchNotification(false, 'The Bookings in your bulk upload file have been created.');
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
    getUser() {

        if (this.bookingModel.preference_allocations_attributes.filter(itm => itm.preference === 'preferred').length > 0) {
            this.showPreferred = 'true';
            this.showProfilePreferred = 'true';
        }

        if (this.bookingModel.preference_allocations_attributes.filter(itm => itm.preference === 'blocked').length > 0) {
            this.showBlocked = 'true';
            this.showProfileBlocked = 'true';
        }

        this.userModel = Boolean(GLOBAL.currentUser) && GLOBAL.currentUser instanceof OrganisationalRepresentative ?
                (<OrganisationalRepresentative>GLOBAL.currentUser) :
                Boolean(GLOBAL.currentUser) && GLOBAL.currentUser instanceof IndividualClient ?
                    (<IndividualClient>GLOBAL.currentUser) :
                    Boolean(GLOBAL.currentUser) && GLOBAL.currentUser instanceof BookingOfficer ?
                    (<BookingOfficer>GLOBAL.currentUser) : GLOBAL.currentUser;

        this.bookingModel.preference_allocations_attributes = [];
        this.preferAllocSub = this._sharedPreferedAllocationService.interpreterStream$.subscribe(data => {
            this.filterUserPreference(data);
        });
    }

    filterUserPreference(interpreters) {
        this.oldInterpreterPreference = interpreters;
        if (this.forEdit()) {
            interpreters.forEach(i => {
                if (i.hasOwnProperty('_destroy')) {
                    this.bookingModel.preference_allocations_attributes.push({ 'id': i.interpreter_id, '_destroy': '1' });
                    this.oldInterpreterPreference = this.oldInterpreterPreference.filter(old => old.interpreter_id !== i.interpreter_id);
                }
            });
        } else {
            let prefAlloc = this.bookingModel.preference_allocations_attributes;
            this.bookingModel.preference_allocations_attributes = [];
            interpreters.forEach(i => {
                if (this.showPreferred === 'true') {
                    if (i.preference === 'preferred' && !i.hasOwnProperty('_destroy')) {
                        this.bookingModel.preference_allocations_attributes.push({ 'interpreter_id': i.interpreter_id, 'preference': i.preference });
                    } else if (i.hasOwnProperty('_destroy')) {
                        this.userModel.prefferedInterpreters = this.userModel.prefferedInterpreters.filter(itm => itm.interpreter_id !== i.interpreter_id);
                    }
                }

                if (this.showBlocked === 'true') {
                    if (i.preference === 'blocked' && !i.hasOwnProperty('_destroy')) {
                        this.bookingModel.preference_allocations_attributes.push({ 'interpreter_id': i.interpreter_id, 'preference': i.preference });
                    } else if (i.hasOwnProperty('_destroy')) {
                        this.userModel.prefferedInterpreters = this.userModel.prefferedInterpreters.filter(itm => itm.interpreter_id !== i.interpreter_id);
                    }
                }
            });
        }
    }

    confirmDelete(docID) {
        let obj = {'id': docID, '_destroy': '1'};
        this.deleteDocuments.push(obj);
        this.oldDocuments = this.oldDocuments.filter(d => d.id !== docID);
    }

    isImportantFieldsChanged() {
        return (this.bookingModel.venue.start_time_iso !== this.datePipe.transform(this.oldBookingModel.start_time, 'yyyy-MM-ddTHH:mm:ss'))
            || (this.bookingModel.venue.end_time_iso !== this.datePipe.transform(this.oldBookingModel.end_time, 'yyyy-MM-ddTHH:mm:ss'))
            || (this.bookingModel.raw_nature_of_appointment !== this.oldBookingModel.nature_of_appointment)
            || (this.bookingModel.specific_nature_of_appointment !== this.oldBookingModel.specific_nature_of_appointment)
            || (this.bookingModel.venue.street_name !== this.oldBookingModel.address_attributes.street_name)
            || (this.bookingModel.venue.state !== this.oldBookingModel.address_attributes.state)
            || (this.bookingModel.venue.suburb !== this.oldBookingModel.address_attributes.suburb)
            || (this.bookingModel.venue.post_code !== this.oldBookingModel.address_attributes.post_code);
    }

    deepCopy(oldObj: any) {
        if (this.forEdit()) {
            let newObj = JSON.parse(JSON.stringify(oldObj));
            return newObj;
        }
    }
    isNewBooking() {
        return this.router.url.includes('create-booking');
    }

    getAllUsers() {
        this.spinnerService.requestInProcess(true);
        this.userService.fetchUsers()
            .subscribe((res: any) => {
                    this.spinnerService.requestInProcess(false);
                    if (res.status === 200 ) {
                        this.allClientsOrg = res.data.users.map( u => UserFactory.createUser(u));
                        this.oldBookingModel = this.deepCopy(this.bookingModel);
                        this.onBookingForChange();
                    }
                },
                errors => {
                    this.spinnerService.requestInProcess(false);
                    let e = errors.json() || '';
                    this.notificationServiceBus.launchNotification(true,
                        'Error occured on server side. ' + errors.statusText + ' ' + JSON.stringify(e || e.errors));
                });
    }
}
