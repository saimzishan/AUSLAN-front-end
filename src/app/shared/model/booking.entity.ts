import {Address, Venue} from './venue.entity';
import {Contact, BookingInterpreter, DEAFContact} from './contact.entity';
import {BOOKING_NATURE} from './booking-nature.enum';
import {BOOKING_STATE} from './booking-state.enum';
import {PARKING} from './parking.enum';
import {OrganisationalRepresentative} from './user.entity';
import {BookingVersion} from './booking-version.entity';
export class Booking {

    public id: any;
    public venue: Venue = new Venue();
    public requested_by: Contact = new Contact();
    public last_updated: Date;
    public update_by: string;
    public status: string;
    public deaf_person: DEAFContact = new DEAFContact();
    public raw_nature_of_appointment: string;
    public nature_of_appointment: BOOKING_NATURE;
    public specific_nature_of_appointment: string;
    public state: BOOKING_STATE;
    public attachment: any;
    public interpreters: Array<BookingInterpreter> = [];
    public interpreters_required = 0;
    public notes = '';
    public special_instructions = '';
    public primaryContact = new Contact();
    public client: OrganisationalRepresentative = new OrganisationalRepresentative({});
    public documents_attributes = [];
    public versions: Array<BookingVersion> = [];
    public preference_allocations_attributes = [];
    public bookable_id: any;
    public bookable_type: string;
    // Is it a limitation on interpreters invitation.

    constructor() {
        this.id = '0';
        this.venue.expected_attendance = 0;
        this.venue.unit_number = '';
        this.venue.street_name = '';
        this.venue.street_number = '';
        this.requested_by.first_name = '';
        this.requested_by.last_name = '';
        this.client.organisation_name = '';
        this.client.organisation_primary_contact.first_name = '';
        this.client.organisation_primary_contact.last_name = '';
        this.client.organisation_primary_contact.phone_number = '';
        this.client.organisation_primary_contact.mobile_number = '';
        this.client.organisation_primary_contact.email = '';
        this.client.organisation_billing_account.external_reference = '';
        this.special_instructions = '';
        this.deaf_person.first_name = '';
        this.deaf_person.last_name = '';
        this.deaf_person.email = '';
        this.deaf_person.mobile_number = '';
        this.deaf_person.eaf = '';
        this.nature_of_appointment = BOOKING_NATURE.None;
        this.raw_nature_of_appointment = '';
        this.specific_nature_of_appointment = '';
        this.state = BOOKING_STATE.None;
        this.bookable_id = '0';
        this.bookable_type = '';
    }

    clean(theObject) {
        let result = null;
        if (theObject instanceof Array) {
            for (let i = 0; i < theObject.length; i++) {
                this.clean(theObject[i]);
            }
        } else {
            for (let prop in theObject) {
                if (theObject.hasOwnProperty(prop)) {
                    console.log(prop + ': ' + theObject[prop]);
                    if (prop === 'id') {
                        delete theObject[prop];
                    }
                    if (theObject[prop] instanceof Object || theObject[prop] instanceof Array) {
                        this.clean(theObject[prop]);
                    }
                }
            }
        }
    }

