/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { NotificationComponent } from '../notification/notification.component';
import { VerifyComponent } from './verify.component';
import { FormsModule }   from '@angular/forms';
import { CustomFormsModule } from 'ng2-validation';
import { EnumValPipe } from '../shared/pipe/enum-val.pipe';
import {UserService} from '../api/user.service';
import { APP_BASE_HREF } from '@angular/common';
import {authService} from '../shared/global';
import {  HttpModule, Http, RequestOptions } from '@angular/http';
import { AuthHttp, AuthConfig } from 'angular2-jwt';

describe('VerifyComponent', () => {
  let component: VerifyComponent;
  let fixture: ComponentFixture<VerifyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnumValPipe, VerifyComponent, NotificationComponent ],
      imports: [FormsModule, HttpModule, CustomFormsModule],
      providers: [UserService, {provide: APP_BASE_HREF, useValue : '/' },
      {
          provide: AuthHttp,
          useFactory: authService,
          deps: [Http, RequestOptions]
        }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
