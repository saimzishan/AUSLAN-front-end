import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {MockUserService} from '../../shared/test/Mock';
import { UserProfileComponent } from './user-profile.component';
import { User } from '../../shared/model/user.entity';
import { UserService } from '../../api/user.service';
import { ROLE } from '../../shared/model/role.enum';
import { SpinnerService } from '../../spinner/spinner.service';
import { NotificationServiceBus } from '../../notification/notification.service';
import {GLOBAL} from '../../shared/global';
import {LinkHelper, LINK} from '../../shared/router/linkhelper';
import {UserNameService} from '../../shared/user-name.service';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { MockBackend, MockConnection } from '@angular/http/testing';

describe('UserProfileComponent', () => {
  let component: UserProfileComponent;
  let fixture: ComponentFixture<UserProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserProfileComponent ],
      providers: [UserNameService,
         { provide: UserService, useClass: MockUserService}, { provide: AuthHttp, useClass: MockBackend},
        NotificationServiceBus,
        SpinnerService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
