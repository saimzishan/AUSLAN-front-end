
import {DatePipe} from '@angular/common';
import {BookingVersion} from './booking-version.entity';

describe('Booking Entity', () => {

    let booking_version = new BookingVersion();

    it('get change event with author should return event with name', () => {
        booking_version.booking_event = 'create';
        booking_version.first_name = 'Nomi';
        booking_version.last_name = 'Smith';

        expect(booking_version.booking_event_formatted()).toEqual('Created by');
    });

    it('get full name', () => {
        booking_version.first_name = 'Nomi';
        booking_version.last_name = 'Smith';

        expect(booking_version.full_name()).toEqual('Nomi Smith');
    });

    it('get pretty display for changeset should formatted changeset data', () => {
        booking_version.booking_event = 'update'
        booking_version.change_set = {
            'id': [0, 1],
            'venue': ['MCRI', 'RCH'],
            'start_time': ['2017-09-25T09:46:21.143Z', '2017-09-25T08:46:21.143Z'],
            'end_time': ['2017-09-28T11:46:21.143Z', '2017-09-28T12:46:21.143Z'],
            'aasm_state': ['in_progress', 'requested'],
            'created_at': [null, '2017-09-18T08:47:10.193Z'],
            'updated_at': [null, '2017-09-18T08:47:10.193Z'],
            'assignment_type_id': [null, 80],
            'bookable_id': [null, 1],
            'bookable_type': [null, 'User'],
            'contact_email': [null, 'jimmy@donovan.com'],
            'notes': ['something', null]
        };

        let date_pipe = new DatePipe('en-AU');
        let start_time_before = date_pipe.transform('2017-09-25T09:46:21.143Z', 'shortTime') + ' on ' + date_pipe.transform('2017-09-25T09:46:21.143Z', 'EEE d MMM yy');
        let start_time_after = date_pipe.transform('2017-09-25T08:46:21.143Z', 'shortTime') + ' on ' + date_pipe.transform('2017-09-25T09:46:21.143Z', 'EEE d MMM yy');

        let end_time_before = date_pipe.transform('2017-09-28T11:46:21.143Z', 'shortTime') + ' on ' + date_pipe.transform('2017-09-28T11:46:21.143Z', 'EEE d MMM yy');
        let end_time_after = date_pipe.transform('2017-09-28T12:46:21.143Z', 'shortTime') + ' on ' + date_pipe.transform('2017-09-28T12:46:21.143Z', 'EEE d MMM yy');

        expect(booking_version.change_set_formatted_hash()).toEqual(
            [
                ['Id', ['0', '1']],
                ['Venue', ['MCRI', 'RCH']],
                ['Start Time', [start_time_before, start_time_after]],
                ['End Time', [end_time_before, end_time_after]],
                ['State', ['In Progress', 'Requested']],
                ['Contact Email', ['[blank]', 'jimmy@donovan.com']],
                ['Notes', ['something', '[blank]']]
            ]
        );
    });

    it('get pretty display for changeset should return blank if event was create', () => {
        booking_version.booking_event = 'create'
        booking_version.change_set = {
            'id': [0, 1],
            'venue': ['MCRI', 'RCH'],
            'start_time': ['2017-09-25T09:46:21.143Z', '2017-09-25T08:46:21.143Z'],
            'end_time': ['2017-09-28T11:46:21.143Z', '2017-09-28T12:46:21.143Z'],
            'aasm_state': ['in_progress', 'requested'],
            'created_at': [null, '2017-09-18T08:47:10.193Z'],
            'updated_at': [null, '2017-09-18T08:47:10.193Z'],
            'assignment_type_id': [null, 80],
            'bookable_id': [null, 1],
            'bookable_type': [null, 'User'],
            'contact_email': [null, 'jimmy@donovan.com'],
            'notes': ['something', null]
        };

        expect(booking_version.change_set_formatted_hash()).toEqual([]);
    });

});
