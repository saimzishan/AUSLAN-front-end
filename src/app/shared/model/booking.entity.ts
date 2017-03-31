import {Venue} from './venue.entity';
import {Contact, DEAFContact} from './contact.entity';
import {BOOKING_NATURE} from './booking-nature.enum';
import {BOOKING_STATUS} from './booking-status.enum';
import {PARKING} from './parking.enum';
export class Booking {

    public id:  string;
    public venue:  Venue = new Venue();
    public requested_by:  Contact = new Contact();
    public last_updated:  Date;
    public update_by:  string;
    public contact:  Contact = new Contact();
    public deaf_person:  DEAFContact = new DEAFContact();
    public nature_of_appointment:  BOOKING_NATURE;
    public specific_nature_of_appointment:  BOOKING_NATURE;
    public status:  BOOKING_STATUS;
    public attachment:  any;
    public raw_venue_address:  string;
    public raw_booking_address:  string;
    public interpreters: Array<Contact> = [];
    public interpreters_required = 0;

    constructor() {
      this.id = '-1';
      this.venue.expected_attendance = 0;
      this.venue.addressline_1 = '';
      this.venue.start_time = new Date().getTime();
      this.venue.end_time = new Date().getTime();
      this.requested_by.name = '';
      this.contact.name = '';
      this.contact.phone_number = '';
      this.contact.mobile_number = '';
      this.deaf_person.name = '';
      this.deaf_person.email = '';
      this.deaf_person.mobile_number = '';
      this.deaf_person.eaf = 0;
      this.nature_of_appointment = BOOKING_NATURE.None;
      this.specific_nature_of_appointment = BOOKING_NATURE.None;
      this.status = BOOKING_STATUS.None;
    }

    fromJSON(data:  any) {
      this.id =  data.id;
      this.venue.expected_attendance = data.number_of_people_attending;
      this.venue.addressline_1 = data.venue;
      this.venue.start_time = Date.parse(data.start_time) || Date.parse('Wed, 09 Aug 1995 01:20:00 GMT');
      this.venue.end_time = Date.parse(data.end_time) || Date.parse('Wed, 09 Aug 1995 02:30:00 GMT');
      this.requested_by.name = data.requested_by;
      this.contact.name = data.contact_name;
      this.contact.phone_number = data.contact_phone_number;
      this.contact.mobile_number = data.contact_mobile_number;
      this.deaf_person.name = data.deaf_persons_name;
      this.deaf_person.email = data.deaf_persons_email;
      this.deaf_person.mobile_number = data.deaf_persons_mobile;
      this.deaf_person.eaf = data.deaf_persons_eaf_no;
      this.nature_of_appointment = data.nature_of_appointment;
      this.specific_nature_of_appointment = data.specific_nature_of_appointment;
      this.status = data.status;
    }

    toJSON() {
      return new Object({venue: this.venue.addressline_1, requested_by: this.requested_by.name ,
      nature_of_appointment: BOOKING_NATURE[this.nature_of_appointment] ,
      specific_nature_of_appointment: BOOKING_NATURE[this.specific_nature_of_appointment] , contact_name: this.contact.name ,
      contact_phone_number: this.contact.phone_number , contact_mobile_number: this.contact.mobile_number ,
      deaf_persons_name: this.deaf_person.name , deaf_persons_mobile: this.deaf_person.mobile_number,
      deaf_persons_email: this.deaf_person.email , deaf_persons_eaf_no: this.deaf_person.eaf ,
      number_of_people_attending: this.venue.expected_attendance ,
      start_time: this.venue.start_time.toString() , end_time: this.venue.end_time.toString() ,
      parking_availability: PARKING[this.venue.parking_type]});
    }
}
