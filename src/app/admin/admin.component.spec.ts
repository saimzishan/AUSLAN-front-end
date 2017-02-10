/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import {UserService} from '../api/user.service';
import { Observable } from 'rxjs/Observable';
import { FormsModule }   from '@angular/forms';
import { CustomFormsModule } from 'ng2-validation';
import { EnumValPipe } from '../shared/pipe/enum-val.pipe';
import { HttpModule, BaseRequestOptions } from '@angular/http';
import {authService} from '../shared/global';
import {  Http, RequestOptions } from '@angular/http';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { AdminComponent } from './admin.component';
import { NotificationComponent } from '../notification/notification.component';

describe('AdminComponent', () => {
  let component: AdminComponent;
  let fixture: ComponentFixture<AdminComponent>;

  let userService, spy;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminComponent, EnumValPipe, NotificationComponent ],
      providers: [UserService, {
          provide: AuthHttp,
          useFactory: authService,
          deps: [Http, RequestOptions]
        }],
      imports: [CustomFormsModule,  HttpModule,  FormsModule
  ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
    // UserService from the root injector
    userService = fixture.debugElement.injector.get(UserService);

    // Setup spy on the `getQuote` method
    spy = spyOn(userService, 'fetchUsers')
          .and.returnValue(Observable);

  });

  it('should create', () => {
     expect(component).toBeTruthy();
     // fixture.detectChanges();
     // expect(spy.calls.any()).toBe(true, 'fetchUsers should be called');

  });
});
