/* tslint:disable:no-unused-variable */
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { AuthComponent } from './auth.component';
import {GLOBAL} from '../shared/global';
import { UserService } from '../api/user.service';
import {User} from '../shared/model/user.entity';
import {
     ComponentFixture
} from '@angular/core/testing';
import { CustomFormsModule } from 'ng2-validation';
import { FormsModule } from '@angular/forms';
import { ModuleWithProviders }  from '@angular/core';
import { EnumValPipe } from '../shared/pipe/enum-val.pipe';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import {authService} from '../shared/global';
import {  HttpModule, Http, RequestOptions } from '@angular/http';
import { Location } from '@angular/common';
import { fakeAsync, async, inject, TestBed, getTestBed } from '@angular/core/testing';
import { BrowserModule, Title } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { SpinnerComponent } from '../spinner/spinner.component';
import { SpinnerService } from '../spinner/spinner.service';
import { MaterialModule } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import {Injectable} from '@angular/core';
import {MockUserService} from '../shared/test/Mock';
import { MockBackend, MockConnection } from '@angular/http/testing';
import {NotificationComponent} from '../notification/notification.component';

describe('AuthComponent', () => {
    let component: AuthComponent;
    let fixture: ComponentFixture<AuthComponent>;
    beforeEach(async(() => {

      TestBed.configureTestingModule({
          declarations: [EnumValPipe, NotificationComponent,
          AuthComponent],
          providers: [SpinnerService, { provide: UserService, useClass: MockUserService}, { provide: AuthHttp, useClass: MockBackend} ],
          imports: [CustomFormsModule, MaterialModule, HttpModule, FormsModule,
            RouterTestingModule.withRoutes(
        [{ path: 'authenticate', component: AuthComponent },
        { path: 'authenticate/logout', component: AuthComponent }])]
      }).compileComponents();
    }));

    beforeEach((done) => {
        fixture = TestBed.createComponent(AuthComponent);
        component = fixture.componentInstance;
        spyOn(component, 'onSubmit').and.callThrough();

        fixture.debugElement.query(By.css('input[name=email]')).nativeElement.value = 'dummy@admin.com.au';
        fixture.debugElement.query(By.css('input[name=pass]')).nativeElement.value = 'dummy@admin.com.au';
        fixture.detectChanges();

        fixture.debugElement.query(By.css('button[name=login_user]')).nativeElement.click();
        done();
    });

    it('should create', (done) => {
        expect(component).toBeTruthy();
        done();
    });

    it('should login', (done) => {
        fixture.whenStable().then(() => {
            expect(component.onSubmit).toHaveBeenCalled();
            done();
        });
    });
});
