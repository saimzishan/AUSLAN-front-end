import { async, inject, ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewContainerRef } from '@angular/core';
import { PopupComponent } from './popup.component';
import { MdDialog, MdDialogConfig, MdDialogRef, MdIconModule, OverlayContainer } from '@angular/material';
import { CustomFormsModule } from 'ng2-validation';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';

describe('PopupComponent', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PopupComponent],
      imports: [CustomFormsModule, FormsModule, NoopAnimationsModule, MaterialModule],
      providers: [MdDialog, ViewContainerRef]
    })
    .overrideModule(BrowserDynamicTestingModule, {
      set: {
        entryComponents: [PopupComponent]
      }
    }).compileComponents();
  }));


  it('should create', async(inject([MdDialog], (dialog: MdDialog) => {
    let dialogRef = dialog.open(PopupComponent);
    let component = dialogRef.componentInstance;
    expect(component).toBeTruthy();
  })));
});
