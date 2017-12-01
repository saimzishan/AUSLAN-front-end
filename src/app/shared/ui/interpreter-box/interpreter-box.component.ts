import {ChangeDetectionStrategy, Component, Input, OnInit, OnDestroy, ViewContainerRef, AfterContentInit} from '@angular/core';
import {MdDialog, MdDialogConfig, MdDialogRef} from '@angular/material';
import {InterpreterPopupComponent} from '../interpreter-popup/interpreter-popup.component';
import {PreferedAllocationService} from '../../prefered-allocation.service';
import {AuthGuard} from '../../../auth/auth.guard';

@Component({
    selector: 'app-interpreter-box',
    templateUrl: './interpreter-box.component.html',
    styleUrls: ['./interpreter-box.component.css']

})
export class InterpreterBoxComponent implements OnInit, AfterContentInit {

    @Input() isPreffered = false;
    @Input() selectedInterpreters = [];
    needInterpreter = false;
    private dialogSub: any;
    dialogRef: MdDialogRef<any>;
    title = '';
    @Input() isHidden = false;
    preferAllocSub: any;
   // @Input() showOld = true;
    @Input() profileInterp = [];
    private _showProfilePref = true;
    private _showProfileBlock = true;

     @Input() set showProfilePref(val: boolean) {
       this._showProfilePref = val ;
      val ? this.addProfilePref() : this.removeProfilePref();
     }

     get showProfilePref(): boolean { return this._showProfilePref; }

     @Input() set showProfileBlock(val: boolean) {
        this._showProfileBlock = val ;
        val ? this.addProfileBlock() : this.removeProfileBlock();
      }

      get showProfileBlock(): boolean { return this._showProfileBlock; }

    constructor(public dialog: MdDialog,
                public viewContainerRef: ViewContainerRef,
                private _sharedPreferedAllocationService: PreferedAllocationService) {
    }

    ngOnInit() {
        this.title = this.isPreffered ?
            'PREFFERED INTERPRETER' : 'BLOCKED INTERPRETER';
                this.preferAllocSub = this._sharedPreferedAllocationService.interpreterStream$.subscribe(
                    data => {
                        this.selectedInterpreters = data;
                    });
    }

    ngOndestroy() {
        let sub = this.preferAllocSub && this.preferAllocSub.unsubscribe();

        return sub ;
    }

    ngAfterContentInit() {
        this.needInterpreter = this.isHidden ? true : false ;
    }

    getIndex(interpreter) {
        return this.selectedInterpreters
            .filter(i => this.isPreffered ? i.preference ===  'preferred' :  i.preference ===  'blocked').indexOf(interpreter) + 1;
    }

    checkInterpreterPreference(interpreter) {
        return interpreter.preference === (this.isPreffered ? 'preferred' : 'blocked');
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
            this._sharedPreferedAllocationService.publishData(this.selectedInterpreters);
        });
    }

    removeInterpreter(selectedInterpreter) {
        if (AuthGuard.isLoggedIn()) {
            selectedInterpreter._destroy = 1;
            this.selectedInterpreters = this.selectedInterpreters.filter(itm => itm.interpreter_id !== selectedInterpreter.interpreter_id);
        } else {
            this.selectedInterpreters =
                this.selectedInterpreters.filter(i => i.interpreter_id !== selectedInterpreter.interpreter_id);

        }
        this._sharedPreferedAllocationService.publishData(this.selectedInterpreters);
    }

    addProfilePref() {
        this.selectedInterpreters = this.selectedInterpreters.concat(this.profileInterp.filter(itm => itm.preference === 'preferred'));
        this._sharedPreferedAllocationService.publishData(this.selectedInterpreters);
    }

    addProfileBlock() {
        this.selectedInterpreters = this.selectedInterpreters.concat(this.profileInterp.filter(itm => itm.preference === 'blocked'));
        this._sharedPreferedAllocationService.publishData(this.selectedInterpreters);
    }

    removeProfilePref() {
        this.selectedInterpreters = this.selectedInterpreters.filter(item =>
            this.profileInterp.every(old => (old.preference === 'preferred' && old.interpreter_id !== item.interpreter_id)));
        this._sharedPreferedAllocationService.publishData(this.selectedInterpreters);
    }

    removeProfileBlock() {
        this.selectedInterpreters = this.selectedInterpreters.filter(item =>
            this.profileInterp.every(old => (old.preference === 'blocked' && old.interpreter_id !== item.interpreter_id)));
        this._sharedPreferedAllocationService.publishData(this.selectedInterpreters);
    }

}
