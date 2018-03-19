import {Venue} from './venue.entity';
import {Contact, BookingInterpreter, DEAFContact} from './contact.entity';
import {BOOKING_NATURE} from './booking-nature.enum';
import {BOOKING_STATE} from './booking-state.enum';
import {PARKING} from './parking.enum';
import {OrganisationalRepresentative} from './user.entity';
import {BookingVersion} from './booking-version.entity';
import * as momentTimeZone from 'moment-timezone';
export class Booking {

    public id: any;
    public link_id: number;
    public venue: Venue = new Venue();
    public requested_by: Contact = new Contact();
    public created_at: Date;
    public updated_at: Date;
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
    public bookable_id: number;
    public bookable_type: string;
    public created_by_admin: boolean;
    public travel_cost_applicable: boolean;
    public update_all_linked_bookings: boolean;
    public is_metro: boolean;
    public method_type: string;
    public service_type: string;
    public number_of_auslan_interpreters_required: number;
    public number_of_deaf_interpreters_required: number;
    public number_of_captioners_required: number;
    public number_of_note_takers_required: number;
    public number_of_visual_frame_interpreters_required: number;
    public number_of_tactile_interpreters_required: number;
    public number_of_platform_interpreters_required: number;
    public number_of_asl_interpreters_required: number;
    public number_of_bsl_interpreters_required: number;
    public number_of_isl_interpreters_required: number;
    public number_of_signed_english_interpreters_required: number;
    public number_of_indigenous_sign_interpreters_required: number;
    public tech_contact_first_name: string;
    public tech_contact_last_name: string;
    public tech_contact_email: string;
    public tech_contact_phone_number: string;
    public tech_platform: string;
    public login_id_link: string;
    public audio_source: string;
    public hardware: string;
    public who_will_initiate_call: string;
    public how_would_you_like_to_receive_notes: string;
    public new_link_id_required: boolean;
    public frequency: 'weekly' | 'biweekly' | 'fourweekly';
    public recurring: boolean;
    public recurrence_end_date: Date;
    public repeat_booking_on_days: Array<string>;
    public method_name: string;
    // Is it a limitation on interpreters invitation.

