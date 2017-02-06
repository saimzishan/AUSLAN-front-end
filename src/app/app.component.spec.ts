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
import { ApiService } from './api/api.service';
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

describe('AppComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        AuthComponent,
        DashboardComponent,
        AdminComponent,
        EnumValPipe,
        NotFoundComponent,
      ],
      imports: [CustomFormsModule, routing,
        BrowserModule,
        FormsModule,
        HttpModule
      ],  providers: [ApiService, UserService, {provide: APP_BASE_HREF, useValue : '/' }, {
          provide: AuthHttp,
          useFactory: authService,
          deps: [Http, RequestOptions]
        }]
    });
    TestBed.compileComponents();
  });

  it('should create the app', async(() => {
    let fixture = TestBed.createComponent(AppComponent);
    let app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have as title as declared in GLOBAL`, async(() => {
    let fixture = TestBed.createComponent(AppComponent);
    let app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual(GLOBAL.TITLE + GLOBAL.VERSION);
  }));

  it('should render title in a h1 tag', async(() => {
    let fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    let compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain(GLOBAL.TITLE);
  }));
});
