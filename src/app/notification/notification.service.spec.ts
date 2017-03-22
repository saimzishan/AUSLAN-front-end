/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { NotificationsService } from 'angular2-notifications';
import { NotificationServiceBus, NotificationContainer } from './notification.service';
import {SimpleNotificationsModule} from 'angular2-notifications';

describe('NotificationServiceBus', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NotificationServiceBus, NotificationContainer],
      imports: [SimpleNotificationsModule.forRoot()]
    });
  });

  it('should create ', inject([NotificationServiceBus, NotificationContainer],
    (service: NotificationServiceBus, container: NotificationContainer) => {
    expect(service).toBeTruthy();
  }));
});
