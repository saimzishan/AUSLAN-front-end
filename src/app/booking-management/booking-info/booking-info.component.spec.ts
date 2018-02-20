import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {BookingInfoComponent} from './booking-info.component';
import {PrettyIDPipe} from '../../shared/pipe/pretty-id.pipe';
import {Booking} from '../../shared/model/booking.entity';
import {ShortTimePipe} from '../../shared/pipe/short-time.pipe';

describe('BookingInfoComponent', () => {
  let component: BookingInfoComponent;
  let fixture: ComponentFixture<BookingInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookingInfoComponent, PrettyIDPipe, ShortTimePipe ],
      imports: []
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingInfoComponent);
    component = fixture.componentInstance;
    component.selectedBookingModel = new Booking();
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
