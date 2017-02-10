/* tslint:disable:no-unused-variable */
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { NotificationComponent } from '../notification/notification.component';
import { AuthComponent } from './auth.component';
import {GLOBAL} from '../shared/global';
import { ApiService } from '../api/api.service';
import { UserService } from '../api/user.service';
import {User} from '../shared/model/user.entity';
import {
    TestBed, fakeAsync, async, inject, ComponentFixture
} from '@angular/core/testing';
import { CustomFormsModule } from 'ng2-validation';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { routing } from '../app.routing';
import { APP_BASE_HREF } from '@angular/common';
import { NotFoundComponent }   from '../not-found/not-found.component';
import { AuthGuard } from '../auth/auth.guard';
import { AdminComponent } from '../admin/admin.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { ModuleWithProviders }  from '@angular/core';
import { RegisterComponent } from '../register/register.component';
import { EnumValPipe } from '../shared/pipe/enum-val.pipe';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { ResetComponent } from '../reset/reset.component';
import { VerifyComponent } from '../verify/verify.component';
import {authService} from '../shared/global';
import {  HttpModule, Http, RequestOptions } from '@angular/http';


describe('AuthComponent', () => {
  let component: AuthComponent;
  let fixture: ComponentFixture<AuthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnumValPipe, AdminComponent, RegisterComponent, NotificationComponent
          NotFoundComponent, DashboardComponent, AuthComponent, ResetComponent, VerifyComponent ],
      imports: [CustomFormsModule, HttpModule, routing, FormsModule, RouterModule],
      providers: [UserService, ApiService, {provide: APP_BASE_HREF, useValue : '/' },
      {
          provide: AuthHttp,
          useFactory: authService,
          deps: [Http, RequestOptions]
        }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
