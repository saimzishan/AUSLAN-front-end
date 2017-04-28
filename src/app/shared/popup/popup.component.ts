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

  public dialog_action: Boolean = false;
  constructor(
    public dialogRef: MdDialogRef<PopupComponent>) { }
  closeDialog() {
    this.dialogRef.close(this.dialog_action);
  }
}
