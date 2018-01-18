import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {MockUserService} from '../../shared/test/Mock';
import { UserProfileComponent } from './user-profile.component';
import { UserService } from '../../api/user.service';
import { SpinnerService } from '../../spinner/spinner.service';
import { NotificationServiceBus } from '../../notification/notification.service';
import {UserNameService} from '../../shared/user-name.service';
import { AuthHttp } from 'angular2-jwt';
import { MockBackend } from '@angular/http/testing';
import {UserHeaderComponent} from '../user-header/user-header.component';
import { CustomFormsModule } from 'ng2-validation';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import {LinkHelper, LinkAuth} from '../../shared/router/linkhelper';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {RolePermission} from '../../shared/role-permission/role-permission';
import {HttpModule} from '@angular/http';
import {InterpreterComponent} from '../../ui/interpreter/interpreter.component';
import {AccountantComponent} from '../../ui/accountant/accountant.component';
import {BillingAccountComponent} from '../../ui/billing-account/billing-account.component';
import {AddressComponent} from '../../ui/address/address.component';
import {OrgRepComponent} from '../../ui/org-rep/org-rep.component';
import {IndClientComponent} from '../../ui/ind-client/ind-client.component';
import {CalendarModule} from 'ap-angular2-fullcalendar';
import {InterpreterPopupComponent} from '../../shared/ui/interpreter-popup/interpreter-popup.component';
import {InterpreterBoxComponent} from '../../shared/ui/interpreter-box/interpreter-box.component';
import {PreferedAllocationService} from '../../shared/prefered-allocation.service';
import {RemoveSpacePipe} from '../../shared/pipe/remove-space.pipe';
import {MobileHeaderComponent} from '../../ui/mobile-header/mobile-header.component';

describe('UserProfileComponent', () => {
  let component: UserProfileComponent;
  let fixture: ComponentFixture<UserProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserProfileComponent, UserHeaderComponent, InterpreterComponent,
        OrgRepComponent, InterpreterComponent, AddressComponent,
          MobileHeaderComponent,
        IndClientComponent, BillingAccountComponent, AccountantComponent,
          InterpreterPopupComponent, InterpreterBoxComponent, RemoveSpacePipe],
      providers: [PreferedAllocationService, UserNameService, LinkHelper, LinkAuth, RolePermission,
         { provide: UserService, useClass: MockUserService}, { provide: AuthHttp, useClass: MockBackend},
        NotificationServiceBus,
        SpinnerService],
        imports: [HttpModule, CalendarModule, FormsModule, MaterialModule, RouterTestingModule, CustomFormsModule, BrowserAnimationsModule]
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
