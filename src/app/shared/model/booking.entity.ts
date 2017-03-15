import {Venue} from './venue.entity';
import {Contact, DEAFContact} from './contact.entity';
import {BOOKING_NATURE} from './booking-nature.enum';
import {BOOKING_STATUS} from './booking-status.enum';

export class Booking {
    public id: string;
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
    fromJSON(data: any){

    }
}
