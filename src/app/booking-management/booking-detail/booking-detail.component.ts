import {Component, OnDestroy, OnInit, ViewContainerRef, ViewChild, ChangeDetectorRef} from '@angular/core';
import {Booking} from '../../shared/model/booking.entity';
import {BookingService} from '../../api/booking.service';
import {BA, BOOKING_NATURE} from '../../shared/model/booking-nature.enum';
import {SpinnerService} from '../../spinner/spinner.service';
import {BOOKING_STATE} from '../../shared/model/booking-state.enum';
import {GLOBAL, ModalOptions} from '../../shared/global';
import {NotificationServiceBus} from '../../notification/notification.service';
import {BookingHeaderService} from '../booking-header/booking-header.service';
import {Router, ActivatedRoute} from '@angular/router';
import {RolePermission} from '../../shared/role-permission/role-permission';
import {DatePipe} from '@angular/common';
import {FormGroup, FormControl} from '@angular/forms';
import {FileUploader} from 'ng2-file-upload';
import {Address} from '../../shared/model/venue.entity';
import {MdDialog, MdDialogConfig, MdDialogRef} from '@angular/material';
import {PreferedAllocationService} from '../../shared/prefered-allocation.service';
import {IndividualClient, OrganisationalRepresentative, Interpreter, BookingOfficer, Administrator, UserFactory} from '../../shared/model/user.entity';
import {PopupComponent} from '../../shared/popup/popup.component';
import {Contact} from '../../shared/model/contact.entity';
import {UserService} from '../../api/user.service';
import * as moment from 'moment';
import {isNullOrUndefined, debug} from 'util';
import {AddressComponent} from '../../ui/address/address.component';

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
    bookable: IndividualClient | OrganisationalRepresentative;
    standardInvoice = true;
    rdgSpecialInstruction = true;
    oldBookingModel;
    dialogSub;
    appointment_types = Object.keys(BOOKING_NATURE)
        .filter(value => {
            return (value === BOOKING_NATURE[value] || BOOKING_NATURE[value].startsWith(value)) && value !== BOOKING_NATURE[BOOKING_NATURE.None];
        }).map(v => BOOKING_NATURE[v]) as string[];

    specific_appointment_types = [];
    currentUserIsContact = false;
    currentUserIsClient = true;
    rdBookingAddress = true;
    prefInterpreter: boolean;
    dialogRef: MdDialogRef<any>;
    fileName = '';
    termsAndConditionAccepted = false;
    showPreferred = false;
    showProfilePreferred = false;
    // userModel - Used only for preferred interpreters
    userModel;
    showBlocked = false;
    showProfileBlocked = false;
    bookingHeading = '';
    forEdit = false;
    assignedInterpreter = 0;
    private headerSubscription;
    oldDocuments = [];
    deleteDocuments = [];
    allClientsOrg = [];
    isDisabledForOrgRepIndClient: boolean;
    isUserAdminORBookOfficer: boolean;
    preferAllocSub: any;
    oldInterpreterPreference = [];
    isDisabledForAdmin: boolean;
    bookingDate: Date;
    minDate = new Date();
    minDateForRecurrenceEnd = this.minDate;
    maxDate: Date;
    bookingStartTime: Date;
    bookingEndTime: Date;
    isDuplicate: boolean;
    cbCaptioner = false;
    cbNotetaker = false;
    cbAuslanInterpreter = true;
    cbDeafInterpreter = false;
    cbDeafBlindInterpreter = false;
    cbOtherLanguageNeeds = false;
    cbVisualFrameInterpreter = false;
    cbTactileInterpreter = false;
    cbPlatformInterpreter = false;
    cbAslInterpreter = false;
    cbBslInterpreter = false;
    cbIslInterpreter = false;
    cbSignedEnglishInterpreter = false;
    cbIndigenousSignInterpreter = false;
    defaultDateTime: Date;
    isRecurringBooking = false;
    isDisableForClientOrgBookOfficer = false;
    hasBlockInt: Boolean = false;
    hasPrefInt: Boolean = false;
    duplicatingBookable: number;
    repeat_days = [
        {
            display: 'S',
            value: 'Sunday',
            selected: false
        },
        {
            display: 'M',
            value: 'Monday',
            selected: false
        },
        {
            display: 'T',
            value: 'Tuesday',
            selected: false
        },
        {
            display: 'W',
            value: 'Wednesday',
            selected: false
        },
        {
            display: 'T',
            value: 'Thursday',
            selected: false
        },
        {
            display: 'F',
            value: 'Friday',
            selected: false
        },
        {
            display: 'S',
            value: 'Saturday',
            selected: false
        }
    ];
    @ViewChild('addressForm') private bookingAddress: AddressComponent;

    constructor(public bookingService: BookingService, private router: Router,
                private route: ActivatedRoute, private rolePermission: RolePermission,
                public notificationServiceBus: NotificationServiceBus, public spinnerService: SpinnerService,
                public bookingHeaderService: BookingHeaderService,
                private datePipe: DatePipe, public dialog: MdDialog, private changeDetector: ChangeDetectorRef,
                public viewContainerRef: ViewContainerRef, public userService: UserService, private _sharedPreferedAllocationService: PreferedAllocationService) {
        BA.loadItems();

        this.bookingModel = new Booking();
        this.onSpecialInstruction();

        /** http://stackoverflow.com/questions/38008334/angular2-rxjs-when-should-i-unsubscribe-from-subscription */
        this.sub = this.route.queryParams.subscribe(params => {
            let param = params['bookingModel'] || '';
            let shouldEdit = params['shouldEdit'] || '';
            this.forEdit = Boolean(shouldEdit.length > 0 && shouldEdit === 'edit');
            this.assignedInterpreter = params['assignedInterpreter'] || '';
            if (param.length > 0 && shouldEdit === '') {
                this.isDuplicate = true;
            } else {
                this.isDuplicate = false;
            }

            if (param.length > 0) {
                let jsonData = JSON.parse(param);
                this.bookingModel.fromJSON(jsonData);
                this.duplicatingBookable = jsonData.bookable_id;
                this.oldDocuments = jsonData.documents_attributes;
                this.oldInterpreterPreference = jsonData.preference_allocations_attributes;
                this.bookingModel.documents_attributes = [];
                this.bookingDate = new Date(this.datePipe.transform(this.bookingModel.venue.start_time_iso, 'MM/dd/yyyy'));
                this.setTime();
                this.natureOfApptChange(null);
                this.checkInterpreterBoxes();
            } else {
                this.newBooking();
            }

            if (this.forEdit) {
                this.bookingHeading = 'EDIT BOOKING';
                this.termsAndConditionAccepted = true;
                this.checkInterpreterBoxes();
                this.isDisableForClientOrgBookOfficer = ((GLOBAL.currentUser instanceof BookingOfficer || this.isUserOrgRepORIndClientTemp()) &&
                                                         this.isStateCancelClaimExportedUnableService(this.bookingModel.state));
            } else {
                this.bookingHeading = 'NEW BOOKING';
                this.bookingModel.bookable_type = this.bookingModel.bookable_type || 'IndividualClient';
                this.bookingModel.bookable_id = 0;
                this.roundOffMinutes();
            }
        });
    }

    isStateCancelClaimExportedUnableService(state) {
        return state === BOOKING_STATE.Claimed || state === BOOKING_STATE.Cancelled_claimed ||
               state === BOOKING_STATE.Claimed_exported || state === BOOKING_STATE.Cancelled_claimed_exported ||
               state === BOOKING_STATE.Cancelled_no_charge || state === BOOKING_STATE.Unable_to_service;
    }

    private isCurrentUserContact(): boolean {
        if (this.forEdit) {
            return this.bookingModel.client.email === this.bookingModel.primaryContact.email
                || GLOBAL.currentUser.email === this.bookingModel.primaryContact.email;
        } else {
            return true;
        }
    }

    private isCurrentUserClient(): boolean {
        if (this.forEdit) {
            return this.bookingModel.deaf_person.email === this.bookingModel.primaryContact.email
                || GLOBAL.currentUser.email === this.bookingModel.primaryContact.email;
        } else {
            return !this.isUserOrgRep();
        }
    }

    serviceTypeChange(serviceType: string, cbName) {
        if (this.forEdit) {
            if (this.assignedInterpreter > 0) {
                this[serviceType] = cbName.checked = false;
                this.notificationServiceBus.launchNotification(true, 'Oops. Deallocate interpreters before changing the service type.');
                return;
            }
            let allServiceTypes = ['cbAuslanInterpreter', 'cbDeafInterpreter', 'cbDeafBlindInterpreter', 'cbCaptioner', 'cbNotetaker', 'cbOtherLanguageNeeds',
                                   'cbVisualFrameInterpreter', 'cbTactileInterpreter', 'cbPlatformInterpreter', 'cbAslInterpreter', 'cbBslInterpreter',
                                   'cbIslInterpreter', 'cbSignedEnglishInterpreter', 'cbIndigenousSignInterpreter'];

            allServiceTypes.forEach(type => {
                if (serviceType !== type) {
                    this[type] = false;
                }
            });

            ['number_of_auslan_interpreters_required', 'number_of_deaf_interpreters_required', 'number_of_deaf_blind_interpreters_required',
             'number_of_captioners_required', 'number_of_note_takers_required', 'number_of_visual_frame_interpreters_required', 'number_of_tactile_interpreters_required',
             'number_of_platform_interpreters_required', 'number_of_asl_interpreters_required', 'number_of_bsl_interpreters_required',
             'number_of_isl_interpreters_required', 'number_of_signed_english_interpreters_required',
             'number_of_indigenous_sign_interpreters_required'].forEach(modelVal => {
                    this.bookingModel[modelVal] = 0;
                });
            this.changeDetector.detectChanges();
        } else {
            if (serviceType === 'cbAuslanInterpreter') {
                this.bookingModel.number_of_auslan_interpreters_required = 0;
            } else if (serviceType === 'cbDeafInterpreter') {
                this.bookingModel.number_of_deaf_interpreters_required = 0;
            } else if (serviceType === 'cbDeafBlindInterpreter') {
                this.cbVisualFrameInterpreter = this.cbTactileInterpreter = this.cbPlatformInterpreter = false;
            } else if (serviceType === 'cbCaptioner') {
                this.bookingModel.number_of_captioners_required = 0;
            } else if (serviceType === 'cbNotetaker') {
                this.bookingModel.number_of_note_takers_required = 0;
            } else if (serviceType === 'cbVisualFrameInterpreter') {
                this.bookingModel.number_of_visual_frame_interpreters_required = 0;
            } else if (serviceType === 'cbTactileInterpreter') {
                this.bookingModel.number_of_tactile_interpreters_required = 0;
            } else if (serviceType === 'cbPlatformInterpreter') {
                this.bookingModel.number_of_platform_interpreters_required = 0;
            } else if (serviceType === 'cbOtherLanguageNeeds') {
                this.cbAslInterpreter = this.cbBslInterpreter = this.cbIslInterpreter = this.cbSignedEnglishInterpreter =
                                                                                this.cbIndigenousSignInterpreter = false;
            } else if (serviceType === 'cbAslInterpreter') {
                this.bookingModel.number_of_asl_interpreters_required = 0;
            } else if (serviceType === 'cbBslInterpreter') {
                this.bookingModel.number_of_bsl_interpreters_required = 0;
            } else if (serviceType === 'cbIslInterpreter') {
                this.bookingModel.number_of_isl_interpreters_required = 0;
            } else if (serviceType === 'cbSignedEnglishInterpreter') {
                this.bookingModel.number_of_signed_english_interpreters_required = 0;
            } else if (serviceType === 'cbIndigenousSignInterpreter') {
                this.bookingModel.number_of_indigenous_sign_interpreters_required = 0;
            }
        }
    }

    getOrgName(item): string | undefined {
        return item && ((item instanceof OrganisationalRepresentative ?
            (item.organisation_name.toUpperCase() + ' - ') : '') + item.first_name + ' ' + item.last_name);
    }

    timeFormatting() {
        let selectedDate = this.datePipe.transform(this.bookingDate, 'yyyy-MM-dd');
        let startTime = moment(this.bookingStartTime, 'hh:mm A').format('HH:mm:ss');
        let endTime = moment(this.bookingEndTime, 'hh:mm A').format('HH:mm:ss');
        this.bookingModel.venue.start_time_iso = selectedDate + 'T' + startTime + this.bookingModel.getDayLightSavings(selectedDate);
        this.bookingModel.venue.end_time_iso = selectedDate + 'T' + endTime + this.bookingModel.getDayLightSavings(selectedDate);
    }

    natureOfApptChange($event) {
        let val: BOOKING_NATURE = <BOOKING_NATURE> BOOKING_NATURE[this.bookingModel.raw_nature_of_appointment];
        this.specific_appointment_types = BA.DISSCUSSION_ITEM[BOOKING_NATURE[val]];
    }

    ngOnDestroy() {
        if (this.dialogSub != null) {
            this.dialogSub.unsubscribe();
        }

        let headerSub = this.headerSubscription && this.headerSubscription.unsubscribe();
        let prefSub = this.preferAllocSub && this.preferAllocSub.unsubscribe();
        return headerSub && prefSub && this.sub && this.sub.unsubscribe();
    }

    ngOnInit() {
        if (GLOBAL.currentUser !== undefined) {
            this.isDisabledForOrgRepIndClient = Boolean(this.isUserOrgRepORIndClientTemp() && this.forEdit);
            this.isUserAdminORBookOfficer = <boolean> this.checkUserAdminORBookOfficer();
            this.isDisabledForAdmin = (this.forEdit && !this.bookingModel.created_by_admin);
            this.currentUserIsContact = this.isCurrentUserContact();
            this.currentUserIsClient = this.isCurrentUserClient();
            if (this.isDuplicate) {
                this.getUserById(this.duplicatingBookable);
            }
            if (!this.forEdit) {
                this.onSelectionChange();
                this.onClientSelectionChange();
                this.onStandardInvoice();
            }
            this.getUser();
            this.bookingModel.bookable_type = this.bookingModel.bookable_type || 'IndividualClient';
            if (this.isUserAdminORBookOfficer) {
                this.bookingModel.created_by_admin = true;
            }
            this.oldBookingModel = this.deepCopy(this.bookingModel);

            if (!this.forEdit && !this.isDuplicate) {
                this.onBookingAddressChange();
            }
            this.bookingAddress.isTravelCostApplicable = this.bookingModel.travel_cost_applicable;
            this.headerSubscription = this.bookingHeaderService.notifyObservable$.subscribe((res) => {
                this.callRelatedFunctions(res);
            });
        }
        this.dateRestrictions();
    }

    dateRestrictions() {
        let today = new Date();
        let year = today.getFullYear();
        this.minDate = new Date();
        this.isUserAdminORBookOfficer ? this.minDate.setFullYear(year - 5) : this.minDate.setDate(today.getDate());
        this.maxDate = new Date();
        this.maxDate.setFullYear(year + 5);
        this.minDateForRecurrenceEnd = this.getMinDateForRecurringBookingEnd();
    }

    callRelatedFunctions(res) {
        if (res.hasOwnProperty('option')) {
            switch (res.option) {
                case 'refreshBooking':
                    this.newBooking();
                    this.bookable = undefined;
                    break;
            }
        }
    }

    newBooking() {
        this.bookingModel = new Booking();
        this.bookingDate = undefined;
        this.bookingStartTime = undefined;
        this.bookingEndTime = undefined;
        this.isRecurringBooking = false;
        this.resetPrefBlockInterpreters();
        this.onSpecialInstruction();
        this.resetRecurringDays();
    }

    getMinDateForRecurringBookingEnd() {
        return this.bookingDate || this.minDate;
    }

    setTime() {
        let startTime = this.bookingModel.utcToBookingTimeZone(this.bookingModel.venue.start_time_iso);
        let endTime = this.bookingModel.utcToBookingTimeZone(this.bookingModel.venue.end_time_iso);
        let currentDate = new Date();

        this.bookingStartTime = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(),
                                         moment.duration(startTime).get('hours'), moment.duration(startTime).get('minutes'));
        this.bookingEndTime = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(),
                                       moment.duration(endTime).get('hours'), moment.duration(endTime).get('minutes'));
    }

    roundOffMinutes() {
        let currentDate = new Date();
        this.defaultDateTime = currentDate;
        let minute = Math.ceil(currentDate.getMinutes() / 5) * 5;
        this.defaultDateTime.setMinutes(minute);
    }

    public onClientSelectionChange() {
        let user = this.isUserAdminORBookOfficer ? this.bookable : GLOBAL.currentUser;
        if (user) {
            ['first_name', 'last_name', 'email', 'mobile_number', 'ndis_id', 'general_notes', 'claim_notes'].forEach((field) => {
                let currentUserFieldMap = {mobile_number: 'mobile'};
                let currentUserField = currentUserFieldMap[field] || field;
                let value = this.currentUserIsClient ? user[currentUserField] : '';
                let mapForNsid = {ndis_id: 'eaf'};
                field = mapForNsid[field] || field;
                this.bookingModel.deaf_person[field] = value;
                if (field === 'general_notes') {
                    this.bookingModel.general_notes = value;
                } else if (field === 'claim_notes') {
                    this.bookingModel.claim_notes = value;
                }
            });
        }
    }

    public onSelectionChange() {
        let user = this.isUserAdminORBookOfficer ? this.bookable : GLOBAL.currentUser;
        if (user) {
            ['first_name', 'last_name', 'email', 'mobile_number'].forEach((field) => {
                let currentUserFieldMap = {mobile_number: 'mobile'};
                let currentUserField = currentUserFieldMap[field] || field;
                let value = this.currentUserIsContact ? user[currentUserField] : '';
                this.bookingModel.primaryContact[field] = value;
            });
        }
    }

    public onBookingAddressChange() {
        let user = GLOBAL.currentUser;
        if (user) {
            ['unit_number', 'street_number', 'street_name', 'suburb', 'state', 'post_code'].forEach((field) => {
                let value = this.rdBookingAddress ? (this.isUserOrgRep() ?
                    user.organisation_attributes.address_attributes[field] : this.isIndClient() ? user.address_attributes[field] : '') : '';
                this.bookingModel.venue[field] = value;
            });
            // this.bookingAddress.calculateDistance();
        }
    }

    public setInvoiceField() {
        let user = this.bookable;
        if (user) {
            if (user instanceof IndividualClient) {
                this.bookingModel.client.organisation_primary_contact = this.standardInvoice ?
                    user.individual_client_primary_contact : new Contact();
                this.bookingModel.client.organisation_billing_account.organisation_billing_address = this.standardInvoice ?
                    user.individual_client_billing_account.organisation_billing_address : new Address();
                this.bookingModel.client.organisation_billing_account.external_reference = this.standardInvoice ?
                    user.individual_client_billing_account.external_reference : '';
                this.bookingModel.deaf_person.eaf = this.standardInvoice ? user.eaf_id : '';
                this.bookingModel.deaf_person.ur_number = this.standardInvoice ? user.ur_id : '';
                this.bookingModel.deaf_person.ndis_id = this.standardInvoice ? user.ndis_id : '';
            } else {
                this.bookingModel.client.organisation_primary_contact = this.standardInvoice ?
                    user.organisation_primary_contact : new Contact();
                this.bookingModel.client.organisation_billing_account.organisation_billing_address = this.standardInvoice ?
                    user.organisation_billing_account.organisation_billing_address : new Address();
                this.bookingModel.client.organisation_billing_account.external_reference = this.standardInvoice ?
                    user.organisation_billing_account.external_reference : '';
                this.bookingModel.deaf_person.eaf = '';
                this.bookingModel.deaf_person.ndis_id = '';
                this.bookingModel.deaf_person.ur_number = '';
            }
        }
    }

    public onBookingForChange() {
        this.bookingModel.preference_allocations_attributes = [];
        this.bookingModel.bookable_id = 0;
        this.bookable = undefined;
    }

    public onBookingForSelectionChange(selectedObject: IndividualClient | OrganisationalRepresentative) {
        this.bookingModel.preference_allocations_attributes = [];
        this.bookingModel.bookable_id = selectedObject.id;
        this.userModel = this.isUserAdminORBookOfficer ? this.bookable : this.userModel;
        this.onSelectionChange();
        this.onClientSelectionChange();
        this.setInvoiceField();
    }

    public onPreferredSelectionChange() {
        let tempPrefInterp = [];
        if (!this.showPreferred) {
            this.showProfilePreferred = false;
            this.bookingModel.preference_allocations_attributes = this.bookingModel.preference_allocations_attributes.filter(a => a.preference !== 'preferred');
            this.oldInterpreterPreference = [];
        } else {
            if (this.isUserAdminORBookOfficer && this.bookable !== undefined) {
                tempPrefInterp = this.bookable.prefferedInterpreters.filter(itm => itm.preference === 'preferred');
                this.hasPrefInt = (tempPrefInterp.length > 0);
            } else if (this.userModel.type === 'OrganisationalRepresentative' || this.userModel.type === 'IndividualClient') {
                tempPrefInterp = this.userModel.prefferedInterpreters.filter(itm => itm.preference === 'preferred');
                this.hasPrefInt = (tempPrefInterp.length > 0);
            }
        }
    }

    public onProfilePreferredSelectionChange() {
        if (!this.forEdit) {
            let prefInt = this.userModel.prefferedInterpreters.filter(itm => itm.preference === 'preferred');
            if (this.showProfilePreferred) {
                this.oldInterpreterPreference = this.oldInterpreterPreference.concat(prefInt);
            } else {
                this.oldInterpreterPreference = this.oldInterpreterPreference.filter(item => prefInt.every(item2 => item2.interpreter_id !== item.interpreter_id));
            }
            this.filterUserPreference(this.oldInterpreterPreference);
        }
    }

    public onBlockedSelectionChange() {
        let tempBlockInterp = [];
        if (!this.showBlocked) {
            this.showProfileBlocked = false;
            this.bookingModel.preference_allocations_attributes = this.bookingModel.preference_allocations_attributes.filter(a => a.preference !== 'blocked');
            this.oldInterpreterPreference = [];
        } else {
            if (this.isUserAdminORBookOfficer && this.bookable !== undefined) {
                tempBlockInterp = this.bookable.prefferedInterpreters.filter(itm => itm.preference === 'blocked');
                this.hasBlockInt = (tempBlockInterp.length > 0);
            } else if (this.userModel.type === 'OrganisationalRepresentative' || this.userModel.type === 'IndividualClient') {
                tempBlockInterp = this.userModel.prefferedInterpreters.filter(itm => itm.preference === 'blocked');
                this.hasBlockInt = (tempBlockInterp.length > 0);
            }
        }
    }

    public onProfileBlockedSelectionChange() {
        if (!this.forEdit) {
            let blockInt = this.userModel.prefferedInterpreters.filter(itm => itm.preference === 'blocked');
            if (this.showProfileBlocked) {
                this.oldInterpreterPreference = this.oldInterpreterPreference.concat(blockInt);
            } else {
                this.oldInterpreterPreference = this.oldInterpreterPreference.filter(item => blockInt.every(item2 => item2.interpreter_id !== item.interpreter_id));
            }
            this.filterUserPreference(this.oldInterpreterPreference);
        }
    }

    private camelCaseToUnderScore(bookable_type: string): string {
        return bookable_type.replace(/([a-zA-Z])(?=[A-Z])/g, '$1_').toLowerCase();
    }

    private filterBookingForItems(event: any): any {
        const name = event.query;
        const api_path = this.camelCaseToUnderScore(this.bookingModel.bookable_type) + 's';
        return this.userService.fetchUsersOfType(api_path, {
            pagination: false,
            search_text: name
        }).subscribe((res: any) => {
            this.allClientsOrg = res.data.users.map(u => {
                const singleUser = <IndividualClient | OrganisationalRepresentative>UserFactory.createUser(u);
                singleUser.displayName = this.getOrgName(singleUser);
                return singleUser;
            });
            return this.allClientsOrg;
        });
    }

    public getUserById(id: number) {
        let bookableUser;
        this.userService.getUser(id)
            .subscribe((res: any) => {
                if (res.status === 200) {
                    bookableUser = res.data;
                    const singleUser = <IndividualClient | OrganisationalRepresentative>UserFactory.createUser(bookableUser);
                    singleUser.displayName = this.getOrgName(singleUser);
                    this.bookable = singleUser;
                    this.bookingModel.bookable_id = singleUser.id;
                    this.userModel = this.isUserAdminORBookOfficer ? this.bookable : this.userModel;
                    this.onSelectionChange();
                    this.onClientSelectionChange();
                    this.setInvoiceField();
                }
            });
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

    isIndClient() {
        return (GLOBAL.currentUser instanceof IndividualClient);
    }

    onSpecialInstruction() {
        let special_instructions =
            isNullOrUndefined(<OrganisationalRepresentative>GLOBAL.currentUser) ? '' : (<OrganisationalRepresentative>GLOBAL.currentUser).special_instructions;
        this.bookingModel.special_instructions =
            this.rdgSpecialInstruction ? special_instructions : '';
    }

    checkUserAdminORBookOfficer(): Boolean {
        return Boolean(GLOBAL.currentUser instanceof Administrator ||
            GLOBAL.currentUser instanceof BookingOfficer);
    }

    public onStandardInvoice() {
        if (GLOBAL.currentUser instanceof OrganisationalRepresentative) {
            let currentUser = <OrganisationalRepresentative>GLOBAL.currentUser;

            this.bookingModel.client.organisation_primary_contact = this.standardInvoice ?
                currentUser.organisation_primary_contact : new Contact();

            this.bookingModel.client.organisation_billing_account.organisation_billing_address = this.standardInvoice ?
                currentUser.organisation_billing_account.organisation_billing_address : new Address();
        } else if (this.isUserAdminORBookOfficer) {
            this.setInvoiceField();
        } else {
            let currentUser = <IndividualClient>GLOBAL.currentUser;

            this.bookingModel.client.organisation_primary_contact = this.standardInvoice ?
                currentUser.individual_client_primary_contact : new Contact();

            this.bookingModel.client.organisation_billing_account.organisation_billing_address = this.standardInvoice ?
                currentUser.individual_client_billing_account.organisation_billing_address : new Address();
        }
    }

       validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
        const control = formGroup.get(field);
        if (control instanceof FormControl) {
          control.markAsTouched({ onlySelf: true });
        } else if (control instanceof FormGroup) {
          this.validateAllFormFields(control);
        }
      });
    }
    /*
      Calling this method will create a new booking
    */
    public onCreateBooking(form: any, addressForm: any, billingForm: any, uploader: FileUploader) {
        if (addressForm.isTravelCostApplicable && !form.value.travel_cost_applicable) {
            this.notificationServiceBus.launchNotification(true, 'Travel cost must be applicable as your booking distance is more than 40 kms');
            return;
        }
        if (this.shouldSelectDeafBlindOtherLanguage()) {
            let msg = this.cbDeafBlindInterpreter ? 'deaf blind interpreter' : '"Other Language Needs"';
            this.notificationServiceBus.launchNotification(true, 'Select at least one type of ' + msg);
            return;
        }
        if (!this.termsAndConditionAccepted && !this.forEdit) {
            this.notificationServiceBus.launchNotification(true, 'Kindly accept Terms and Conditions');
            return;
        }
        if (form.invalid || addressForm.form.invalid || billingForm.form.invalid) {
            this.validateAllFormFields(form.control);
            this.validateAllFormFields(addressForm.form.control);
            this.validateAllFormFields(billingForm.form.control);
            this.notificationServiceBus.launchNotification(true, GLOBAL.MISSING_FIELDS_ERROR_MESSAGE);
            return;
        }
        if (this.bookingEndTime.getTime() < this.bookingStartTime.getTime()) {
            this.notificationServiceBus.launchNotification(true, 'Sorry. The field(s) underneath are filled in incorrectly. END TIME');
            return;
        }
        if (this.isInterpreterLessThanTwo() && this.isMoreInterpreterNeeded()) {
            let message = `This booking might require more than 1 professional. You've only requested 1.
                            Are you sure you want to create this booking?`;
            let title = 'Warning: this booking might require more professionals';
            this.createModal(title, message);
            this.dialogSub = this.dialogRef.afterClosed().subscribe(result => {
                if (result) {
                    this.proceedWithBooking();
                }
            });
        } else if (this.isLongBooking()) {
            let message = `This booking will take 12 hours or more. Are you sure you want to submit this booking?`;
            let title = 'Long Booking WARNING';
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
            let message = 'This booking is not within the standard booking hours (8AM - 6PM).' +
                            ' Do you still want to ' + (this.forEdit ? 'update' : 'create') + ' booking?';
            let title = 'NON-STANDARD HOURS WARNING';
            this.createModal(title, message);
            this.dialogSub = this.dialogRef.afterClosed().subscribe(result => {
                if (result) {
                    if (this.forEdit) {
                        this.updateLinkedBookings();
                    } else {
                        this.createBooking();
                    }
                }
            });
        } else {
            if (this.forEdit) {
                this.updateLinkedBookings();
            } else {
                this.createBooking();
            }
        }
    }

    isInterpreterLessThanTwo() {

        if (this.cbAuslanInterpreter && this.bookingModel.number_of_auslan_interpreters_required < 2) {
            return true;
        } else if (this.cbDeafInterpreter && this.bookingModel.number_of_deaf_interpreters_required < 2) {
            return true;
        } else if (this.cbCaptioner && this.bookingModel.number_of_captioners_required < 2) {
            return true;
        } else if (this.cbNotetaker && this.bookingModel.number_of_note_takers_required < 2) {
            return true;
        } else if (this.cbVisualFrameInterpreter && this.bookingModel.number_of_visual_frame_interpreters_required < 2) {
            return true;
        } else if (this.cbTactileInterpreter && this.bookingModel.number_of_tactile_interpreters_required < 2) {
            return true;
        } else if (this.cbPlatformInterpreter && this.bookingModel.number_of_platform_interpreters_required < 2) {
            return true;
        } else if (this.cbAslInterpreter && this.bookingModel.number_of_asl_interpreters_required < 2) {
            return true;
        } else if (this.cbBslInterpreter && this.bookingModel.number_of_bsl_interpreters_required < 2) {
            return true;
        } else if (this.cbIslInterpreter && this.bookingModel.number_of_isl_interpreters_required < 2) {
            return true;
        } else if (this.cbSignedEnglishInterpreter && this.bookingModel.number_of_signed_english_interpreters_required < 2) {
            return true;
        } else if (this.cbIndigenousSignInterpreter && this.bookingModel.number_of_indigenous_sign_interpreters_required < 2) {
            return true;
        } else {
            return false;
        }
    }

    checkInterpreterBoxes() {
        this.cbAuslanInterpreter = this.bookingModel.number_of_auslan_interpreters_required > 0;
        this.cbDeafInterpreter = this.bookingModel.number_of_deaf_interpreters_required > 0;
        this.cbCaptioner = this.bookingModel.number_of_captioners_required > 0;
        this.cbNotetaker = this.bookingModel.number_of_note_takers_required > 0;
        this.cbVisualFrameInterpreter = this.bookingModel.number_of_visual_frame_interpreters_required > 0;
        this.cbTactileInterpreter = this.bookingModel.number_of_tactile_interpreters_required > 0;
        this.cbPlatformInterpreter = this.bookingModel.number_of_platform_interpreters_required > 0;
        this.cbAslInterpreter = this.bookingModel.number_of_asl_interpreters_required > 0;
        this.cbBslInterpreter = this.bookingModel.number_of_bsl_interpreters_required > 0;
        this.cbIslInterpreter = this.bookingModel.number_of_isl_interpreters_required > 0;
        this.cbSignedEnglishInterpreter = this.bookingModel.number_of_signed_english_interpreters_required > 0;
        this.cbIndigenousSignInterpreter = this.bookingModel.number_of_indigenous_sign_interpreters_required > 0;

        this.cbDeafBlindInterpreter = this.cbVisualFrameInterpreter || this.cbTactileInterpreter || this.cbPlatformInterpreter;
        this.cbOtherLanguageNeeds = this.cbAslInterpreter || this.cbBslInterpreter || this.cbIslInterpreter || this.cbSignedEnglishInterpreter
                                    || this.cbIndigenousSignInterpreter;
    }

    shouldSelectDeafBlindOtherLanguage() {
        return (this.cbDeafBlindInterpreter && !(this.cbVisualFrameInterpreter || this.cbTactileInterpreter || this.cbPlatformInterpreter))
            || (this.cbOtherLanguageNeeds && !(this.cbAslInterpreter || this.cbBslInterpreter || this.cbIslInterpreter
                || this.cbSignedEnglishInterpreter || this.cbIndigenousSignInterpreter));
    }

    isMoreInterpreterNeeded() {
        return this.calculateTimeDiff() > _ONE_HOUR;
        /* One hour */
    }

    calculateTimeDiff() {
        let startTime = moment(this.bookingStartTime, 'hh:mm A').format('HH:mm:ss');
        let endTime = moment(this.bookingEndTime, 'hh:mm A').format('HH:mm:ss');

        let timeDiff = Math.abs(moment.duration(endTime).asMilliseconds() - moment.duration(startTime).asMilliseconds());

        return timeDiff;
    }

    isLongBooking() {
        return this.calculateTimeDiff() >= _ONE_HOUR * 12;
    }

    createModal(title: string, message: string, options?: ModalOptions) {
        let config: MdDialogConfig = {
            disableClose: true
        };
        config.viewContainerRef = this.viewContainerRef;
        this.dialogRef = this.dialog.open(PopupComponent, config);
        this.dialogRef.componentInstance.title = title;
        this.dialogRef.componentInstance.cancelTitle = (options && options.cancelTitle) || 'BACK';
        this.dialogRef.componentInstance.okTitle = (options && options.okTitle) || this.forEdit ? 'UPDATE' : 'CREATE';
        this.dialogRef.componentInstance.closeVal = (options && options.closeVal) || false;
        this.dialogRef.componentInstance.popupMessage = message;
    }

    private isBookingTimeInNonStandardHours() {
        let startDate = new Date(this.bookingStartTime);
        let endDate = new Date(this.bookingEndTime);

        return startDate.getHours() < 6 || (
            (endDate.getHours() === 20 && (endDate.getMinutes() > 0
                || endDate.getSeconds() > 0)) || endDate.getHours() > 20);
    }

    public isRecurrenceDayCheckboxDisabled(day) {
        const isDisabled = this.bookingDate && this.bookingDate.getDay() === this.repeat_days.indexOf(day);
        if (isDisabled) {
            this.repeat_days[this.repeat_days.indexOf(day)].selected = true;
        }
        return isDisabled;
    }

    private getRecurrenceDays() {
        return this.repeat_days
            .filter(day => day.selected)
            .map(day => day.value);
    }

    createBooking() {
        this.timeFormatting();
        if (!this.bookingModel.bookable_id) {
            this.bookingModel.bookable_id = GLOBAL.currentUser.id;
            this.bookingModel.bookable_type = GLOBAL.currentUser.type;
        }
        this.spinnerService.requestInProcess(true);
        this.bookingModel.state = BOOKING_STATE.Requested; // res.data.state;
        this.bookingModel.new_link_id_required = this.isRecurringBooking;
        this.bookingModel.recurring = this.isRecurringBooking;
        if (this.isRecurringBooking) {
            this.bookingModel.repeat_booking_on_days = this.getRecurrenceDays();
        }
        this.bookingService.createBooking(this.bookingModel)
            .subscribe((res: any) => {
                    if (res.status === 204) {
                        this.notificationServiceBus.launchNotification(false, 'The Booking has been created.');
                        let route = this.rolePermission.getDefaultRouteForCurrentUser();
                        this.router.navigate([route]);
                    }
                    this.spinnerService.requestInProcess(false);
                },
                errors => {
                    this.spinnerService.requestInProcess(false);
                    let e = errors.json() || '';
                    this.notificationServiceBus.launchNotification(true, e);
                });
    }

    updateLinkedBookings() {
        if (this.isUserAdminORBookOfficer && !!this.bookingModel.link_id) {
            const message = 'Would you like to save these changes for all bookings or only for this one?';
            const title = 'Change all bookings?';
            this.createModal(title, message, {okTitle: 'Update only this booking', cancelTitle: 'Update all bookings', closeVal: 'cancel'});
            this.dialogSub = this.dialogRef.afterClosed().subscribe(updateOnlyThisBooking => {
                if (updateOnlyThisBooking !== 'cancel') {
                    this.bookingModel.update_all_linked_bookings = !updateOnlyThisBooking;
                    this.updateBooking();
                }
            });
        } else {
            this.updateBooking();
        }
    }

    updateBooking() {
        if ((this.bookingModel.state === BOOKING_STATE.In_progress || this.bookingModel.state === BOOKING_STATE.Allocated) &&
                                                            (this.assignedInterpreter > 0 && this.isImportantFieldsChanged())) {
            let config: MdDialogConfig = {
                disableClose: true
            };
            config.viewContainerRef = this.viewContainerRef;
            this.dialogRef = this.dialog.open(PopupComponent, config);
            this.dialogRef.componentInstance.title = 'Important Fields Changed';
            this.dialogRef.componentInstance.cancelTitle = 'Back';
            this.dialogRef.componentInstance.okTitle = 'Yes';
            this.dialogRef.componentInstance.popupMessage =
                `Interpreter(s) have been/is allocated for this job. You're changing important fields of the booking.
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
        if (this.isAssignInterpGreaterThanRequested()) {
            let msg = this.cbCaptioner ? 'captioners' : this.cbNotetaker ? 'notetakers' : 'interpreters';
            this.notificationServiceBus.launchNotification(true, 'Oops! Too many ' + msg + ' already allocated. Please unassign first.');
            return;
        } else {
            this.spinnerService.requestInProcess(true);
            const bookingID = this.bookingModel.id;

            this.deleteDocuments.forEach(element => {
                this.bookingModel.documents_attributes.push(element);
            });
            this.timeFormatting();
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
                        this.notificationServiceBus.launchNotification(true, e);
                    });
        }
    }

    isAssignInterpGreaterThanRequested() {
       return this.cbCaptioner ? this.assignedInterpreter > this.bookingModel.number_of_captioners_required :
                                  this.cbNotetaker ? this.assignedInterpreter > this.bookingModel.number_of_note_takers_required :
                                  this.assignedInterpreter > this.bookingModel.number_of_auslan_interpreters_required;

    }

    gotoBookingInfo() {
        let route = GLOBAL.currentUser instanceof Interpreter || GLOBAL.currentUser instanceof OrganisationalRepresentative
            ? 'job-detail' : 'booking-job';
        GLOBAL.selBookingID = Boolean(GLOBAL.selBookingID) && GLOBAL.selBookingID.length > 0 ? GLOBAL.selBookingID : this.bookingModel.id;
        this.router.navigate(['booking-management/' + GLOBAL.selBookingID, route]);
    }

    onCancelBooking() {
        let route = this.rolePermission.getDefaultRouteForCurrentUser();
        this.router.navigate([route]);
    }

    tocChanged(val: boolean) {
        this.termsAndConditionAccepted = val;
    }

    handleFileSelect(evt) {

        let files = evt.target.files;
        let file = files[0];
        evt.srcElement.value = '';

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

    resetRecurringDays() {
        for (const day of this.repeat_days) {
            day.selected = false;
        }
        if (this.bookingDate) {
            this.repeat_days[this.bookingDate.getDay()].selected = true;
            this.minDateForRecurrenceEnd = this.getMinDateForRecurringBookingEnd();
        }
    }

    _handleReaderLoaded(readerEvt) {
        this.bookingModel.documents_attributes.push({document: readerEvt.target.result, document_file_name: this.fileName});
    }

    removeDocuments(item) {
        if (this.bookingModel.documents_attributes.filter(d => d.document_file_name === item.file.name).length > 0) {
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
                    this.notificationServiceBus.launchNotification(true, e);
                });
    }

    getUser() {

        if (this.bookingModel.preference_allocations_attributes.filter(itm => itm.preference === 'preferred').length > 0) {
            this.showPreferred = true;
            this.showProfilePreferred = true;
        }

        if (this.bookingModel.preference_allocations_attributes.filter(itm => itm.preference === 'blocked').length > 0) {
            this.showBlocked = true;
            this.showProfileBlocked = true;
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
        if (this.forEdit) {
            this.bookingModel.preference_allocations_attributes = interpreters;
        } else {
            this.bookingModel.preference_allocations_attributes = [];
            interpreters.forEach(i => {
                if (this.showPreferred) {
                    if (i.preference === 'preferred' && !i.hasOwnProperty('_destroy')) {
                        this.bookingModel.preference_allocations_attributes.push({'interpreter_id': i.interpreter_id, 'preference': i.preference});
                    } else if (i.hasOwnProperty('_destroy')) {
                        this.userModel.prefferedInterpreters = this.userModel.prefferedInterpreters.filter(itm => itm.interpreter_id !== i.interpreter_id);
                    }
                }

                if (this.showBlocked) {
                    if (i.preference === 'blocked' && !i.hasOwnProperty('_destroy')) {
                        this.bookingModel.preference_allocations_attributes.push({'interpreter_id': i.interpreter_id, 'preference': i.preference});
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
        let selectedDate = this.datePipe.transform(this.bookingDate, 'yyyy-MM-dd');
        let startTime = moment(this.bookingStartTime, 'hh:mm A').format('HH:mm:ss');
        let endTime = moment(this.bookingEndTime, 'hh:mm A').format('HH:mm:ss');

        return ((selectedDate !== this.datePipe.transform(this.oldBookingModel.start_time, 'yyyy-MM-dd'))
            || (startTime !== moment(this.oldBookingModel.start_time, 'hh:mm A').format('HH:mm:ss'))
            || (endTime !== moment(this.oldBookingModel.end_time, 'hh:mm A').format('HH:mm:ss'))
            || (this.bookingModel.raw_nature_of_appointment !== this.oldBookingModel.nature_of_appointment)
            || (this.bookingModel.specific_nature_of_appointment !== this.oldBookingModel.specific_nature_of_appointment)
            || (this.bookingModel.venue.street_name !== this.oldBookingModel.address_attributes.street_name)
            || (this.bookingModel.venue.state !== this.oldBookingModel.address_attributes.state)
            || (this.bookingModel.venue.suburb !== this.oldBookingModel.address_attributes.suburb)
            || (this.bookingModel.venue.post_code !== this.oldBookingModel.address_attributes.post_code));
    }

    deepCopy(oldObj: any) {
        if (this.forEdit) {
            let newObj = JSON.parse(JSON.stringify(oldObj));
            return newObj;
        }
    }

    isNewBooking() {
        return this.router.url.includes('create-booking');
    }

    resetPrefBlockInterpreters() {
        this.oldInterpreterPreference = [];
        this.showPreferred = this.showProfilePreferred = this.showBlocked = this.showProfileBlocked = false;
        this.hasPrefInt = this.hasBlockInt = false;
    }
}