    fromJSON(data: any) {
        this.id = data.id;
        this.venue.expected_attendance = data.number_of_people_attending;
        this.venue.title = data.venue || '';
        this.status = data.status;
        this.venue.unit_number = data.address_attributes.unit_number || '';
        this.venue.street_number = data.address_attributes.street_number;
        this.venue.street_name = data.address_attributes.street_name;
        this.venue.suburb = data.address_attributes.suburb;
        this.venue.state = data.address_attributes.state;
        this.venue.post_code = data.address_attributes.post_code;
        this.venue.start_time_iso = new Date(data.start_time).toISOString();
        this.venue.end_time_iso = new Date(data.end_time).toISOString();
        this.interpreters_required = data.number_of_interpreters_required;
        this.requested_by.first_name = data.requested_by_first_name;
        this.requested_by.last_name = data.requested_by_last_name;
        this.primaryContact.first_name = data.contact_first_name;
        this.primaryContact.email = data.contact_email;
        this.primaryContact.last_name = data.contact_last_name;
        this.primaryContact.phone_number = data.contact_phone_number;
        this.primaryContact.mobile_number = data.contact_mobile_number;
        this.client.organisation_name = data.created_by.organisation;
        this.client.organisation_billing_account.external_reference = '';
        this.special_instructions = data.special_instructions;
        this.deaf_person.first_name = data.deaf_persons_first_name;
        this.deaf_person.last_name = data.deaf_persons_last_name;
        this.deaf_person.email = data.deaf_persons_email;
        this.deaf_person.mobile_number = data.deaf_persons_mobile;
        this.deaf_person.eaf = data.deaf_persons_eaf_no;
        this.raw_nature_of_appointment = data.nature_of_appointment;
        this.nature_of_appointment = <BOOKING_NATURE>BOOKING_NATURE[this.raw_nature_of_appointment];
        this.specific_nature_of_appointment = data.specific_nature_of_appointment;
        let state: string = data.state;
        this.state = BOOKING_STATE[state];
        this.bookable_id = data.bookable_id;
        this.bookable_type = data.bookable_type;

        if (Boolean(data.billing_account_attributes)) {
            this.client.organisation_primary_contact.first_name =
                data.billing_account_attributes.primary_contact_first_name;

            this.client.organisation_primary_contact.last_name =
                data.billing_account_attributes.primary_contact_last_name;

            this.client.organisation_primary_contact.phone_number =
                data.billing_account_attributes.primary_contact_phone_number;

            this.client.organisation_primary_contact.email =
                data.billing_account_attributes.primary_contact_email;


            this.client.organisation_billing_account.external_reference =
                data.billing_account_attributes.external_reference;

            this.client.organisation_billing_account.organisation_billing_address =
                data.billing_account_attributes.address_attributes;
        }
        this.interpreters = [];
        if (Boolean(data.interpreters_attributes)) {
            for (let i of data.interpreters_attributes) {
                let int: BookingInterpreter = {
                    id: i.id,
                    state: i.state,
                    email: i.email,
                    mobile_number: i.mobile,
                    phone_number: '',
                    address: null,
                    first_name: i.first_name,
                    last_name: i.last_name,
                    photo_url: i.photo_url
                };
                this.interpreters.push(int);
            }
        }
        if (Boolean(data.documents_attributes)) {
            this.documents_attributes = data.documents_attributes;
        }
        if (Boolean(data.preference_allocations_attributes)) {
            this.preference_allocations_attributes = data.preference_allocations_attributes;
        }
        this.versions = [];
        if (Boolean(data.versions_attributes)) {
            for (let version_attributr of data.versions_attributes) {
                let version = new BookingVersion();
                version.change_set = version_attributr.changeset;
                version.booking_event = version_attributr.event;
                version.created_at_iso = new Date(version_attributr.created_at).toISOString();
                version.first_name = version_attributr.first_name;
                version.last_name = version_attributr.last_name;
                version.photo_url = version_attributr.photo_url;
                this.versions.push(version);
            };
        }
    }

    toJSON() {
        let _state = typeof this.state === 'string' ?
            this.state : BOOKING_STATE[this.state];
        let _nature_of_appointment = this.raw_nature_of_appointment;
        let _specific_nature_of_appointment = this.specific_nature_of_appointment;
        let _parking_type =
            typeof this.venue.parking_type === 'string' ? this.venue.parking_type : PARKING[this.venue.parking_type];
        let _expected_attendance = this.venue.expected_attendance < 0 ? 0 : this.venue.expected_attendance;


        let o = new Object({
            id: this.id, state: _state,
            special_instructions : this.special_instructions,
        venue: this.venue.title, requested_by_first_name: this.requested_by.first_name,
            requested_by_last_name: this.requested_by.last_name,
            number_of_interpreters_required: this.interpreters_required,
            nature_of_appointment: _nature_of_appointment,
            specific_nature_of_appointment: _specific_nature_of_appointment,
            contact_first_name: this.primaryContact.first_name,
            contact_last_name: this.primaryContact.last_name,
            contact_phone_number: this.primaryContact.phone_number,
            contact_mobile_number: this.primaryContact.mobile_number,
            contact_email: this.primaryContact.email,
            deaf_persons_first_name: this.deaf_person.first_name,
            deaf_persons_last_name: this.deaf_person.last_name, deaf_persons_mobile: this.deaf_person.mobile_number,
            deaf_persons_email: this.deaf_person.email, deaf_persons_eaf_no: this.deaf_person.eaf,
            number_of_people_attending: _expected_attendance,
            start_time: new Date(this.venue.start_time_iso).toISOString(),
            end_time: new Date(this.venue.end_time_iso).toISOString(),
            billing_account_attributes: {
                primary_contact_first_name: this.client.organisation_primary_contact.first_name,
                primary_contact_last_name: this.client.organisation_primary_contact.last_name,
                primary_contact_email: this.client.organisation_primary_contact.email,
                primary_contact_phone_number: this.client.organisation_primary_contact.phone_number,
                account_number: 'ABCD-1234',
                external_reference: this.client.organisation_billing_account.external_reference,
                address_attributes: this.client.organisation_billing_account.organisation_billing_address
            },
            parking_availability: _parking_type,
            address_attributes: {
                unit_number: this.venue.unit_number,
                street_number: this.venue.street_number,
                street_name: this.venue.street_name,
                suburb: this.venue.suburb, state: this.venue.state, post_code: this.venue.post_code
            },
            created_by: {
                organisation: this.client.organisation_name
            },
            documents_attributes: this.documents_attributes,
            preference_allocations_attributes: this.preference_allocations_attributes,
            bookable_id: this.bookable_id,
            bookable_type: this.bookable_type
        });
        return o;
    }
}
