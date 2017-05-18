import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {BookingService} from '../../api/booking.service';
import {Booking} from '../../shared/model/booking.entity';
import {UserService} from '../../api/user.service';
import {User} from '../../shared/model/user.entity';
import {ROLE} from '../../shared/model/role.enum';
import {SpinnerService} from '../../spinner/spinner.service';
import { NotificationServiceBus } from '../../notification/notification.service';
import { BookingJobsComponent } from './booking-jobs.component';
import {MockUserService, MockBookingService} from '../../shared/test/Mock';
import { MockBackend, MockConnection } from '@angular/http/testing';
import {NotificationComponent} from '../../notification/notification.component';
import {SimpleNotificationsModule} from 'angular2-notifications';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import {authService} from '../../shared/global';
import { MaterialModule } from '@angular/material';
import { Md2Module }  from 'md2';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute, Data } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { CustomFormsModule } from 'ng2-validation';
import { ViewContainerRef } from '@angular/core';
import {MdDialog, MdDialogConfig, MdDialogRef} from '@angular/material';

describe('BookingJobsComponent', () => {
  let component: BookingJobsComponent;
  let fixture: ComponentFixture<BookingJobsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BookingJobsComponent],
      providers: [MdDialog,
        ViewContainerRef, SpinnerService, NotificationServiceBus,
        {
          provide: ActivatedRoute,
          useValue: {
            params: Observable.of({ id: 1 })
          }
        },
        { provide: BookingService, useClass: MockBookingService },
        { provide: UserService, useClass: MockUserService }, { provide: AuthHttp, useClass: MockBackend }],
      imports: [SimpleNotificationsModule, MaterialModule, FormsModule,
        RouterTestingModule, CustomFormsModule]
    }).compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(BookingJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
