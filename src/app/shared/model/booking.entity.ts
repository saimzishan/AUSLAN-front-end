import {Venue} from './venue.entity';
import {Contact, DEAFContact} from './contact.entity';
import {BOOKING_NATURE} from './booking-nature.enum';
import {BOOKING_STATUS} from './booking-status.enum';

export class Booking {
    public id: string;
    public venue: Venue;
    public requested_by: Contact;
    public last_updated: Date;
    public update_by: string;
    public contact: Contact;
    public interpreters: Contact [];
    public deaf_person: DEAFContact;
    public nature_of_appointment: BOOKING_NATURE;
    public specific_nature_of_appointment: BOOKING_NATURE;
    public status: BOOKING_STATUS;
    public attachment: any;
    constructor(values: Object = {}) {
      Object.assign(this, values);
    }
}
