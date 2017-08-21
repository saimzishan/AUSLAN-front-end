import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TermandconditionComponent } from './termandcondition.component';
import {MaterialModule} from '@angular/material';
import {CustomFormsModule} from 'ng2-validation';
import {FormsModule} from '@angular/forms';

describe('TermandconditionComponent', () => {
  let component: TermandconditionComponent;
  let fixture: ComponentFixture<TermandconditionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TermandconditionComponent ],
        imports: [FormsModule, CustomFormsModule, MaterialModule]

    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TermandconditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
