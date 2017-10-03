import {ChangeDetectionStrategy, Component, Input, OnInit, ViewContainerRef} from '@angular/core';
import {MdDialog, MdDialogConfig, MdDialogRef} from '@angular/material';
import {InterpreterPopupComponent} from '../interpreter-popup/interpreter-popup.component';

@Component({
    selector: 'app-interpreter-box',
    templateUrl: './interpreter-box.component.html',
    styleUrls: ['./interpreter-box.component.css']

})
export class InterpreterBoxComponent implements OnInit {

    @Input() isPreffered = false;
    @Input() selectedInterpreters = [];
    needInterpreter = false;
    private dialogSub: any;
    dialogRef: MdDialogRef<any>;
    title = '';

    constructor(public dialog: MdDialog,
                public viewContainerRef: ViewContainerRef) {
    }

    ngOnInit() {
        this.title = this.isPreffered ?
            'ADD PREFFERED INTERPRETER' : 'ADD BLOCKED INTERPRETER';

    }

    checkInterpreterPreference (interpreter) {
        let res = interpreter.preference === (this.isPreffered ? 'preferred' : 'blocked');
        return res;
    }

    manageInterpreter() {

        if (this.dialogSub) {
            this.dialogSub.unsubscribe();
        }

        let config: MdDialogConfig = {
            disableClose: true
        };
        config.viewContainerRef = this.viewContainerRef;
        this.dialogRef = this.dialog.open(InterpreterPopupComponent, config);
        this.dialogRef.componentInstance.selectedInterpreters = this.selectedInterpreters;
        this.dialogRef.componentInstance.isPreffered = this.isPreffered;
        this.dialogSub = this.dialogRef.afterClosed().subscribe(result => {

        });
    }
}
