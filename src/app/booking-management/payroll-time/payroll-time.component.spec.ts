import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayrollTimeComponent } from './payroll-time.component';

describe('PayrollTimeComponent', () => {
  let component: PayrollTimeComponent;
  let fixture: ComponentFixture<PayrollTimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayrollTimeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayrollTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
