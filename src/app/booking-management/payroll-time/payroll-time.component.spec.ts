import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { PayrollTimeComponent } from './payroll-time.component';
import { MaterialModule } from '@angular/material';

describe('PayrollTimeComponent', () => {
  let component: PayrollTimeComponent;
  let fixture: ComponentFixture<PayrollTimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayrollTimeComponent ],
      imports: [MaterialModule, FormsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayrollTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should be created', () => {
  //   expect(component).toBeTruthy();
  // });
});
