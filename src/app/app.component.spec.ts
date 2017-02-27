/* tslint:disable:no-unused-variable */

import {GLOBAL} from './shared/global';
import {
    Response,
    RequestMethod
} from '@angular/http';
import {UserService} from './api/user.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule, BaseRequestOptions } from '@angular/http';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminComponent } from './admin/admin.component';
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
describe('AppComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        AuthComponent,
        DashboardComponent, NotificationComponent,
        AdminComponent,
        EnumValPipe,
        NotFoundComponent, RegisterComponent, ResetComponent, VerifyComponent
      ],
      imports: [CustomFormsModule, RouterModule,
        BrowserModule,
        FormsModule,
        HttpModule, routing
      ],  providers: [Title, UserService, {provide: APP_BASE_HREF, useValue : '/' }, {
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
