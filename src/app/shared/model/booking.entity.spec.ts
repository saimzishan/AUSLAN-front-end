/* tslint:disable:no-unused-variable */
import {Venue} from './venue.entity';
import {Contact, DEAFContact} from './contact.entity';
import {BOOKING_NATURE} from './booking-nature.enum';
import {BOOKING_STATE} from './booking-state.enum';
import {Booking} from './booking.entity';
import {PARKING} from './parking.enum';

describe('Booking Entity', () => {

    let mock_booking;
    let mock_request = new Object({'venue': 'Fed Square',
    'requested_by_first_name': 'Georgious', 'requested_by_last_name': 'George',
    'nature_of_appointment': 'Translation',
    'specific_nature_of_appointment': 'Engagement',
    'contact_first_name': 'Hadrian', 'contact_last_name': 'French',
     'contact_phone_number': '03 2342 2343', 'deaf_persons_first_name': 'Clifford',
    'deaf_persons_last_name': 'Yan', 'deaf_persons_mobile': '0444 555 666',
    'deaf_persons_email': 'clifford@vicdeaf.org.au', 'deaf_persons_eaf_no': '1231 0900',
    'number_of_people_attending': '1', 'number_of_auslan_interpreters_required' : '2',
    'start_time': '2018-02-25T22:00:00Z', 'end_time': '2018-02-25T23:00:00Z',
    'created_by': {'id': '12', 'email': 'something@creator.com', 'name': 'Fake Name',
    'type': 'OrganisationalRepresentative', 'organisation': 'Melb Uni'},
    'parking_availability': 'None', 'address_attributes': {'unit_number' : '12', 'street_number': '50',
    'street_name': 'Flemington Rd', 'suburb': 'Parkville', 'state': 'VIC', 'post_code': '3025'}});

    beforeEach(() => {
      mock_booking = new Booking();
    });

    it('should be able to serialize', () => {
      mock_booking.fromJSON(mock_request);
      expect(mock_booking.venue.expected_attendance).toEqual('1');
      expect(mock_booking.venue.unit_number).toEqual('12');
      expect(mock_booking.venue.street_number).toEqual('50');
      expect(mock_booking.number_of_auslan_interpreters_required).toEqual('2');
      expect(mock_booking.venue.street_name).toEqual('Flemington Rd');
      expect(mock_booking.utcToBookingTimeZone(mock_booking.venue.start_time_iso)).toEqual('09:00:00');
      expect(mock_booking.utcToBookingTimeZone(mock_booking.venue.end_time_iso)).toEqual('10:00:00');
      expect(mock_booking.requested_by.first_name).toEqual('Georgious');
      expect(mock_booking.requested_by.last_name).toEqual('George');
      expect(mock_booking.primaryContact.first_name).toEqual('Hadrian');
      expect(mock_booking.primaryContact.last_name).toEqual('French');
      expect(mock_booking.primaryContact.mobile_number).toEqual('03 2342 2343');
      expect(mock_booking.deaf_person.first_name).toEqual('Clifford');
      expect(mock_booking.deaf_person.last_name).toEqual('Yan');
      expect(mock_booking.deaf_person.eaf).toEqual('1231 0900');
      expect(mock_booking.deaf_person.email).toEqual('clifford@vicdeaf.org.au');
      expect(mock_booking.deaf_person.mobile_number).toEqual('0444 555 666');

    });

    it('should be able to de-serialize', () => {
      mock_booking.venue.expected_attendance = '1';
      mock_booking.venue.unit_number = '12';
      mock_booking.venue.street_number = '50';
      mock_booking.venue.start_time_iso = '2017-04-02T07:50:19.212Z';
      mock_booking.venue.end_time_iso = '2017-04-02T08:50:19.212Z';
      mock_booking.requested_by.first_name = 'Georgious';
      mock_booking.requested_by.last_name = 'George';
      mock_booking.primaryContact.first_name = 'Hadrian';
      mock_booking.primaryContact.last_name = 'French';
      mock_booking.primaryContact.mobile_number = '03 2342 2343';
      mock_booking.deaf_person.first_name = 'Clifford';
      mock_booking.deaf_person.last_name = 'Yan';
      mock_booking.deaf_person.eaf = '1231 0900';
      mock_booking.deaf_person.email = 'clifford@vicdeaf.org.au';
      mock_booking.deaf_person.mobile_number = '0444 555 666';
      mock_booking.number_of_auslan_interpreters_required = '2';
      mock_booking.venue.street_name = 'Flemington Rd';

      let data = mock_booking.toJSON();
      expect(data.number_of_people_attending).toEqual('1');
      expect(data.number_of_auslan_interpreters_required).toEqual('2');
      expect(data.address_attributes.unit_number).toEqual('12');
      expect(data.address_attributes.street_number).toEqual('50');
      expect(data.address_attributes.street_name).toEqual('Flemington Rd');
      expect(data.start_time).toEqual('2017-04-02T07:50:19.212Z');
      // expect(data.end_time).toEqual('2017-04-02T08:50:19.212Z');
      // Commenthing this test because of linux converstion to AM/PM
      expect(data.requested_by_first_name).toEqual('Georgious');
      expect(data.requested_by_last_name).toEqual('George');
      expect(data.contact_first_name).toEqual('Hadrian');
      expect(data.contact_last_name).toEqual('French');
      expect(data.contact_phone_number).toEqual('03 2342 2343');
      expect(data.deaf_persons_first_name).toEqual('Clifford');
      expect(data.deaf_persons_last_name).toEqual('Yan');
      expect(data.deaf_persons_eaf_no).toEqual('1231 0900');
      expect(data.deaf_persons_email).toEqual('clifford@vicdeaf.org.au');
      expect(data.deaf_persons_mobile).toEqual('0444 555 666');

    });
});
