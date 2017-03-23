/* tslint:disable:no-unused-variable */
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { AuthComponent } from '../auth/auth.component';
import {GLOBAL} from '../shared/global';
import { UserService } from '../api/user.service';
import { MockUserService } from '../shared/test/Mock';
import { NotificationServiceBus } from '../notification/notification.service';

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
import { UserManagementComponent } from '../user-management/user-management.component';
import { ModuleWithProviders }  from '@angular/core';
import { RegisterComponent } from '../register/register.component';
import { EnumValPipe } from '../shared/pipe/enum-val.pipe';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { ResetComponent } from '../reset/reset.component';
import { VerifyComponent } from '../verify/verify.component';
import {authService} from '../shared/global';
import {  HttpModule, Http, RequestOptions } from '@angular/http';
import { NotificationComponent } from '../notification/notification.component';
import {DashboardComponent} from '../dashboard/dashboard.component';
import { BookingComponent } from '../booking-management/booking.component';
import { BookingDetailComponent } from '../booking-management/booking-detail/booking-detail.component';
import { SpinnerComponent } from '../spinner/spinner.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import {SimpleNotificationsModule} from 'angular2-notifications';

describe('VerifyComponent', () => {
    let component: VerifyComponent;
    let fixture: ComponentFixture<VerifyComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [VerifyComponent, NotificationComponent],
            imports: [FormsModule, RouterTestingModule, HttpModule, CustomFormsModule, SimpleNotificationsModule.forRoot()],
            providers: [{ provide: UserService, useClass: MockUserService},
              NotificationServiceBus, { provide: AuthHttp, useClass: MockBackend} ]
        })
            .compileComponents();
    }));
    describe('VerifyComponent', () => {
        beforeEach((done) => {
            fixture = TestBed.createComponent(VerifyComponent);
            component = fixture.componentInstance;
            spyOn(component, 'resendVerificationCode').and.callThrough();
            spyOn(component, 'verifyUser').and.callThrough();

            fixture.detectChanges();
            component.verificationCode = 'dummy';
            component.userID = 1;

            fixture.debugElement.query(By.css('button[name=resend_code]')).nativeElement.click();

            fixture.debugElement.query(By.css('button[name=verify_user]')).nativeElement.click();
            done();

        });

        it('should create', (done) => {
            expect(component).toBeTruthy();
            done();
        });

        it('should call resend verification', (done) => {
            fixture.whenStable().then(() => {
                expect(component.resendVerificationCode).toHaveBeenCalled();
                done();
            });
        });


        it('should call verifyUser if verification Code and user ID is present', (done) => {
            fixture.whenStable().then(() => {
                expect(component.verifyUser).toHaveBeenCalled();
                done();
            });

        });

    });
});
