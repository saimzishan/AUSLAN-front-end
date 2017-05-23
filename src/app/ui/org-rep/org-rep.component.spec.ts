import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgRepComponent } from './org-rep.component';
import {FormsModule} from '@angular/forms';
import {CustomFormsModule} from 'ng2-validation';
import {Md2Module} from 'md2';
import {MaterialModule} from '@angular/material';

describe('OrgRepComponent', () => {
  let component: OrgRepComponent;
  let fixture: ComponentFixture<OrgRepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrgRepComponent ],
        imports: [CustomFormsModule,
            FormsModule, Md2Module.forRoot(),
            MaterialModule
        ]

    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgRepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
