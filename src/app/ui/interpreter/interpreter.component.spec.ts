import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterpreterComponent } from './interpreter.component';
import {FormsModule} from '@angular/forms';
import { CustomFormsModule } from 'ng2-validation';
import {AddressComponent} from '../address/address.component';
import { Interpreter} from '../../shared/model/user.entity';
import {MaterialModule} from '@angular/material';
import {BillingAccountComponent} from '../billing-account/billing-account.component';

describe('InterpreterComponent', () => {
  let component: InterpreterComponent;
  let fixture: ComponentFixture<InterpreterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InterpreterComponent, AddressComponent, BillingAccountComponent ],
      imports: [FormsModule, CustomFormsModule, MaterialModule]
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
