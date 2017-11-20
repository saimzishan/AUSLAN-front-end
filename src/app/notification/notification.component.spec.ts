/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import {SimpleNotificationsModule} from 'angular2-notifications';

import { NotificationComponent } from './notification.component';
import { NotificationsService } from 'angular2-notifications';
import { NotificationServiceBus, NotificationContainer } from './notification.service';
import {Md2Module} from 'md2';

describe('NotificationComponent', () => {
  let component: NotificationComponent;
  let fixture: ComponentFixture<NotificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotificationComponent ],
        imports: [],
      providers: [ NotificationServiceBus, NotificationsService, NotificationContainer ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
