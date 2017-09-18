

import {BookingVersion} from './booking-version.entity';

describe('Booking Entity', () => {

    let booking_version = new BookingVersion();

    it('get changes should return event with name', () => {
        booking_version.booking_event = 'create';
        booking_version.first_name = 'Nomi';
        booking_version.last_name = 'Smith';

        expect(booking_version.change_event_with_author()).toEqual('Created by Nomi Smith');
    });

});
