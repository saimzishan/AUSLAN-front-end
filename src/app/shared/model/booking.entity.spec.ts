/* tslint:disable:no-unused-variable */
import {Venue} from './venue.entity';
import {Contact, DEAFContact} from './contact.entity';
import {BOOKING_NATURE} from './booking-nature.enum';
import {BOOKING_STATUS} from './booking-status.enum';
import {Booking} from './booking.entity';
import {PARKING} from './parking.enum';

describe('BookingService', () => {

    let mock_booking;
    let mock_request = new Object({'venue': 'Fed Square', 'requested_by': 'Georgious', 'nature_of_appointment': 'Translation',
    'specific_nature_of_appointment': 'Engagement', 'contact_name': 'Hadrian French', 'contact_phone_number': '03 2342 2343',
    'contact_mobile_number': '0411 222 333', 'deaf_persons_name': 'Clifford', 'deaf_persons_mobile': '0444 555 666',
    'deaf_persons_email': 'clifford@vicdeaf.org.au', 'deaf_persons_eaf_no': '1231 0900',
    'number_of_people_attending': '1', 'start_time': '2017-04-02T07:50:19.212+00:00', 'end_time': '2017-04-02T08:50:19.212+00:00',
    'parking_availability': 'None'});

    beforeEach(() => {
      mock_booking = new Booking();
    });

    it('should be able to serialize', () => {
      mock_booking.fromJSON(mock_request);
      expect(mock_booking.venue.expected_attendance).toEqual('1');
      expect(mock_booking.venue.addressline_1).toEqual('Fed Square');
      expect(mock_booking.venue.start_time).toEqual('2017-04-02T07:50:19.212+00:00');
      expect(mock_booking.venue.end_time).toEqual('2017-04-02T08:50:19.212+00:00');
      expect(mock_booking.requested_by.name).toEqual('Georgious');
      expect(mock_booking.contact.name).toEqual('Hadrian French');
      expect(mock_booking.contact.phone_number).toEqual('03 2342 2343');
      expect(mock_booking.contact.mobile_number).toEqual('0411 222 333');
      expect(mock_booking.deaf_person.name).toEqual('Clifford');
      expect(mock_booking.deaf_person.eaf).toEqual('1231 0900');
      expect(mock_booking.deaf_person.email).toEqual('clifford@vicdeaf.org.au');
      expect(mock_booking.deaf_person.mobile_number).toEqual('0444 555 666');

    });

    it('should be able to de-serialize', () => {
      mock_booking.venue.expected_attendance = '1';
      mock_booking.venue.addressline_1 = 'Fed Square';
      mock_booking.venue.start_time = '2017-04-02T07:50:19.212+00:00';
      mock_booking.venue.end_time = '2017-04-02T08:50:19.212+00:00';
      mock_booking.requested_by.name = 'Georgious';
      mock_booking.contact.name = 'Hadrian French';
      mock_booking.contact.phone_number = '03 2342 2343';
      mock_booking.contact.mobile_number = '0411 222 333';
      mock_booking.deaf_person.name = 'Clifford';
      mock_booking.deaf_person.eaf = '1231 0900';
      mock_booking.deaf_person.email = 'clifford@vicdeaf.org.au';
      mock_booking.deaf_person.mobile_number = '0444 555 666';

      let data = mock_booking.toJSON();
      expect(data.number_of_people_attending).toEqual('1');
      expect(data.venue).toEqual('Fed Square');
      expect(data.start_time).toEqual('2017-04-02T07:50:19.212+00:00');
      expect(data.end_time).toEqual('2017-04-02T08:50:19.212+00:00');
      expect(data.requested_by).toEqual('Georgious');
      expect(data.contact_name).toEqual('Hadrian French');
      expect(data.contact_phone_number).toEqual('03 2342 2343');
      expect(data.contact_mobile_number).toEqual('0411 222 333');
      expect(data.deaf_persons_name).toEqual('Clifford');
      expect(data.deaf_persons_eaf_no).toEqual('1231 0900');
      expect(data.deaf_persons_email).toEqual('clifford@vicdeaf.org.au');
      expect(data.deaf_persons_mobile).toEqual('0444 555 666');

    });
});
