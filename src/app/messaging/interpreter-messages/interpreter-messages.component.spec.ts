import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterpreterMessagesComponent } from './interpreter-messages.component';
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

describe('InterpreterMessagesComponent', () => {
  let component: InterpreterMessagesComponent;
  let fixture: ComponentFixture<InterpreterMessagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InterpreterMessagesComponent ],
      providers: [RolePermission, { provide: UserService }, NotificationServiceBus, { provide: MessagingService, useClass: MockMessageService  },
        SpinnerService, { provide: AuthHttp, useClass: MockBackend } ],
      imports: [FormsModule, RouterTestingModule, HttpModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterpreterMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
