import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobDetailComponent } from './job-detail.component';
import {ActivatedRoute} from '@angular/router';
import {NotificationServiceBus} from '../../../notification/notification.service';
import {SpinnerService} from '../../../spinner/spinner.service';
import {Observable} from 'rxjs/Observable';
import {BookingService} from '../../../api/booking.service';
import {MockBookingService} from '../../../shared/test/Mock';
import {AuthHttp} from 'angular2-jwt';
import {MockBackend} from '@angular/http/testing';
import {SimpleNotificationsModule} from 'angular2-notifications';
import {MaterialModule} from '@angular/material';
import {FormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import { CustomFormsModule } from 'ng2-validation';
import { PrettyIDPipe } from '../../../shared/pipe/pretty-id.pipe';

describe('JobDetailComponent', () => {
  let component: JobDetailComponent;
  let fixture: ComponentFixture<JobDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobDetailComponent, PrettyIDPipe ],
      providers: [ SpinnerService, NotificationServiceBus,
        {
          provide: ActivatedRoute,
          useValue: {
            params: Observable.of({ id: 1 })
          }
        },
        { provide: BookingService, useClass: MockBookingService },
         { provide: AuthHttp, useClass: MockBackend }],
      imports: [SimpleNotificationsModule, MaterialModule, FormsModule,
        RouterTestingModule, CustomFormsModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
