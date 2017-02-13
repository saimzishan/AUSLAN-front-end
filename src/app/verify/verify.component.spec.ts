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


describe('VerifyComponent', () => {
  let component: VerifyComponent;
  let fixture: ComponentFixture<VerifyComponent>;
  let de:      DebugElement;
  let el:      HTMLElement;

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

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    spyOn(component, 'verifyUser').and.callThrough();
    spyOn(component, 'resendVerificationCode').and.callThrough();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call verifyUser if verification Code and user ID is present', () => {
    component.verificationCode = '123456';
    component.userID = 1;
    fixture.detectChanges();
    de = fixture.debugElement.query(By.css('button[name=verify_user]'));
    el = de.nativeElement;

     el.click();

     fixture.whenStable().then(() => {
       expect(component.verifyUser).toHaveBeenCalled();
     });

  });
  /* // Enable when API is there
  it('should call resend verification', () => {
    component.verificationCode = 'dummy';
    component.userID = 1;
    fixture.detectChanges();


     de = fixture.debugElement.query(By.css('button[name=resend_code]'));
     el = de.nativeElement;

     fixture.whenStable().then(() => {
       expect(component.resendVerificationCode).toHaveBeenCalled();
     });

  }); */

});
