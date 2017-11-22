import { Component, Input, ViewChild, AfterViewInit } from '@angular/core';
import { Address } from '../../shared/model/venue.entity';
import { NgForm } from '@angular/forms';
import {NotificationServiceBus} from '../../notification/notification.service';
import {GmapsApiService} from '../../api/gmaps-api.service';
import {GLOBAL} from '../../shared/global';
import 'rxjs/add/operator/toPromise';
import {isNullOrUndefined} from 'util';
import {Observable} from "rxjs/Observable";

@Component({
    selector: 'app-address',
    templateUrl: './address.component.html',
    styleUrls: ['./address.component.css'],
    exportAs: 'ctAddressForm'
})

export class AddressComponent implements AfterViewInit {
    @Input() address: Address;
    @Input() prefix = '';
    @ViewChild('addressFields') public form: NgForm;
    @Input() canEdit = false;
    @Input() parentForm: NgForm;

    isTravelCostApplicable = false;

    constructor(public notificationServiceBus: NotificationServiceBus, public gmapApi: GmapsApiService) {}

    ngAfterViewInit() {
        if (this.parentForm != null) {
            if (!this.parentForm.form.contains('billAddressFields')) {
                this.parentForm.form.addControl('billAddressFields', this.form.form);
            }
        }
    }

    fieldClick(evnt) {
        if ((evnt.target as Element).hasAttribute('readonly')) {
            this.notificationServiceBus
                .launchNotification(true, 'In order to change this field, please contact the booking office.');
        }
    }

    calculateDistance(): boolean {
        let originAddress: Array<string> = [];
        if (this.form.valid) {
            for (let i in this.form.value) {
                if (!isNullOrUndefined(this.form.value[i])) { originAddress.push(this.form.value[i]); }
            }
            originAddress.push('Australia');
            this.gmapApi.getMinDistance([originAddress.join(', ')], [GLOBAL.GOP_ADDRESS_ONE, GLOBAL.GOP_ADDRESS_TWO]).then(value => {
                this.isTravelCostApplicable = Number((value / 1000).toFixed(2)) > 40;
                return true;
            }).then(error => {
                return false;
            });
        } else {
            this.isTravelCostApplicable = false;
            return false;
        }
    };
}
