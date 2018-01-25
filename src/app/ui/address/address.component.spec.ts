import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AddressComponent} from './address.component';

import {FormsModule} from '@angular/forms';
import {CustomFormsModule} from 'ng2-validation';
import {Address} from '../../shared/model/venue.entity';
import {NotificationServiceBus} from '../../notification/notification.service';
import {SimpleNotificationsModule} from 'angular2-notifications/src/simple-notifications.module';
import {GmapsApiService} from '../../api/gmaps-api.service';
import {AuthHttp} from 'angular2-jwt';
import {MockBackend} from '@angular/http/testing';
import {MapsAPILoader} from '@agm/core';

describe('AddressComponent', () => {
    let component: AddressComponent;
    let fixture: ComponentFixture<AddressComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AddressComponent],
            providers: [NotificationServiceBus, GmapsApiService, {provide: AuthHttp, useClass: MockBackend}, MapsAPILoader],
            imports: [FormsModule, CustomFormsModule, SimpleNotificationsModule]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AddressComponent);
        component = fixture.componentInstance;
        component.address = new Address();

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
