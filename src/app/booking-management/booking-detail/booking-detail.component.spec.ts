/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {DebugElement, ViewContainerRef} from '@angular/core';
import { Md2Module }  from 'md2';
import {Booking} from '../../shared/model/booking.entity';
import {BookingService} from '../../api/booking.service';
import { BOOKING_NATURE } from '../../shared/model/booking-nature.enum';
import { PARKING } from '../../shared/model/parking.enum';
import { EnumValPipe } from '../../shared/pipe/enum-val.pipe';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import {MaterialModule, MdDialog} from '@angular/material';
import { MockBackend, MockConnection } from '@angular/http/testing';
import {DummyComponent, MockBookingService} from '../../shared/test/Mock';
import { RouterTestingModule } from '@angular/router/testing';
import { BookingComponent } from '../booking.component';
import { CustomFormsModule } from 'ng2-validation';
import { FormsModule }   from '@angular/forms';
import {SpinnerService} from '../../spinner/spinner.service';
import { BookingDetailComponent } from './booking-detail.component';
import {NotificationServiceBus} from '../../notification/notification.service';
import { ActivatedRoute, Data } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RolePermission } from '../../shared/role-permission/role-permission';
import { DatePipe } from '@angular/common';
import {NgForm} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {FileuploaderModule} from '../../shared/fileuploader/fileuploader.module';
import {AddressComponent} from '../../ui/address/address.component';
import {BillingAccountComponent} from '../../ui/billing-account/billing-account.component';

describe('BookingDetailComponent', () => {
  let component: BookingDetailComponent;
  let fixture: ComponentFixture<BookingDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookingDetailComponent, EnumValPipe, AddressComponent,
          BillingAccountComponent
      ],
      imports: [CustomFormsModule, FileuploaderModule,
        FormsModule, BrowserAnimationsModule, RouterTestingModule, HttpModule,
        Md2Module.forRoot(),
        MaterialModule
      ],  providers: [MdDialog,
            ViewContainerRef,
            DatePipe, RolePermission,
            NotificationServiceBus, { provide: BookingService, useClass: MockBookingService },
          SpinnerService, { provide: AuthHttp, useClass: MockBackend },
          {
                    provide: ActivatedRoute,
                    useValue: {
                        queryParams: {
                            subscribe: (fn: (value: Data) => void) => fn({
                                bookingModel: ''
                            })
                        }
                    }
                }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
