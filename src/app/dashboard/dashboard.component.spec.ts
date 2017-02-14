/* tslint:disable:no-unused-variable */
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { AuthComponent } from '../auth/auth.component';
import {GLOBAL} from '../shared/global';
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
import { NotificationComponent } from '../notification/notification.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnumValPipe, AdminComponent, RegisterComponent, NotificationComponent,
          NotFoundComponent, DashboardComponent, AuthComponent, ResetComponent, VerifyComponent ],
      imports: [FormsModule, RouterModule, HttpModule, routing, CustomFormsModule],
      providers: [UserService, {provide: APP_BASE_HREF, useValue : '/' },
      {
          provide: AuthHttp,
          useFactory: authService,
          deps: [Http, RequestOptions]
        }]
    })
    .compileComponents();
  }));

  beforeEach((done) => {
    GLOBAL.currentUser = new User({id: 2, email: 'admin1@aus.au', name: 'Joe Doe'}); // mimic as user has logged in
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    spyOn(component, 'getUserProfile').and.callThrough();

    fixture.detectChanges();

    done();
  });

  it('should create', (done) => {
    expect(component).toBeTruthy();
    done();
  });

  it('should have called for user profile', (done) => {
    fixture.whenStable().then(() => {
        expect(component.getUserProfile).toHaveBeenCalled();
        done();
    });
  });
});
