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
import { Location } from '@angular/common';
import { fakeAsync, async, inject, TestBed, getTestBed } from '@angular/core/testing';
import { BrowserModule, Title } from '@angular/platform-browser';
import {
    RouterModule, ActivatedRoute
} from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { NotificationComponent } from '../notification/notification.component';
import { BookingComponent } from '../booking/booking.component';
import { BookingDetailComponent } from '../booking/booking-detail/booking-detail.component';
import { SpinnerComponent } from '../spinner/spinner.component';
import { SpinnerService } from '../spinner/spinner.service';
import { HeaderComponent } from '../ui/header/header.component';
import { FilterComponent } from '../booking/filter/filter.component';
import { BookingListComponent } from '../booking/booking-list/booking-list.component';
import { UserListComponent } from '../user-management/user-list/user-list.component';
import { UserFilterComponent } from '../user-management/user-filter/user-filter.component';
import { UserHeaderComponent } from '../user-management/user-header/user-header.component';
import { UserDetailComponent } from '../user-management/user-detail/user-detail.component';
import { MaterialModule } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import {Injectable} from '@angular/core';
import {MockUserService} from '../shared/test/Mock';


describe('AuthComponent', () => {
    let component: AuthComponent;
    let fixture: ComponentFixture<AuthComponent>;
    beforeEach(async(() => {

      TestBed.configureTestingModule({
          declarations: [EnumValPipe,
          AuthComponent,
          DashboardComponent,
          UserManagementComponent,
          EnumValPipe,
          NotFoundComponent,
          RegisterComponent,
          VerifyComponent,
          ResetComponent,
          NotificationComponent,
          BookingComponent,
          BookingDetailComponent,
          SpinnerComponent,
          HeaderComponent,
          FilterComponent,
          BookingListComponent,
          UserListComponent,
          UserFilterComponent,
          UserHeaderComponent,
          UserDetailComponent],
          providers: [{ provide: UserService, useClass: MockUserService}, SpinnerService, { provide: APP_BASE_HREF, useValue: '/' }, {
              provide: AuthHttp,
              useFactory: authService,
              deps: [Http, RequestOptions]
          }],
          imports: [CustomFormsModule, MaterialModule, RouterModule, HttpModule, FormsModule,
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
