import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {BookingInfoComponent} from './booking-info.component';
import {PrettyIDPipe} from '../../shared/pipe/pretty-id.pipe';
import {MomentModule} from 'angular2-moment/moment.module';
import {Booking} from '../../shared/model/booking.entity';

describe('BookingInfoComponent', () => {
  let component: BookingInfoComponent;
  let fixture: ComponentFixture<BookingInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookingInfoComponent, PrettyIDPipe ],
      imports: [MomentModule]
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
