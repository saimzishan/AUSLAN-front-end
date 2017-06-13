import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndClientComponent } from './ind-client.component';
import {FormsModule} from '@angular/forms';
import { CustomFormsModule } from 'ng2-validation';
import {AddressComponent} from '../address/address.component';
import {IndividualClient} from '../../shared/model/user.entity';
import {MaterialModule} from '@angular/material';
import {BillingAccountComponent} from '../billing-account/billing-account.component';

describe('IndClientComponent', () => {
  let component: IndClientComponent;
  let fixture: ComponentFixture<IndClientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndClientComponent, AddressComponent, BillingAccountComponent ],
      imports: [FormsModule, CustomFormsModule, MaterialModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndClientComponent);
    component = fixture.componentInstance;
    component.userModel = new IndividualClient();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
