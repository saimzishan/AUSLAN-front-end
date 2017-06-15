import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillMatrixComponent } from './skill-matrix.component';
import {EnumValPipe} from '../../shared/pipe/enum-val.pipe';
import {CustomFormsModule} from 'ng2-validation';
import {MaterialModule} from '@angular/material';
import {UserHeaderComponent} from '../user-header/user-header.component';
import {FormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {LinkAuth, LinkHelper} from '../../shared/router/linkhelper';
import {RolePermission} from '../../shared/role-permission/role-permission';

describe('SkillMatrixComponent', () => {
  let component: SkillMatrixComponent;
  let fixture: ComponentFixture<SkillMatrixComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkillMatrixComponent, UserHeaderComponent, EnumValPipe ]
      ,
      imports: [CustomFormsModule, MaterialModule, FormsModule, RouterTestingModule
      ],
      providers: [LinkAuth, LinkHelper, RolePermission]
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
