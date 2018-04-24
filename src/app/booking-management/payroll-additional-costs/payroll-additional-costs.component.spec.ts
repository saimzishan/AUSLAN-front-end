import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayrollAdditionalCostsComponent } from './payroll-additional-costs.component';

describe('PayrollAdditionalCostsComponent', () => {
  let component: PayrollAdditionalCostsComponent;
  let fixture: ComponentFixture<PayrollAdditionalCostsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayrollAdditionalCostsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayrollAdditionalCostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
