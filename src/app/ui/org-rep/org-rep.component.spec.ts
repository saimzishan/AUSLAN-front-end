import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgRepComponent } from './org-rep.component';
import {FormsModule} from '@angular/forms';
import {CustomFormsModule} from 'ng2-validation';
import {Md2Module} from 'md2';
import {MaterialModule} from '@angular/material';
import {AddressComponent} from '../address/address.component';
import {OrganisationalRepresentative} from '../../shared/model/user.entity';
import {BillingAccountComponent} from '../billing-account/billing-account.component';
import {NotificationServiceBus} from '../../notification/notification.service';
import {SimpleNotificationsModule} from 'angular2-notifications/src/simple-notifications.module';

describe('OrgRepComponent', () => {
  let component: OrgRepComponent;
  let fixture: ComponentFixture<OrgRepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrgRepComponent, AddressComponent, BillingAccountComponent ],
        providers: [NotificationServiceBus],
        imports: [CustomFormsModule, SimpleNotificationsModule,
            FormsModule, Md2Module.forRoot(),
            MaterialModule
        ]

    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgRepComponent);
    component = fixture.componentInstance;
    component.userModel = new OrganisationalRepresentative({});
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
