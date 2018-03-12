import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {UserPayrollBillingComponent} from './user-payroll-billing.component';
import {UserHeaderComponent} from '../user-header/user-header.component';
import {RouterTestingModule} from '@angular/router/testing';
import {FormsModule}   from '@angular/forms';
import {CustomFormsModule} from 'ng2-validation';
import {HttpModule} from '@angular/http';
import {RolePermission} from '../../shared/role-permission/role-permission';
import {SpinnerService} from '../../spinner/spinner.service';
import {AuthHttp} from 'angular2-jwt';
import {MockBackend} from '@angular/http/testing';
import {LinkHelper, LinkAuth} from '../../shared/router/linkhelper';

describe('UserPayrollBillingComponent', () => {
  let component: UserPayrollBillingComponent;
  let fixture: ComponentFixture<UserPayrollBillingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserPayrollBillingComponent, UserHeaderComponent ],
      imports: [FormsModule, RouterTestingModule, CustomFormsModule, HttpModule],
      providers: [LinkHelper, LinkAuth, RolePermission,
      SpinnerService, { provide: AuthHttp, useClass: MockBackend }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserPayrollBillingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
