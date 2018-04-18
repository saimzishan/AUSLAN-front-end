import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {BookingService} from '../../api/booking.service';
import {Booking} from '../../shared/model/booking.entity';
import {UserService} from '../../api/user.service';
import {SpinnerService} from '../../spinner/spinner.service';
import { NotificationServiceBus } from '../../notification/notification.service';
import { BookingJobsComponent } from './booking-jobs.component';
import {MockUserService, MockBookingService} from '../../shared/test/Mock';
import { MockBackend, MockConnection } from '@angular/http/testing';
import {SimpleNotificationsModule} from 'angular2-notifications';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { MaterialModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute, Data } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { CustomFormsModule } from 'ng2-validation';
import { ViewContainerRef } from '@angular/core';
import {MdDialog, MdDialogConfig, MdDialogRef} from '@angular/material';
import { PrettyIDPipe } from '../../shared/pipe/pretty-id.pipe';
import {BookingHeaderService} from '../booking-header/booking-header.service';
import {BookingHeaderComponent} from '../booking-header/booking-header.component';
import {BookingInfoComponent} from '../booking-info/booking-info.component';
import {DatePipe} from '@angular/common';
import {NgxPaginationModule} from 'ngx-pagination';
import {ShortTimePipe} from '../../shared/pipe/short-time.pipe';
import {LinkAuth, LinkHelper} from '../../shared/router/linkhelper';
import {RolePermission} from '../../shared/role-permission/role-permission';
import {HttpModule} from '@angular/http';
import {MobileHeaderComponent} from '../../ui/mobile-header/mobile-header.component';

describe('BookingJobsComponent', () => {
  let component: BookingJobsComponent;
  let fixture: ComponentFixture<BookingJobsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BookingJobsComponent, BookingHeaderComponent, PrettyIDPipe, BookingInfoComponent,
                     ShortTimePipe, MobileHeaderComponent],
      providers: [MdDialog, LinkHelper, LinkAuth, RolePermission,
        ViewContainerRef, SpinnerService, NotificationServiceBus, DatePipe, BookingHeaderService,
        {
          provide: ActivatedRoute,
          useValue: {
            params: Observable.of({ id: 1 })
          }
        },
        { provide: BookingService, useClass: MockBookingService },
        { provide: UserService, useClass: MockUserService }, { provide: AuthHttp, useClass: MockBackend }],
      imports: [SimpleNotificationsModule, MaterialModule, FormsModule, NgxPaginationModule,
        RouterTestingModule, HttpModule, CustomFormsModule]
    }).compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(BookingJobsComponent);
    component = fixture.componentInstance;
    component.selectedBookingModel = new Booking();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
