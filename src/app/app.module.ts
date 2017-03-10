import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule, BaseRequestOptions } from '@angular/http';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { UserService } from './api/user.service';
import { Http, RequestOptions } from '@angular/http';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { EnumValPipe } from './shared/pipe/enum-val.pipe';
import { NotFoundComponent } from './not-found/not-found.component';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CustomFormsModule } from 'ng2-validation';
import { routing } from './app.routing';
import {APP_BASE_HREF} from '@angular/common';
import {authService} from './shared/global';
import { RegisterComponent } from './register/register.component';
import { VerifyComponent } from './verify/verify.component';
import { ResetComponent } from './reset/reset.component';
import {AuthGuard} from './auth/auth.guard';
import { NotificationComponent } from './notification/notification.component';
import { BookingComponent } from './booking/booking.component';
import { BookingDetailComponent } from './booking/booking-detail/booking-detail.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { SpinnerService } from './spinner/spinner.service';
import { HeaderComponent } from './ui/header/header.component';
import { FilterComponent } from './booking/filter/filter.component';
import { BookingListComponent } from './booking/booking-list/booking-list.component';
import { UserListComponent } from './user-management/user-list/user-list.component';
import { UserFilterComponent } from './user-management/user-filter/user-filter.component';
import { UserHeaderComponent } from './user-management/user-header/user-header.component';
import { UserDetailComponent } from './user-management/user-detail/user-detail.component';
import { MaterialModule } from '@angular/material';
import {} from 'foundation-sites';
import { BookingHeaderComponent } from './booking-management/booking-header/booking-header.component';


@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    DashboardComponent,
    UserManagementComponent,
    EnumValPipe,
    NotFoundComponent,
    RegisterComponent,
    VerifyComponent,
    ResetComponent,
    NotificationComponent,
    BookingComponent,
    BookingDetailComponent,
    SpinnerComponent,
    HeaderComponent,
    FilterComponent,
    BookingListComponent,
    UserListComponent,
    UserFilterComponent,
    UserHeaderComponent,
    UserDetailComponent,
    BookingHeaderComponent,
  ], exports: [EnumValPipe],
   entryComponents: [UserDetailComponent],
  imports: [CustomFormsModule, routing,
    BrowserModule, RouterModule,
    FormsModule, MaterialModule.forRoot(),
    HttpModule
  ],  providers: [AuthGuard, Title, SpinnerService, UserService, {provide: APP_BASE_HREF, useValue : '/' }, {
      provide: AuthHttp,
      useFactory: authService,
      deps: [Http, RequestOptions]
    }],

  bootstrap: [AppComponent],
})
export class AppModule {

 }
