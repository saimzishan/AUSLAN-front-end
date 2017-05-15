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
    public raw_nature_of_appointment:  string;
    public nature_of_appointment:  BOOKING_NATURE;
    public specific_nature_of_appointment:  string;
    public state:  BOOKING_STATUS;
    public attachment:  any;
    public interpreters: Array<BookingInterpreters> = [];
    public interpreters_required = 0;
    // Is it a limitation on interpreters invitation.

    constructor() {
      this.id = '0';
      this.venue.expected_attendance = 0;
      this.venue.unit_num = '';
      this.venue.street_name = '';
      this.venue.street_num = '';
      this.venue.start_time = new Date().getTime();
      this.venue.end_time = new Date().getTime();
      this.requested_by.first_name = '';
      this.requested_by.last_name = '';
      this.contact.first_name = '';
      this.contact.last_name = '';
      this.contact.phone_number = '';
      this.contact.mobile_number = '';
      this.deaf_person.first_name = '';
      this.deaf_person.last_name = '';
      this.deaf_person.email = '';
      this.deaf_person.mobile_number = '';
      this.deaf_person.eaf = 0;
      this.nature_of_appointment = BOOKING_NATURE.None;
      this.raw_nature_of_appointment = '';
      this.specific_nature_of_appointment = '';
      this.state = BOOKING_STATUS.None;
    }

    fromJSON(data:  any) {
      this.id =  data.id;
      this.venue.expected_attendance = data.number_of_people_attending;
      this.venue.title = data.venue;
      this.venue.unit_num = data.address_attributes.unit_number;
      this.venue.street_num = data.address_attributes.street_number;
      this.venue.street_name = data.address_attributes.street_name;
      this.venue.suburb = data.address_attributes.suburb;
      this.venue.state = data.address_attributes.state;
      this.venue.post_code = data.address_attributes.post_code;
      this.venue.start_time = Date.parse(data.start_time) ;
      this.venue.end_time = Date.parse(data.end_time);
      this.venue.interpreter_attendance = data.number_of_interpreters_required;
      this.requested_by.first_name = data.requested_by_first_name;
      this.requested_by.last_name = data.requested_by_last_name;
      this.contact.first_name = data.contact_first_name;
      this.contact.last_name = data.contact_last_name;
      this.contact.phone_number = data.contact_phone_number;
      this.contact.mobile_number = data.contact_mobile_number;
      this.deaf_person.first_name = data.deaf_persons_first_name;
      this.deaf_person.last_name = data.deaf_persons_last_name;
      this.deaf_person.email = data.deaf_persons_email;
      this.deaf_person.mobile_number = data.deaf_persons_mobile;
      this.deaf_person.eaf = data.deaf_persons_eaf_no;
      this.raw_nature_of_appointment = data.nature_of_appointment;
      this.nature_of_appointment = <BOOKING_NATURE> BOOKING_NATURE[this.raw_nature_of_appointment];
      this.specific_nature_of_appointment = data.specific_nature_of_appointment;
      let state: string = data.state;
      this.state = BOOKING_STATUS[state];
    }

    toJSON() {
      let _state = typeof this.state === 'string' ?
       this.state : BOOKING_STATUS[this.state];
      let _nature_of_appointment = this.raw_nature_of_appointment;
      let _specific_nature_of_appointment = this.specific_nature_of_appointment ;
      let _parking_type =
      typeof this.venue.parking_type === 'string' ? this.venue.parking_type : PARKING[this.venue.parking_type];
      let _expected_attendance = this.venue.expected_attendance < 0 ? 0 : this.venue.expected_attendance;

      return new Object({ id: this.id, state: _state,
         venue: this.venue.title, requested_by_first_name: this.requested_by.first_name ,
         requested_by_last_name: this.requested_by.last_name ,
         number_of_interpreters_required : this.venue.interpreter_attendance,
      nature_of_appointment: _nature_of_appointment ,
      specific_nature_of_appointment: _specific_nature_of_appointment ,
      contact_first_name: this.contact.first_name , contact_last_name: this.contact.last_name ,
      contact_phone_number: this.contact.phone_number , contact_mobile_number: this.contact.mobile_number ,
      deaf_persons_first_name: this.deaf_person.first_name ,
      deaf_persons_last_name: this.deaf_person.last_name , deaf_persons_mobile: this.deaf_person.mobile_number,
      deaf_persons_email: this.deaf_person.email , deaf_persons_eaf_no: this.deaf_person.eaf ,
      number_of_people_attending: _expected_attendance ,
      start_time: this.venue.start_time.toString() , end_time: this.venue.end_time.toString() ,
      parking_availability: _parking_type,
      address_attributes: { unit_number :
      this.venue.unit_num, street_number :
      this.venue.street_num , street_name :
      this.venue.street_name , suburb :
      this.venue.suburb , state :
      this.venue.state , post_code :
      this.venue.post_code}});
    }
}
