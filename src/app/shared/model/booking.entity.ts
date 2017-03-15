import {Venue} from './venue.entity';
import {Contact, DEAFContact} from './contact.entity';
import {BOOKING_NATURE} from './booking-nature.enum';
import {BOOKING_STATUS} from './booking-status.enum';

export class Booking {
    public id: string;
    public number_of_people_attending: number;
    public venue: Venue = new Venue();
    public requested_by: Contact = new Contact();
    public last_updated: Date;
    public update_by: string;
    public contact: Contact = new Contact();
    public interpreters: Contact [];
    public deaf_person: DEAFContact = new DEAFContact();
    public nature_of_appointment: BOOKING_NATURE;
    public specific_nature_of_appointment: BOOKING_NATURE;
    public status: BOOKING_STATUS;
    public attachment: any;
    public raw_venue_address: string;
    public raw_booking_address: string;
    fromJSON(data: any) {

    }

    toJSON() {
      return `{"venue":${this.venue.addressline_1},"requested_by":${this.requested_by.name},
      "nature_of_appointment":${this.nature_of_appointment},
      "specific_nature_of_appointment":${this.specific_nature_of_appointment},"contact_name":${this.contact.name},
      "contact_phone_number":${this.contact.phone_number},"contact_mobile_number":${this.contact.mobile_number},
      "deaf_persons_name":${this.deaf_person.name},"deaf_persons_mobile":${this.deaf_person.name},
      "deaf_persons_email":${this.deaf_person.email},"deaf_persons_eaf_no":${this.deaf_person.eaf},
      "number_of_people_attending":${this.number_of_people_attending},
      "start_time":${this.venue.start_time},"end_time":${this.venue.end_time},
      "parking_availability":${this.venue.parking_type}}`;
    }
}
