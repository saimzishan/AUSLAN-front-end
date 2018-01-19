import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingPayrollComponent } from './booking-payroll.component';

describe('BookingPayrollComponent', () => {
  let component: BookingPayrollComponent;
  let fixture: ComponentFixture<BookingPayrollComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookingPayrollComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingPayrollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
