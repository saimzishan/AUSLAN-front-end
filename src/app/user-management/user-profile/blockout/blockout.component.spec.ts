import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockoutComponent } from './blockout.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CustomFormsModule} from 'ng2-validation';
import {RouterTestingModule} from '@angular/router/testing';
import {MaterialModule, MdDialog} from '@angular/material';
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
import {CalendarModule as PrimeNgCalendarModule} from 'primeng/primeng';
import {ViewContainerRef} from '@angular/core';
import {MobileHeaderComponent} from '../../../ui/mobile-header/mobile-header.component';
import { DatePipe } from '@angular/common';

describe('BlockoutComponent', () => {
  let component: BlockoutComponent;
  let fixture: ComponentFixture<BlockoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlockoutComponent, UserHeaderComponent, MobileHeaderComponent ],
      providers: [MdDialog,
          ViewContainerRef, LinkHelper, LinkAuth, RolePermission,
        { provide: UserService, useClass: MockUserService}, { provide: AuthHttp, useClass: MockBackend},
        NotificationServiceBus, DatePipe,
        SpinnerService],
      imports: [HttpModule, FormsModule, MaterialModule, PrimeNgCalendarModule,
          RouterTestingModule, CustomFormsModule, BrowserAnimationsModule]
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