    static getNamedTimeZone(state: string, postCode: string) {
        let namedTimeZone;
        if (postCode === '2880') { // Broken Hill exception
            namedTimeZone = 'Australia/Adelaide';
            return namedTimeZone;
        }

        switch (state) {
            case 'ACT':
                namedTimeZone = 'Australia/Canberra';
                break;
            case 'NSW':
                namedTimeZone = 'Australia/Sydney';
                break;
            case 'QLD':
                namedTimeZone = 'Australia/Brisbane';
                break;
            case 'SA':
                namedTimeZone = 'Australia/Adelaide';
                break;
            case 'TAS':
                namedTimeZone = 'Australia/Hobart';
                break;
            case 'VIC':
                namedTimeZone = 'Australia/Melbourne';
                break;
            case 'WA':
                namedTimeZone = 'Australia/Perth';
                break;
            case 'NT':
                namedTimeZone = 'Australia/Darwin';
                break;
            default:
                namedTimeZone = '';
                break;
        }
        return namedTimeZone;
    }

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
        this.bookable_type = 'IndividualClient';
        this.notes = '';
        this.created_by_admin = false;
        this.travel_cost_applicable = false;
        this.update_all_linked_bookings = false;
        this.method_type = 'onsite';
        this.new_link_id_required = false;
        this.how_would_you_like_to_receive_notes = 'Digitally';
        this.frequency = 'weekly';
    }

    clean(theObject) {
        delete theObject['id'];
        delete theObject['address_attributes']['id'];
        delete theObject['billing_account_attributes']['id'];
        delete theObject['billing_account_attributes']['address_attributes']['id'];
        return theObject;
    }

    fromJSON(data: any) {
        this.id = data.id;
        this.link_id = data.link_id;
        this.venue.expected_attendance = data.number_of_people_attending;
        this.venue.title = data.venue || '';
        this.status = data.status;
        this.created_at = data.created_at;
        this.updated_at = data.updated_at;
        this.venue.id = data.address_attributes.id || '';
        this.venue.unit_number = data.address_attributes.unit_number || '';
        this.venue.street_number = data.address_attributes.street_number;
        this.venue.street_name = data.address_attributes.street_name;
        this.venue.suburb = data.address_attributes.suburb;
        this.venue.state = data.address_attributes.state;
        this.venue.post_code = data.address_attributes.post_code;
        this.venue.start_time_iso = new Date(data.start_time).toISOString();
        this.venue.end_time_iso = new Date(data.end_time).toISOString();
        this.venue.parking_type = data.parking_availability;
        this.method_type = data.method_type;
        this.method_name = data.method_name;
        this.service_type = data.service_type;
        this.number_of_auslan_interpreters_required = data.number_of_auslan_interpreters_required;
        this.number_of_deaf_interpreters_required = data.number_of_deaf_interpreters_required;
        this.number_of_captioners_required = data.number_of_captioners_required;
        this.number_of_note_takers_required = data.number_of_note_takers_required;
        this.number_of_visual_frame_interpreters_required = data.number_of_visual_frame_interpreters_required;
        this.number_of_tactile_interpreters_required = data.number_of_tactile_interpreters_required;
        this.number_of_platform_interpreters_required = data.number_of_platform_interpreters_required;
        this.number_of_asl_interpreters_required = data.number_of_asl_interpreters_required;
        this.number_of_bsl_interpreters_required = data.number_of_bsl_interpreters_required;
        this.number_of_isl_interpreters_required = data.number_of_isl_interpreters_required;
        this.number_of_signed_english_interpreters_required = data.number_of_signed_english_interpreters_required;
        this.number_of_indigenous_sign_interpreters_required = data.number_of_indigenous_sign_interpreters_required;
        this.interpreters_required = this.getInterpreters();
        this.tech_contact_first_name = data.tech_contact_first_name;
        this.tech_contact_last_name = data.tech_contact_last_name;
        this.tech_contact_email = data.tech_contact_email;
        this.tech_contact_phone_number = data.tech_contact_phone_number;
        this.tech_platform = data.tech_platform;
        this.login_id_link = data.login_id_link;
        this.audio_source = data.audio_source;
        this.hardware = data.hardware;
        this.who_will_initiate_call = data.who_will_initiate_call;
        this.how_would_you_like_to_receive_notes = data.how_would_you_like_to_receive_notes;
        this.requested_by.first_name = data.requested_by_first_name;
        this.requested_by.last_name = data.requested_by_last_name;
        this.primaryContact.first_name = data.contact_first_name;
        this.primaryContact.email = data.contact_email;
        this.primaryContact.last_name = data.contact_last_name;
        this.primaryContact.mobile_number = data.contact_phone_number;
        this.client.email = data.created_by.email;
        this.client.organisation_name = data.created_by.organisation;
        this.client.organisation_billing_account.external_reference = '';
        this.special_instructions = data.special_instructions;
        this.deaf_person.first_name = data.deaf_persons_first_name;
        this.deaf_person.last_name = data.deaf_persons_last_name;
        this.deaf_person.email = data.deaf_persons_email;
        this.deaf_person.mobile_number = data.deaf_persons_mobile;
        this.deaf_person.eaf = data.deaf_persons_eaf_no;
        this.deaf_person.ur_number = data.deaf_persons_ur_id;
        this.deaf_person.ndis_id = data.deaf_persons_ndis_id;
        this.raw_nature_of_appointment = data.nature_of_appointment;
        this.nature_of_appointment = <BOOKING_NATURE>BOOKING_NATURE[this.raw_nature_of_appointment];
        this.specific_nature_of_appointment = data.specific_nature_of_appointment;
        let state: string = data.state;
        this.state = BOOKING_STATE[state];
        this.bookable_id = data.bookable_id || data.created_by.id;
        this.bookable_type = data.bookable_type === 'User' ? data.created_by.type : data.bookable_type;
        this.notes = data.notes;
        this.created_by_admin = data.created_by_admin;
        this.travel_cost_applicable = data.travel_cost_applicable;
        this.is_metro = data.is_metro;

        if (Boolean(data.billing_account_attributes)) {
            this.client.organisation_primary_contact.id =
                data.billing_account_attributes.id;
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
                version.model = version_attributr.model;
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
            id: this.id,
            link_id: this.link_id,
            update_all_linked_bookings: this.update_all_linked_bookings || false,
            new_link_id_required: this.new_link_id_required || false,
            state: _state,
            special_instructions: this.special_instructions,
            venue: this.venue.title,
            requested_by_first_name: this.requested_by.first_name,
            requested_by_last_name: this.requested_by.last_name,
            method_type: this.method_type,
            frequency: this.frequency,
            recurrence_end_date: this.recurrence_end_date,
            recurring: this.recurring,
            repeat_booking_on_days: this.repeat_booking_on_days,
            number_of_auslan_interpreters_required: this.number_of_auslan_interpreters_required,
            number_of_deaf_interpreters_required: this.number_of_deaf_interpreters_required,
            number_of_captioners_required: this.number_of_captioners_required,
            number_of_note_takers_required: this.number_of_note_takers_required,
            number_of_visual_frame_interpreters_required: this.number_of_visual_frame_interpreters_required,
            number_of_tactile_interpreters_required: this.number_of_tactile_interpreters_required,
            number_of_platform_interpreters_required: this.number_of_platform_interpreters_required,
            number_of_asl_interpreters_required: this.number_of_asl_interpreters_required,
            number_of_bsl_interpreters_required: this.number_of_bsl_interpreters_required,
            number_of_isl_interpreters_required: this.number_of_isl_interpreters_required,
            number_of_signed_english_interpreters_required: this.number_of_signed_english_interpreters_required,
            number_of_indigenous_sign_interpreters_required: this.number_of_indigenous_sign_interpreters_required,
            number_of_interpreters_required: this.getInterpreters(),
            tech_contact_first_name: this.tech_contact_first_name,
            tech_contact_last_name: this.tech_contact_last_name,
            tech_contact_email: this.tech_contact_email,
            tech_contact_phone_number: this.tech_contact_phone_number,
            tech_platform: this.tech_platform,
            login_id_link: this.login_id_link,
            audio_source: this.audio_source,
            hardware: this.hardware,
            who_will_initiate_call: this.who_will_initiate_call,
            how_would_you_like_to_receive_notes: this.how_would_you_like_to_receive_notes,
            nature_of_appointment: _nature_of_appointment,
            specific_nature_of_appointment: _specific_nature_of_appointment,
            contact_first_name: this.primaryContact.first_name,
            contact_last_name: this.primaryContact.last_name,
            contact_phone_number: this.primaryContact.mobile_number,
            contact_email: this.primaryContact.email,
            deaf_persons_first_name: this.deaf_person.first_name,
            deaf_persons_last_name: this.deaf_person.last_name, deaf_persons_mobile: this.deaf_person.mobile_number,
            deaf_persons_email: this.deaf_person.email, deaf_persons_eaf_no: this.deaf_person.eaf,
            deaf_persons_ur_id: this.deaf_person.ur_number, deaf_persons_ndis_id: this.deaf_person.ndis_id,
            number_of_people_attending: _expected_attendance,
            start_time: this.venue.start_time_iso,
            end_time: this.venue.end_time_iso,
            billing_account_attributes: {
                id: this.client.organisation_primary_contact.id,
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
                id: this.venue.id,
                unit_number: this.venue.unit_number,
                street_number: this.venue.street_number,
                street_name: this.venue.street_name,
                suburb: this.venue.suburb, state: this.venue.state, post_code: this.venue.post_code
            },
            created_by: {
                organisation: this.client.organisation_name,
                email: this.client.email
            },
            documents_attributes: this.documents_attributes,
            preference_allocations_attributes: this.preference_allocations_attributes,
            bookable_id: this.bookable_id,
            bookable_type: this.bookable_type,
            notes: this.notes,
            created_by_admin: this.created_by_admin,
            travel_cost_applicable: this.travel_cost_applicable
        });
        return o;
    }

    getInterpreters() {
       return +this.number_of_auslan_interpreters_required + +this.number_of_deaf_interpreters_required +
              +this.number_of_captioners_required + +this.number_of_note_takers_required +
              +this.number_of_visual_frame_interpreters_required + +this.number_of_tactile_interpreters_required +
              +this.number_of_platform_interpreters_required + +this.number_of_asl_interpreters_required +
              +this.number_of_bsl_interpreters_required + +this.number_of_isl_interpreters_required +
              +this.number_of_signed_english_interpreters_required + +this.number_of_indigenous_sign_interpreters_required ;
    }

    utcToBookingTimeZone(time: string) {
        let timeZone = Booking.getNamedTimeZone(this.venue.state, this.venue.post_code.toString());
        return momentTimeZone(time).tz(timeZone).format('HH:mm:ss');
    }

    getDayLightSavings(bookingDate) {
        let timeZone = Booking.getNamedTimeZone(this.venue.state, this.venue.post_code.toString());
        return momentTimeZone(bookingDate).tz(timeZone).format('Z');
    }
}
