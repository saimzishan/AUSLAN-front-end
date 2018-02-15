import {async, inject, ComponentFixture, TestBed} from '@angular/core/testing';
import {ViewContainerRef} from '@angular/core';
import {MdDialog, MdDialogConfig, MdDialogRef, MdIconModule, OverlayContainer} from '@angular/material';
import {CustomFormsModule} from 'ng2-validation';
import {FormsModule} from '@angular/forms';
import {MaterialModule} from '@angular/material';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {BrowserDynamicTestingModule} from '@angular/platform-browser-dynamic/testing';
import {InterpreterPopupComponent} from './interpreter-popup.component';
import {NotificationComponent} from 'angular2-notifications/lib/notification.component';
import {RouterTestingModule} from '@angular/router/testing';
import {SimpleNotificationsModule} from 'angular2-notifications/lib/simple-notifications.module';
import {MockUserService} from '../../test/Mock';
import {UserService} from '../../../api/user.service';
import {NotificationServiceBus} from '../../../notification/notification.service';
import {MockBackend} from '@angular/http/testing';
import {AuthHttp} from 'angular2-jwt';
import {SpinnerService} from '../../../spinner/spinner.service';
import {NgxPaginationModule} from 'ngx-pagination';

describe('InterpreterPopupComponent', () => {

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [InterpreterPopupComponent],
            imports: [CustomFormsModule, FormsModule, NoopAnimationsModule, MaterialModule,
                RouterTestingModule, NgxPaginationModule],
            providers: [{provide: UserService, useClass: MockUserService},
                { provide: AuthHttp, useClass: MockBackend },
                SpinnerService, MdDialog, NotificationServiceBus, ViewContainerRef]
        }).overrideModule(BrowserDynamicTestingModule, {
            set: {
                entryComponents: [InterpreterPopupComponent]
            }
        }).compileComponents();
    }));


    it('should create', async(inject([MdDialog], (dialog: MdDialog) => {
        let dialogRef = dialog.open(InterpreterPopupComponent);
        let component = dialogRef.componentInstance;
        expect(component).toBeTruthy();

    })));
});
