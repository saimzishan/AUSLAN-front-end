import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountantComponent } from './accountant.component';
import {FormsModule} from '@angular/forms';
import { CustomFormsModule } from 'ng2-validation';
import {AddressComponent} from '../address/address.component';
import {Accountant} from '../../shared/model/user.entity';

describe('AccountantComponent', () => {
  let component: AccountantComponent;
  let fixture: ComponentFixture<AccountantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountantComponent, AddressComponent ],
      imports: [FormsModule, CustomFormsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountantComponent);
    component = fixture.componentInstance;
    component.userModel = new Accountant();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
