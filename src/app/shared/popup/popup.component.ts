import { Component, Inject, OnInit, Input, OnDestroy, ViewChild, TemplateRef } from '@angular/core';
import { MdDialog, MdDialogRef, MdDialogConfig, MD_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent {

  @Input() title = '';
  @Input() popupMessage = '';
  @Input() okTitle = '';
  @Input() cancelTitle = '';

  constructor(
    public dialogRef: MdDialogRef<PopupComponent>) { }

  closeDialog(val) {
    this.dialogRef.close(val);
  }
}
