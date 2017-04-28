import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupComponent } from './popup.component';
import { MdDialog, MdDialogConfig, MdDialogRef, MdIconModule, OverlayContainer } from '@angular/material';
import { CustomFormsModule } from 'ng2-validation';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';
import {  MdDialogModule } from '@angular/material';

describe('PopupComponent', () => {
  let component: PopupComponent;
  let fixture: ComponentFixture<PopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupComponent ],
      imports: [FormsModule, MdDialogModule, CustomFormsModule, MaterialModule],

    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
