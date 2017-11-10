import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {InterpreterComponent} from './interpreter.component';
import {FormsModule} from '@angular/forms';
import {CustomFormsModule} from 'ng2-validation';
import {AddressComponent} from '../address/address.component';
import {Interpreter} from '../../shared/model/user.entity';
import {MaterialModule} from '@angular/material';
import {BillingAccountComponent} from '../billing-account/billing-account.component';
import {CalendarModule} from 'ap-angular2-fullcalendar';
import {RouterTestingModule} from '@angular/router/testing';
import {NotificationServiceBus} from '../../notification/notification.service';
import {SimpleNotificationsModule} from 'angular2-notifications/src/simple-notifications.module';

describe('InterpreterComponent', () => {
    let component: InterpreterComponent;
    let fixture: ComponentFixture<InterpreterComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [InterpreterComponent, AddressComponent, BillingAccountComponent],
            providers: [NotificationServiceBus],
            imports: [FormsModule, CustomFormsModule, SimpleNotificationsModule,
                RouterTestingModule, MaterialModule, CalendarModule]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(InterpreterComponent);
        component = fixture.componentInstance;
        component.userModel = new Interpreter();
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
