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
import { Router } from '@angular/router';
import { routing } from '../app.routing';
import { APP_BASE_HREF } from '@angular/common';
import { NotFoundComponent }   from '../not-found/not-found.component';
import { AuthGuard } from '../auth/auth.guard';
import { UserManagementComponent } from '../user-management/user-management.component';
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
import { Location } from '@angular/common';
import { fakeAsync, async, inject, TestBed, getTestBed } from '@angular/core/testing';
import { BrowserModule, Title } from '@angular/platform-browser';
import {
    RouterModule, ActivatedRoute
} from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { BookingComponent } from '../booking/booking.component';
import { BookingDetailComponent } from '../booking/booking-detail/booking-detail.component';
import { SpinnerComponent } from '../spinner/spinner.component';
import { SpinnerService } from '../spinner/spinner.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import {Injectable} from '@angular/core';
import { ApiService } from '../api/api.service';

let res: Object = {'res': { 'data': { 'jwt': GLOBAL.FAKE_TOKEN}}};

@Injectable()
class MockUserService extends ApiService {

     login(user: User): Observable<Object>  {
       return Observable.of(res).map(this.extractData);
     }

     logout() {
       return '';
     }
 }

describe('AuthComponent', () => {
    let component: AuthComponent;
    let fixture: ComponentFixture<AuthComponent>;
    beforeEach(async(() => {

      TestBed.configureTestingModule({
          declarations: [EnumValPipe, UserManagementComponent, RegisterComponent, NotificationComponent,
              NotFoundComponent, DashboardComponent, AuthComponent, ResetComponent, VerifyComponent,
              BookingComponent,
              BookingDetailComponent,
              SpinnerComponent],
          providers: [{ provide: UserService, useClass: MockUserService}, SpinnerService, { provide: APP_BASE_HREF, useValue: '/' }, {
              provide: AuthHttp,
              useFactory: authService,
              deps: [Http, RequestOptions]
          }],
          imports: [CustomFormsModule, RouterModule, HttpModule, FormsModule,
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
