
export class BookingVersion {

    public created_at: Date;
    public changeset: string;
    public booking_event: string;
    public first_name: string;
    public last_name: string;
    public photo_url: string;

    change_event_with_author() {
        return this.booking_event[0].toUpperCase() + this.booking_event.substring(1) + 'd by ' + this.first_name + ' ' + this.last_name;
    }
}

