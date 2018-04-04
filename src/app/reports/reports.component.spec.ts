import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ReportsComponent} from './reports.component';
import {NotificationServiceBus} from '../notification/notification.service';
import {NgForm} from '@angular/forms';
import {FormsModule}   from '@angular/forms';
import {CalendarModule as PrimeNgCalendarModule} from 'primeng/primeng';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SpinnerService} from '../spinner/spinner.service';
import {BookingService} from '../api/booking.service';
import {MockBookingService} from '../shared/test/Mock';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { MockBackend } from '@angular/http/testing';
import { DatePipe } from '@angular/common';

describe('ReportsComponent', () => {
  let component: ReportsComponent;
  let fixture: ComponentFixture<ReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportsComponent ],
      imports: [FormsModule, PrimeNgCalendarModule, BrowserAnimationsModule],
      providers: [NotificationServiceBus, SpinnerService, { provide: BookingService, useClass: MockBookingService },
                  { provide: AuthHttp, useClass: MockBackend }, DatePipe]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
