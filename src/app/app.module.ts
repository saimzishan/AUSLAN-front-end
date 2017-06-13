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
import { APP_BASE_HREF } from '@angular/common';
import { authService } from './shared/global';
import { RegisterComponent } from './register/register.component';
import { VerifyComponent } from './verify/verify.component';
import { ResetComponent } from './reset/reset.component';
import { AuthGuard } from './auth/auth.guard';
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
import { UserNameService } from './shared/user-name.service';
import { Md2Module }  from 'md2';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { NotificationServiceBus } from './notification/notification.service';
import { UserProfileComponent } from './user-management/user-profile/user-profile.component';
import { LinkHelper, LinkAuth } from './shared/router/linkhelper';
import { RouterModule } from '@angular/router';
import { AuthHttp } from 'angular2-jwt';
import { SpacerPipe } from './shared/pipe/spacer.pipe';
import { BookingJobsComponent } from './booking-management/booking-jobs/booking-jobs.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RolePermission } from './shared/role-permission/role-permission';
import { CommonModule } from '@angular/common';
import { HyphenPipe } from './shared/pipe/hyphen.pipe';
import { NoAuthGuard } from './auth/no-auth.guard';
import { Store, provideStore } from '@ngrx/store';
import { PopupComponent } from './shared/popup/popup.component';
import { JobDetailComponent } from './booking-management/booking-jobs/job-detail/job-detail.component';
import { DatePipe } from '@angular/common';
import { PrettyIDPipe } from './shared/pipe/pretty-id.pipe';
import { MobileFooterModule } from './ui/mobile-footer/mobile-footer.module';
import { OrgRepComponent } from './ui/org-rep/org-rep.component';
import { IndClientComponent } from './ui/ind-client/ind-client.component';
import { InterpreterComponent } from './ui/interpreter/interpreter.component';
import { BillingAccountComponent } from './ui/billing-account/billing-account.component';
import {FileuploaderModule} from './shared/fileuploader/fileuploader.module';
import { SkillMatrixComponent } from './user-management/skill-matrix/skill-matrix.component';
import { AddressComponent } from './ui/address/address.component';
import { AccountantComponent } from './ui/accountant/accountant.component';
import { UserPasswordComponent } from './user-management/user-password/user-password.component';
import { PreComponent } from './register/pre/pre.component';

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
    UserProfileComponent, HyphenPipe, PrettyIDPipe, SpacerPipe,
    BookingJobsComponent, PopupComponent, JobDetailComponent, OrgRepComponent, IndClientComponent,
    InterpreterComponent, BillingAccountComponent,
    SkillMatrixComponent, AddressComponent, AccountantComponent, UserPasswordComponent, PreComponent
  ],
  entryComponents: [UserDetailComponent, PopupComponent],
  imports: [CustomFormsModule, routing, FileuploaderModule,
    BrowserModule, RouterModule, CommonModule, MobileFooterModule,
    FormsModule, BrowserAnimationsModule,
    HttpModule, SimpleNotificationsModule.forRoot(),
    ReactiveFormsModule, Md2Module.forRoot(),
    MaterialModule
  ],  providers: [DatePipe, LinkAuth, UserNameService, RolePermission, AuthGuard, NoAuthGuard, Title, LinkHelper,
    NotificationServiceBus, SpinnerService, BookingService, UserService,
    { provide: APP_BASE_HREF, useValue : '/' },
    {
      provide: AuthHttp,
      useFactory: authService,
      deps: [Http, RequestOptions]
    }],
  bootstrap: [AppComponent],
})
export class AppModule {
}
