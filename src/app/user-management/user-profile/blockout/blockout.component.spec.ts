import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockoutComponent } from './blockout.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CustomFormsModule} from 'ng2-validation';
import {RouterTestingModule} from '@angular/router/testing';
import {MaterialModule} from '@angular/material';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {UserHeaderComponent} from '../../user-header/user-header.component';
import {RolePermission} from '../../../shared/role-permission/role-permission';
import {LinkAuth, LinkHelper} from '../../../shared/router/linkhelper';
import {UserService} from '../../../api/user.service';
import {MockUserService} from '../../../shared/test/Mock';
import {AuthHttp} from 'angular2-jwt';
import {MockBackend} from '@angular/http/testing';
import {SpinnerService} from '../../../spinner/spinner.service';
import {NotificationServiceBus} from '../../../notification/notification.service';

describe('BlockoutComponent', () => {
  let component: BlockoutComponent;
  let fixture: ComponentFixture<BlockoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlockoutComponent, UserHeaderComponent ],
      providers: [LinkHelper, LinkAuth, RolePermission,
        { provide: UserService, useClass: MockUserService}, { provide: AuthHttp, useClass: MockBackend},
        NotificationServiceBus,
        SpinnerService],
      imports: [HttpModule, FormsModule, MaterialModule, RouterTestingModule, CustomFormsModule, BrowserAnimationsModule]
    })
        .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
