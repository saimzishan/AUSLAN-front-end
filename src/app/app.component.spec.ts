/* tslint:disable:no-unused-variable */

import{GLOBAL} from './shared/global';
import {
    Response,
    RequestMethod
} from '@angular/http';
import {UserService} from './api/user.service';
import { NgModule } from '@angular/core';
import { HttpModule, BaseRequestOptions } from '@angular/http';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { Http, RequestOptions } from '@angular/http';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { EnumValPipe } from './shared/pipe/enum-val.pipe';
import { NotFoundComponent } from './not-found/not-found.component';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CustomFormsModule } from 'ng2-validation';
import { routing } from './app.routing';
import {
    TestBed, fakeAsync, async, inject
} from '@angular/core/testing';
import {APP_BASE_HREF} from '@angular/common';
import {authService} from './shared/global';
import { Title } from '@angular/platform-browser';
import { ResetComponent } from './reset/reset.component';
import { VerifyComponent } from './verify/verify.component';
import { RegisterComponent } from './register/register.component';
import { NotificationComponent } from './notification/notification.component';
import { RouterTestingModule } from '@angular/router/testing';
import {
    RouterModule, ActivatedRoute
} from '@angular/router';
import { BookingComponent } from './booking-management/booking.component';
import { BookingDetailComponent } from './booking-management/booking-detail/booking-detail.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { SpinnerService } from './spinner/spinner.service';
import { HeaderComponent } from './ui/header/header.component';
import { BookingHeaderComponent } from './booking-management/booking-header/booking-header.component';
import { UserFilterComponent } from './user-management/user-filter/user-filter.component';
import { UserHeaderComponent } from './user-management/user-header/user-header.component';
import { UserListComponent } from './user-management/user-list/user-list.component';
import { MaterialModule } from '@angular/material';
import { Md2Module }  from 'md2';
import {UserNameService} from './shared/user-name.service';
import {SimpleNotificationsModule} from 'angular2-notifications';
import { BOOKING_NATURE } from './shared/model/booking-nature.enum';
import { PARKING } from './shared/model/parking.enum';
import { BookingFilterComponent } from './booking-management/booking-filter/booking-filter.component';
import { BookingListComponent } from './booking-management/booking-list/booking-list.component';
import {NotificationServiceBus} from './notification/notification.service';
import { SpacerPipe } from './shared/pipe/spacer.pipe';
import { PrettyIDPipe } from './shared/pipe/pretty-id.pipe';
import { MobileFooterModule } from './ui/mobile-footer/mobile-footer.module';
import { FileuploaderModule } from './shared/fileuploader/fileuploader.module';
import {OrgRepComponent} from './ui/org-rep/org-rep.component';
import {InterpreterComponent} from './ui/interpreter/interpreter.component';
import {AddressComponent} from './ui/address/address.component';
import {IndClientComponent} from './ui/ind-client/ind-client.component';
import {BillingAccountComponent} from './ui/billing-account/billing-account.component';
import {AccountantComponent} from './ui/accountant/accountant.component';
import {PreComponent} from './register/pre/pre.component';
import {BlockoutComponent} from './user-management/user-profile/blockout/blockout.component';
import {CalendarModule} from 'ap-angular2-fullcalendar';
import {TermandconditionComponent} from './ui/termandcondition/termandcondition.component';
import {InterpreterBoxComponent} from './shared/ui/interpreter-box/interpreter-box.component';
import {InterpreterPopupComponent} from './shared/ui/interpreter-popup/interpreter-popup.component';
import {PreferedAllocationService} from './shared/prefered-allocation.service';
import {NgxPaginationModule} from 'ngx-pagination';
import {RemoveSpacePipe} from './shared/pipe/remove-space.pipe';
import {CalendarModule as PrimeNgCalendarModule} from 'primeng/primeng';

describe('AppComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        AuthComponent, UserFilterComponent, UserHeaderComponent, UserListComponent,
        DashboardComponent, NotificationComponent,
        UserManagementComponent, BookingHeaderComponent, BookingFilterComponent, BookingListComponent,
        EnumValPipe, HeaderComponent, SpacerPipe,
        NotFoundComponent, RegisterComponent, ResetComponent, VerifyComponent,
        BookingComponent, PrettyIDPipe, TermandconditionComponent,
        BookingDetailComponent, BlockoutComponent,
        SpinnerComponent, OrgRepComponent, InterpreterComponent, AddressComponent,
          IndClientComponent, BillingAccountComponent, AccountantComponent, PreComponent,
          InterpreterBoxComponent, InterpreterPopupComponent, RemoveSpacePipe

      ],
      imports: [CustomFormsModule, NgxPaginationModule, FileuploaderModule, RouterTestingModule, Md2Module.forRoot(),
      MaterialModule, FormsModule, SimpleNotificationsModule.forRoot(), MobileFooterModule,
        HttpModule, CalendarModule, PrimeNgCalendarModule
      ],  providers: [ NotificationServiceBus,
            PreferedAllocationService,
         UserNameService, Title, SpinnerService, UserService, {provide: APP_BASE_HREF, useValue : '/' }, {
          provide: AuthHttp,
          useFactory: authService,
          deps: [Http, RequestOptions]
        }]
    });
    TestBed.compileComponents();
  });

  it('should create the app', (() => {

    let fixture = TestBed.createComponent(AppComponent);
    let app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();

  }));

  it(`should have as title as declared in GLOBAL`, inject([Title], (service: Title) => {
    expect(service.getTitle()).toEqual(GLOBAL.TITLE + GLOBAL.VERSION);
  }));

});
