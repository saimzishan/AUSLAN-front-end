import {Venue} from './venue.entity';
import {Contact, BookingInterpreters, DEAFContact} from './contact.entity';
import {BOOKING_NATURE} from './booking-nature.enum';
import {BOOKING_STATUS} from './booking-status.enum';
import {PARKING} from './parking.enum';
export class Booking {

    public id:  any;
    public venue:  Venue = new Venue();
    public requested_by:  Contact = new Contact();
    public last_updated:  Date;
    public update_by:  string;
    public contact:  Contact = new Contact();
    public deaf_person:  DEAFContact = new DEAFContact();
    public nature_of_appointment:  BOOKING_NATURE;
    public specific_nature_of_appointment:  BOOKING_NATURE;
    public state:  BOOKING_STATUS;
    public attachment:  any;
    public raw_venue_address:  string;
    public raw_booking_address:  string;
    public interpreters: Array<BookingInterpreters> = [];
    public interpreters_required = 0;
    // Is it a limitation on interpreters invitation.

    constructor() {
      this.id = '0';
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
      this.state = BOOKING_STATUS.None;
    }

    fromJSON(data:  any) {
      this.id =  data.id;
      this.venue.expected_attendance = data.number_of_people_attending;
      this.venue.title = data.venue;
      this.venue.addressline_1 = data.address_attributes.line_1;
      this.venue.addressline_2 = data.address_attributes.line_2;
      this.venue.addressline_3 = data.address_attributes.line_3;
      this.venue.suburb = data.address_attributes.suburb;
      this.venue.state = data.address_attributes.state;
      this.venue.post_code = data.address_attributes.post_code;
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
      let state: string = data.state;
      this.state = BOOKING_STATUS[state];
    }

    toJSON() {
      let _state = typeof this.state === 'string' ?
       this.state : BOOKING_STATUS[this.state];
      let _nature_of_appointment = typeof this.nature_of_appointment === 'string' ?
      this.nature_of_appointment : BOOKING_NATURE[this.nature_of_appointment];
      let _specific_nature_of_appointment =
      typeof this.specific_nature_of_appointment === 'string' ?
       this.specific_nature_of_appointment : BOOKING_NATURE[this.specific_nature_of_appointment];
      let _parking_type =
      typeof this.venue.parking_type === 'string' ? this.venue.parking_type : PARKING[this.venue.parking_type];
      let _expected_attendance = this.venue.expected_attendance < 0 ? 0 : this.venue.expected_attendance;

      return new Object({ id: this.id, state: _state,
         venue: this.venue.title, requested_by: this.requested_by.name ,
      nature_of_appointment: _nature_of_appointment ,
      specific_nature_of_appointment: _specific_nature_of_appointment , contact_name: this.contact.name ,
      contact_phone_number: this.contact.phone_number , contact_mobile_number: this.contact.mobile_number ,
      deaf_persons_name: this.deaf_person.name , deaf_persons_mobile: this.deaf_person.mobile_number,
      deaf_persons_email: this.deaf_person.email , deaf_persons_eaf_no: this.deaf_person.eaf ,
      number_of_people_attending: _expected_attendance ,
      start_time: this.venue.start_time.toString() , end_time: this.venue.end_time.toString() ,
      parking_availability: _parking_type,
      address_attributes: { line_1 :
      this.venue.addressline_1, line_2 :
      this.venue.addressline_2 , line_3 :
      this.venue.addressline_3 , suburb :
      this.venue.suburb , state :
      this.venue.state , post_code :
      this.venue.post_code}});
    }
}
