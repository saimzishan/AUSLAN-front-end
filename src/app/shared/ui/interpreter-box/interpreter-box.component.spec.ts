import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterpreterBoxComponent } from './interpreter-box.component';
import {CustomFormsModule} from 'ng2-validation';
import {FormsModule} from '@angular/forms';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule, MdDialog} from '@angular/material';
import {RouterTestingModule} from '@angular/router/testing';
import {UserService} from '../../../api/user.service';
import {MockUserService} from '../../test/Mock';
import {AuthHttp} from 'angular2-jwt';
import {MockBackend} from '@angular/http/testing';
import {SpinnerService} from '../../../spinner/spinner.service';
import {NotificationServiceBus} from '../../../notification/notification.service';
import {ViewContainerRef} from '@angular/core';
import {PreferedAllocationService} from '../../prefered-allocation.service';

describe('InterpreterBoxComponent', () => {
  let component: InterpreterBoxComponent;
  let fixture: ComponentFixture<InterpreterBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InterpreterBoxComponent ],
        imports: [CustomFormsModule, FormsModule, NoopAnimationsModule, MaterialModule,
            RouterTestingModule],
        providers: [{provide: UserService, useClass: MockUserService},
            { provide: AuthHttp, useClass: MockBackend },
            PreferedAllocationService, SpinnerService, MdDialog, NotificationServiceBus, ViewContainerRef]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterpreterBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
