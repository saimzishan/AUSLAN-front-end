import { Component, Inject, OnInit, Input, OnDestroy, ViewChild, TemplateRef } from '@angular/core';
import { MdDialog, MdDialogRef, MdDialogConfig, MD_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-popup',
  template: ''
})
export class PopupComponent implements OnDestroy, OnInit {

  @Input() title = '';
  @Input() popupMessage = '';

  dialogRef: MdDialogRef<PopupDialogComponent>;
  lastCloseResult: Boolean;
  config: MdDialogConfig = {
    disableClose: false,
    width: '',
    height: '',
    position: {
      top: '',
      bottom: '',
      left: '',
      right: ''
    }
  };

  @ViewChild(TemplateRef) template: TemplateRef<any>;

  constructor(public dialog: MdDialog) {
  }
  ngOnDestroy() {
  }

  ngOnInit() {
    this.dialogRef = this.dialog.open(PopupDialogComponent, this.config);
    this.dialogRef.componentInstance.title = this.title;
    this.dialogRef.componentInstance.popupMessage = this.popupMessage;

    this.dialogRef.afterClosed().subscribe((result: Boolean) => {
      this.dialogRef = null;
      this.lastCloseResult = result;
    });
  }
}

@Component({
  selector: 'app-popup-dialog',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupDialogComponent {

  @Input() title = '';
  @Input() popupMessage = '';

  public dialog_action: Boolean = false;
  constructor(
    public dialogRef: MdDialogRef<PopupDialogComponent>,
    @Inject(MD_DIALOG_DATA) public data: any) { }
  closeDialog() {
    this.dialogRef.close(this.dialog_action);
  }
}
