import { Component, Input, ViewChild, AfterViewInit } from '@angular/core';
import { Address } from '../../shared/model/venue.entity';
import { NgForm } from '@angular/forms';
import {NotificationServiceBus} from '../../notification/notification.service';
import {GmapsApiService} from '../../api/gmaps-api.service';
import {GLOBAL} from '../../shared/global';
import 'rxjs/add/operator/toPromise';
import {isNullOrUndefined} from 'util';
import {Interpreter} from '../../shared/model/user.entity';

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
    @Input() canCalculateDistance: boolean;
    @Input() isReadOnly = false;
    @Input() parentForm: NgForm;
    @Input() userModel: Interpreter;

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
        if (this.address.isValid()) {
            let originAddress = [this.address.unit_number, this.address.street_number, this.address.street_name,
                this.address.suburb, this.address.state, this.address.post_code, 'Australia'];
            let dedicatedGpo = GLOBAL.VICDEAF_STATES.includes(this.address.state) ? GLOBAL.GPO_ADDRESS_ONE : GLOBAL.GPO_ADDRESS_TWO;
            this.gmapApi.getMinDistance([originAddress.join(', ')], [dedicatedGpo]).then(value => {
                let travelCost = Number((value / 1000).toFixed(2)) > 40;
                if (this.userModel) {
                    this.userModel.interpreter_type = travelCost ? 'Rural' : 'Metro';
                }
                this.isTravelCostApplicable = travelCost;
            });
        } else {
            this.isTravelCostApplicable = false;
        }
        return true;
    };
}
