import { MdCheckboxModule } from '@angular/material';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserService } from '../../api/user.service';
import { NotificationServiceBus } from '../../notification/notification.service';
import { PlatformLocation } from '@angular/common';
import { MessagingService } from '../../api/messaging.service';
import { Location } from '@angular/common';
import { SpinnerService } from '../../spinner/spinner.service';
import { BookingService } from '../../api/booking.service';
import { RolePermission } from '../../shared/role-permission/role-permission';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpModule } from '@angular/http';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { MockMessageService } from '../../shared/test/Mock';
import { InboxComponent } from './inbox.component';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { NgxPaginationModule } from 'ngx-pagination';
import {MobileHeaderComponent} from '../../ui/mobile-header/mobile-header.component';
import { ReplaceLineBreaks } from '../../replaceLineBreaks.pipe';


const PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
    suppressScrollX: true
};

describe('InboxComponent', () => {
  let component: InboxComponent;
  let fixture: ComponentFixture<InboxComponent>;

  beforeEach(async(() => {
        TestBed.configureTestingModule({
          declarations: [InboxComponent, MobileHeaderComponent, ReplaceLineBreaks],
            providers: [RolePermission, { provide: UserService }, NotificationServiceBus, { provide: MessagingService, useClass: MockMessageService },
                SpinnerService, { provide: AuthHttp, useClass: MockBackend }],
          imports: [FormsModule, RouterTestingModule, HttpModule,
              PerfectScrollbarModule.forRoot(PERFECT_SCROLLBAR_CONFIG),
              MdCheckboxModule, NgxPaginationModule]
          })
        .compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(InboxComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
      });

    it('should create', () => {
        expect(component).toBeTruthy();
      });
});
