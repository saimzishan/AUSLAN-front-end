/* tslint:disable:no-unused-variable */
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
import { ResetComponent } from './reset.component';
import { VerifyComponent } from '../verify/verify.component';
import {authService} from '../shared/global';
import {  HttpModule, Http, RequestOptions } from '@angular/http';
import { NotificationComponent } from '../notification/notification.component';


describe('ResetComponent', () => {
  let component: ResetComponent;
  let fixture: ComponentFixture<ResetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnumValPipe, AdminComponent, RegisterComponent, NotificationComponent,
          NotFoundComponent, DashboardComponent, AuthComponent, ResetComponent, VerifyComponent ],
      imports: [CustomFormsModule, HttpModule, routing, FormsModule, RouterModule],
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
    fixture = TestBed.createComponent(ResetComponent);
    component = fixture.componentInstance;
    spyOn(component, 'resetUser').and.callThrough();

    fixture.detectChanges();
    component.emailAddress = 'dummy@admin.com';
    fixture.debugElement.query(By.css('button[name=reset_user]')).nativeElement.click();
    done();

  });

  it('should create', (done) => {
    expect(component).toBeTruthy();
    done();
  });


  it('should request the reset user for valid email', (done) => {
      fixture.whenStable().then(() => {
          expect(component.resetUser).toHaveBeenCalled();
          done();
      });
  });

});
