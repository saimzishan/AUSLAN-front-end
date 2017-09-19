import {DatePipe} from '@angular/common';

export class BookingVersion {

    public created_at_iso: string;
    public change_set = {};
    public booking_event: string;
    public first_name: string;
    public last_name: string;
    public photo_url: string;

    booking_event_formatted() {
        return this.booking_event[0].toUpperCase() + this.booking_event.substring(1) + 'd by';
    };

    full_name() {
        return this.first_name + ' ' + this.last_name;
    };

    change_set_formatted_hash() {
        let changeset_hash = this.change_set;

        if (this.booking_event === 'create') {
            return [];
        }

        delete changeset_hash['created_at'];
        delete changeset_hash['updated_at'];
        delete changeset_hash['bookable_type'];
        delete changeset_hash['bookable_id'];
        delete changeset_hash['assignment_type_id'];

        let formatted_hash = [];

        for (let key of Object.keys(changeset_hash)) {
            let formatted_key = this.remove_underscores_and_capitilise_each_word(key);

            let first_hash_value = changeset_hash[key][0];
            let second_hash_value = changeset_hash[key][1];

            if ( first_hash_value ===  null ) {
                first_hash_value = '[blank]';
            }

            if ( second_hash_value ===  null ) {
                second_hash_value = '[blank]';
            }

            let formatted_value = [first_hash_value.toString(), second_hash_value.toString()];

            let date_pipe = new DatePipe('en-AU');

            if (key === 'start_time' || key === 'end_time') {
                let iso_time_from = new Date(formatted_value[0]).toISOString();
                let iso_time_to = new Date(formatted_value[1]).toISOString();
                let formatted_value_from = date_pipe.transform(iso_time_from, 'shortTime') + ' on ' + date_pipe.transform(iso_time_from, 'EEE d MMM yy');
                let formatted_value_to = date_pipe.transform(iso_time_to, 'shortTime') + ' on ' + date_pipe.transform(iso_time_to, 'EEE d MMM yy');

                formatted_value = [formatted_value_from, formatted_value_to];
            } else if (key === 'aasm_state') {
                let state_from = this.remove_underscores_and_capitilise_each_word(formatted_value[0]);
                let state_to = this.remove_underscores_and_capitilise_each_word(formatted_value[1]);

                formatted_value = [state_from, state_to];
            }

            formatted_hash.push([formatted_key, formatted_value]);
        };

        return formatted_hash;
    }

    remove_underscores_and_capitilise_each_word(unformatted_string) {
        return unformatted_string
            .replace(/aasm_/, '').replace(/_/g, ' ')
            .replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); } );
    };
}
