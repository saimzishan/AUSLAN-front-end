import {Component, Input, ViewContainerRef} from '@angular/core';
import {LinkHelper, LinkAuth, LINK} from '../../shared/router/linkhelper';
import {UserPayrollBilling} from '../../shared/model/user-payroll-billing.entity';
import {Router} from '@angular/router';
import {MdDialog, MdDialogConfig, MdDialogRef} from '@angular/material';
import {PopupComponent} from '../../shared/popup/popup.component';

@Component({
    selector: 'app-user-header',
    templateUrl: './user-header.component.html',
    styleUrls: ['./user-header.component.css']
})
export class UserHeaderComponent {
    linkName = LINK;
    isStaff_calendar = false;
    @Input() payrollBillingModel: UserPayrollBilling = new UserPayrollBilling();
    @Input() oldModel: any;
    dialogRef: MdDialogRef<any>;
    dialogSub;

    constructor(private linkAuth: LinkAuth, private router: Router, public dialog: MdDialog, public viewContainerRef: ViewContainerRef) {}

    isActiveLink(linkName) {
        return LinkHelper.activeLink === linkName;
    }

    setActiveLink(linkName) {
        LinkHelper.activeLink = linkName;
    }

    canShowLink(linkName) {
        return this.linkAuth.canShowLink(linkName);
    }
    showStaffCalendar() {
      this.isStaff_calendar = true;
    }

    isActive(route: string) {
        return this.router.url.includes(route);
    }

    linkClick(linkName, route) {
        if (this.isActive('payroll-billing')) {
            if (this.isModelChanged(this.oldModel, this.payrollBillingModel)) {
                this.showUnsavedWarningPopup();
                this.dialogSub = this.dialogRef.afterClosed().subscribe(result => {
                    if (result) {
                        return;
                    } else {
                        this.goToRoute(linkName, route);
                    }
                });
            } else {
                this.goToRoute(linkName, route);
            }
        } else {
            this.goToRoute(linkName, route);
        }
    }

    showUnsavedWarningPopup() {
        let config: MdDialogConfig = {
            disableClose: true
        };
        config.viewContainerRef = this.viewContainerRef;
        this.dialogRef = this.dialog.open(PopupComponent, config);
        this.dialogRef.componentInstance.title = 'Unsaved changes';
        this.dialogRef.componentInstance.cancelTitle = 'Leave page';
        this.dialogRef.componentInstance.okTitle = 'Stay on page';
        this.dialogRef.componentInstance.closeVal = true;
        this.dialogRef.componentInstance.popupMessage =
            `There are unsaved changes on this page. Are you sure you want to leave?`;
    }

    isModelChanged(oldModel, currentModel) {
        return !(JSON.stringify(oldModel) === JSON.stringify(currentModel));
    }

    goToRoute(linkName, route) {
        this.setActiveLink(linkName);
        this.router.navigate(route);
    }
}
