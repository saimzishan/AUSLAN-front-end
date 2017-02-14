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
import { ROLE } from '../shared/model/role.enum';

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

  beforeEach((done) => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    spyOn(component, 'roleSelected').and.callThrough();
    spyOn(component, 'addUser').and.callThrough();

    fixture.debugElement.query(By.css('input[name=first_name]')).nativeElement.value = 'dummy';
    fixture.debugElement.query(By.css('input[name=last_name]')).nativeElement.value = 'dummy';
    fixture.debugElement.query(By.css('input[name=password]')).nativeElement.value = 'dummy@admin.com';
    fixture.debugElement.query(By.css('input[name=certainPassword]')).nativeElement.value = 'dummy@admin.com';
    fixture.debugElement.query(By.css('input[name=email]')).nativeElement.value = 'dummy@admin.com';
    fixture.debugElement.query(By.css('input[name=mobile]')).nativeElement.value = 'xxxxxxxxxx';

    fixture.detectChanges();

    fixture.debugElement.query(By.css('button[name=btnInterpreter]')).nativeElement.click();

    fixture.debugElement.query(By.css('button[name=register_user]')).nativeElement.click();
    done();
  });

  it('should create', (done) => {
    expect(component).toBeTruthy();
    done();
  });

  it('The role interpreter should be selected when btnInterpreter is clicked', (done) => {
      fixture.whenStable().then(() => {
          expect(component.roleSelected).toHaveBeenCalled();
          expect(component.selected).toEqual(true);
          expect(component.selectedRole).toEqual('Interpreter'.toUpperCase());
          done();
      });
  });


  it('should call verifyUser if verification Code and user ID is present', (done) => {
      fixture.whenStable().then(() => {
          expect(component.addUser).toHaveBeenCalled();
          expect(component.model.role).toEqual(ROLE.Interpreter);
          done();
      });

  });
});
