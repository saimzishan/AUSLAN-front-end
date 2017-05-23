/* tslint : disable : no-unused-variable */
import { async ,  ComponentFixture ,  TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {Booking} from '../../shared/model/booking.entity';
import { RouterTestingModule } from '@angular/router/testing';
import { BookingListComponent } from './booking-list.component';
import { Router } from '@angular/router';
import { PrettyIDPipe } from '../../shared/pipe/pretty-id.pipe';

describe('BookingListComponent' ,  () => {
  let component:  BookingListComponent;
  let fixture:  ComponentFixture<BookingListComponent>;

  let data = new Object({'id' : '5' , 'venue' : 'Location B' ,
  'requested_by' : 'Person A' , 'nature_of_appointment' : 'Engagement' ,
  'specific_nature_of_appointment' : 'Court' , 'contact_name' : 'Booking' ,
  'contact_phone_number' : 'xxxx xxx xxx' ,
  'contact_mobile_number' : 'xxxx xxx xxx' ,
  'deaf_persons_name' : 'Person B' ,
  'status' : 'Requested' ,
  'deaf_persons_mobile' : '00000000000' ,
  'deaf_persons_email' : 'person@b.com' ,
  'deaf_persons_eaf_no' : '5555' , 'parking_availability' : 'None' ,
  'number_of_people_attending' : -0 , 'start_time' : '2017-03-16T19:20+01:00' ,
  'end_time' : '2017-03-16T19:22+01:00',
  'address_attributes':
  {'line_1': 'Curve Tomorrow',
  'line_2': 'L4 West RCH',
  'line_3': '50 Flemington Rd',
  'suburb': 'Parkville',
  'state' : ' Victoria',
  'post_code': '3025'}
  });

  let mock_booking_list: Array<Booking> = [];
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations :  [ BookingListComponent, PrettyIDPipe ],
      imports: [RouterTestingModule]
    })
    .compileComponents();
    let b = new Booking();
    b.fromJSON(data);
    mock_booking_list.push(b);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingListComponent);
    component = fixture.componentInstance;
    component.bookingList = mock_booking_list;
    fixture.detectChanges();
  });

  it('should create' ,  () => {
    expect(component).toBeTruthy();
  });
  it('should ui to be filled with data' ,  () => {

    let cssBookingInfo = By.css('td.bookingID');
    let bID = fixture.debugElement.query(cssBookingInfo);
    expect(parseInt(bID.nativeElement.innerText, 10)).toEqual(5);

  });
});
