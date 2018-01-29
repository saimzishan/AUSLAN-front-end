import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BookingPayrollComponent } from './booking-payroll.component';
import {BookingHeaderComponent} from '../booking-header/booking-header.component';
import {BookingInfoComponent} from '../booking-info/booking-info.component';
import { FormsModule }   from '@angular/forms';
import {MaterialModule} from '@angular/material';
import {PayrollTimeComponent} from '../payroll-time/payroll-time.component';
import { PrettyIDPipe } from '../../shared/pipe/pretty-id.pipe';
import {MomentModule} from 'angular2-moment/moment.module';
import {SpinnerService} from '../../spinner/spinner.service';
import { NotificationServiceBus } from '../../notification/notification.service';
import {BookingService} from '../../api/booking.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {MockBookingService} from '../../shared/test/Mock';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { MockBackend } from '@angular/http/testing';

describe('BookingPayrollComponent', () => {
  let component: BookingPayrollComponent;
  let fixture: ComponentFixture<BookingPayrollComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookingPayrollComponent, BookingHeaderComponent, BookingInfoComponent, PayrollTimeComponent, PrettyIDPipe ],
      providers: [SpinnerService, NotificationServiceBus,
        {
          provide: ActivatedRoute,
          useValue: {
            params: Observable.of({ id: 1 })
          }
        },
        { provide: BookingService, useClass: MockBookingService },
        { provide: AuthHttp, useClass: MockBackend }],
      imports: [FormsModule, MaterialModule, MomentModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingPayrollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
