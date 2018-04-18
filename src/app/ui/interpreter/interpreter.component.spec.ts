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
import {MockBackend} from '@angular/http/testing';
import {AuthHttp} from 'angular2-jwt';
import {GmapsApiService} from '../../api/gmaps-api.service';
import {RemoveSpacePipe} from '../../shared/pipe/remove-space.pipe';
import {FakeOpMapsAPILoader} from '../../shared/test/Mock';
import {MapsAPILoader} from '@agm/core';
import {UserService} from '../../api/user.service';
import {MockUserService, MockBookingService} from '../../shared/test/Mock';
import { SpinnerService } from '../../spinner/spinner.service';

let user = {
        'address_attributes':
            {
                'unit_number': '22', 'street_number': '62', 'street_name': 'DIANNE AVE',
                'suburb': 'CRAIGIEBURN', 'post_code': '3064', 'state': 'VIC'
            },
        'skill_level': 'Deaf Interpreter Accredited',
        'location_pref': 'QLD', 'comm_pref': 'SMS and Email', 'role': 6, 'first_name': 'Nauman', 'last_name': 'Interpreter',
        'password': 'Abcd#1234', 'confirm_password': 'Abcd#1234', 'email': 'nauman+int@curvetomorrow.com.au', 'phone': '0490398821',
        'mobile': 'xxxx xxx xxx', 'naati_id': 'NA-234', 'naati_validity_start_date': '2017-06-30',
        'naati_validity_end_date': '2017-07-31',
        'date_of_birth': '2017-08-31'

    };

describe('InterpreterComponent', () => {
    let component: InterpreterComponent;
    let fixture: ComponentFixture<InterpreterComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [InterpreterComponent, AddressComponent, BillingAccountComponent, RemoveSpacePipe],
            providers: [NotificationServiceBus, GmapsApiService,  {provide: AuthHttp, useClass: MockBackend}, { provide: MapsAPILoader, useClass: FakeOpMapsAPILoader},
                { provide: UserService, useClass: MockUserService }, SpinnerService],
            imports: [FormsModule, CustomFormsModule, SimpleNotificationsModule,
                RouterTestingModule, MaterialModule, CalendarModule]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(InterpreterComponent);
        component = fixture.componentInstance;
        component.userModel = new Interpreter(user);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
