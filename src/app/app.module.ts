import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { UserService } from './api/user.service';
import { BookingService } from './api/booking.service';
import { Http, RequestOptions } from '@angular/http';
import { EnumValPipe } from './shared/pipe/enum-val.pipe';
import { NotFoundComponent } from './not-found/not-found.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomFormsModule } from 'ng2-validation';
import { routing } from './app.routing';
import {APP_BASE_HREF} from '@angular/common';
import {authService} from './shared/global';
import { RegisterComponent } from './register/register.component';
import { VerifyComponent } from './verify/verify.component';
import { ResetComponent } from './reset/reset.component';
import {AuthGuard} from './auth/auth.guard';
import { NotificationComponent } from './notification/notification.component';
import { BookingComponent } from './booking-management/booking.component';
import { BookingDetailComponent } from './booking-management/booking-detail/booking-detail.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { SpinnerService } from './spinner/spinner.service';
import { HeaderComponent } from './ui/header/header.component';
import { BookingFilterComponent } from './booking-management/booking-filter/booking-filter.component';
import { BookingListComponent } from './booking-management/booking-list/booking-list.component';
import { UserListComponent } from './user-management/user-list/user-list.component';
import { UserFilterComponent } from './user-management/user-filter/user-filter.component';
import { UserHeaderComponent } from './user-management/user-header/user-header.component';
import { UserDetailComponent } from './user-management/user-detail/user-detail.component';
import { BookingHeaderComponent } from './booking-management/booking-header/booking-header.component';
import { MaterialModule } from '@angular/material';
import {UserNameService} from './shared/user-name.service';
import { Md2Module }  from 'md2';
import {SimpleNotificationsModule} from 'angular2-notifications';
import {NotificationServiceBus} from './notification/notification.service';
import { UserProfileComponent } from './user-management/user-profile/user-profile.component';
import {LinkHelper} from './shared/router/linkhelper';
import {
  RouterModule,
} from '@angular/router';
import { AuthHttp } from 'angular2-jwt';
import { SpacerPipe } from './shared/pipe/spacer.pipe';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    DashboardComponent,
    EnumValPipe,
    NotFoundComponent,
    RegisterComponent,
    VerifyComponent,
    ResetComponent,
    NotificationComponent,
    SpinnerComponent,
    HeaderComponent,
    BookingComponent,
    BookingDetailComponent,
    BookingListComponent,
    BookingFilterComponent,
    BookingHeaderComponent,
    UserManagementComponent,
    UserFilterComponent,
    UserListComponent,
    UserHeaderComponent,
    UserDetailComponent,
    UserProfileComponent, EnumValPipe, SpacerPipe
  ],
   entryComponents: [UserDetailComponent],
  imports: [CustomFormsModule, routing,
    BrowserModule, RouterModule,
    FormsModule,
    HttpModule, SimpleNotificationsModule.forRoot(),
    ReactiveFormsModule, Md2Module.forRoot(),
    MaterialModule
  ],  providers: [UserNameService, AuthGuard, Title, LinkHelper,
    NotificationServiceBus, SpinnerService, BookingService, UserService,
    {provide: APP_BASE_HREF, useValue : '/' }, {
      provide: AuthHttp,
      useFactory: authService,
      deps: [Http, RequestOptions]
    }],

  bootstrap: [AppComponent],
})
export class AppModule {

 }
