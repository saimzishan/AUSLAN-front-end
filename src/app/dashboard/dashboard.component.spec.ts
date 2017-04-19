/* tslint:disable:no-unused-variable */
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { AuthComponent } from '../auth/auth.component';
import { GLOBAL } from '../shared/global';
import { UserService } from '../api/user.service';
import { User } from '../shared/model/user.entity';
import {
  TestBed, fakeAsync, async, inject, ComponentFixture
} from '@angular/core/testing';
import { CustomFormsModule } from 'ng2-validation';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { routing } from '../app.routing';
import { APP_BASE_HREF } from '@angular/common';
import { NotFoundComponent } from '../not-found/not-found.component';
import { AuthGuard } from '../auth/auth.guard';
import { UserManagementComponent } from '../user-management/user-management.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { ModuleWithProviders } from '@angular/core';
import { RegisterComponent } from '../register/register.component';
import { EnumValPipe } from '../shared/pipe/enum-val.pipe';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { authService } from '../shared/global';
import { NotificationComponent } from '../notification/notification.component';
import { BookingComponent } from '../booking-management/booking.component';
import { BookingDetailComponent } from '../booking-management/booking-detail/booking-detail.component';
import { SpinnerComponent } from '../spinner/spinner.component';
import { UserFilterComponent } from '../user-management/user-filter/user-filter.component';
import { UserHeaderComponent } from '../user-management/user-header/user-header.component';
import { UserListComponent } from '../user-management/user-list/user-list.component';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { MockUserService } from '../shared/test/Mock';
import { RouterTestingModule } from '@angular/router/testing';
import { UserNameService } from '../shared/user-name.service';
import { LinkHelper, LINK } from '../shared/router/linkhelper';
import { SpacerPipe } from '../shared/pipe/spacer.pipe';
import { RolePermission } from '../shared/role-permission/role-permission';
import { HttpModule, Http, RequestOptions } from '@angular/http';
import { VerifyComponent } from '../verify/verify.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let routerStub;

  beforeEach(async(() => {
    routerStub = {
      navigate: jasmine.createSpy('navigate')
    };
    TestBed.configureTestingModule({
      declarations: [DashboardComponent, SpacerPipe, UserFilterComponent, UserHeaderComponent, VerifyComponent, UserListComponent],
      imports: [FormsModule, CustomFormsModule, HttpModule, RouterModule],
      providers: [RolePermission, LinkHelper, UserNameService, { provide: Router, useValue: routerStub },
        { provide: UserService, useClass: MockUserService }, { provide: AuthHttp, useClass: MockBackend }]
    })
      .compileComponents();
  }));

  beforeEach((done) => {
    GLOBAL.currentUser = new User({ id: 2, email: 'admin1@aus.au', name: 'Joe Doe' }); // mimic as user has logged in
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
      expect(routerStub.navigate).toHaveBeenCalled();
      done();
    });
  });
});
