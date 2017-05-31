import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillMatrixComponent } from './skill-matrix.component';
import {EnumValPipe} from '../../shared/pipe/enum-val.pipe';
import {CustomFormsModule} from 'ng2-validation';
import {MaterialModule} from '@angular/material';

describe('SkillMatrixComponent', () => {
  let component: SkillMatrixComponent;
  let fixture: ComponentFixture<SkillMatrixComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkillMatrixComponent, EnumValPipe ]
      ,
      imports: [CustomFormsModule, MaterialModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkillMatrixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
