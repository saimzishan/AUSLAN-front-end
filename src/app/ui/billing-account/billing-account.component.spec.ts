import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {BillingAccountComponent} from './billing-account.component';
import {Contact} from '../../shared/model/contact.entity';
import {Address} from '../../shared/model/venue.entity';

import {FormsModule} from '@angular/forms';
import {CustomFormsModule} from 'ng2-validation';
import {AddressComponent} from '../address/address.component';
import {MaterialModule} from '@angular/material';
import {SimpleNotificationsModule} from 'angular2-notifications/src/simple-notifications.module';
import {NotificationServiceBus} from '../../notification/notification.service';
import {MockBackend} from '@angular/http/testing';
import {AuthHttp} from 'angular2-jwt';
import {GmapsApiService} from '../../api/gmaps-api.service';
import {RemoveSpacePipe} from '../../shared/pipe/remove-space.pipe';
import {FakeOpMapsAPILoader} from '../../shared/test/Mock';
import {MapsAPILoader} from '@agm/core';
import {NgForm} from '@angular/forms';

describe('BillingAccountComponent', () => {
    let component: BillingAccountComponent;
    let fixture: ComponentFixture<BillingAccountComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [BillingAccountComponent, AddressComponent, RemoveSpacePipe],
            providers: [NotificationServiceBus, GmapsApiService, {provide: AuthHttp, useClass: MockBackend}, { provide: MapsAPILoader, useClass: FakeOpMapsAPILoader}],
            imports: [FormsModule, CustomFormsModule, SimpleNotificationsModule, MaterialModule]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(BillingAccountComponent);
        component = fixture.componentInstance;
        component.primaryContact = new Contact();
        component.billingAddress = new Address();

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
