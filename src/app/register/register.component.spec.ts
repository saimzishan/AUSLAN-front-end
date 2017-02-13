/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { RegisterComponent } from './register.component';
import { RouterModule, Router } from '@angular/router';
import { routing } from '../app.routing';
import {APP_BASE_HREF} from '@angular/common';
import { AdminComponent } from '../admin/admin.component';
import { NotificationComponent } from '../notification/notification.component';
import { NotFoundComponent }   from '../not-found/not-found.component';
import { AuthGuard } from '../auth/auth.guard';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { AuthComponent } from '../auth/auth.component';
import { ModuleWithProviders }  from '@angular/core';
import { ResetComponent } from '../reset/reset.component';
import { VerifyComponent } from '../verify/verify.component';
import { EnumValPipe } from '../shared/pipe/enum-val.pipe';
import {authService} from '../shared/global';
import { RequestOptions } from '@angular/http';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import {UserService} from '../api/user.service';
import { Observable } from 'rxjs/Observable';
import { FormsModule }   from '@angular/forms';
import { CustomFormsModule } from 'ng2-validation';
import { HttpModule, Http, BaseRequestOptions } from '@angular/http';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EnumValPipe,  AdminComponent, RegisterComponent, NotificationComponent,
          NotFoundComponent, DashboardComponent, AuthComponent, ResetComponent, VerifyComponent ],
      providers: [UserService, {provide: APP_BASE_HREF, useValue : '/' }, {
          provide: AuthHttp,
          useFactory: authService,
          deps: [Http, RequestOptions]
        }],
      imports: [CustomFormsModule, routing, RouterModule, HttpModule,  FormsModule
  ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
