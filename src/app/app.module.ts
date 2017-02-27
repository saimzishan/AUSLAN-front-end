import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule, BaseRequestOptions } from '@angular/http';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminComponent } from './admin/admin.component';
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
import {enableProdMode} from '@angular/core';
import { NotificationComponent } from './notification/notification.component';
import { BookingComponent } from './booking/booking.component';
import { BookingDetailComponent } from './booking/booking-detail/booking-detail.component';
import { SpinnerComponent } from './spinner/spinner.component';


@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    DashboardComponent,
    AdminComponent,
    EnumValPipe,
    NotFoundComponent,
    RegisterComponent,
    VerifyComponent,
    ResetComponent,
    NotificationComponent,
    BookingComponent,
    BookingDetailComponent,
    SpinnerComponent,
  ], exports: [EnumValPipe],
  imports: [CustomFormsModule, routing,
    BrowserModule, RouterModule,
    FormsModule,
    HttpModule
  ],  providers: [AuthGuard, Title, UserService, {provide: APP_BASE_HREF, useValue : '/' }, {
      provide: AuthHttp,
      useFactory: authService,
      deps: [Http, RequestOptions]
    }],

  bootstrap: [AppComponent],
})
export class AppModule {

 }
