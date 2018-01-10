import {Component, Input, ViewChild, AfterViewInit, OnInit, NgZone, ElementRef} from '@angular/core';
import { Address } from '../../shared/model/venue.entity';
import { NgForm } from '@angular/forms';
import {NotificationServiceBus} from '../../notification/notification.service';
import {GmapsApiService} from '../../api/gmaps-api.service';
import {GLOBAL} from '../../shared/global';
import 'rxjs/add/operator/toPromise';
import {isNullOrUndefined} from 'util';
import {Interpreter} from '../../shared/model/user.entity';
import { } from 'googlemaps';
import { MapsAPILoader } from '@agm/core';

@Component({
    selector: 'app-address',
    templateUrl: './address.component.html',
    styleUrls: ['./address.component.css'],
    exportAs: 'ctAddressForm'
})

export class AddressComponent implements AfterViewInit, OnInit {
    @Input() address: Address;
    @Input() prefix = '';
    @ViewChild('addressFields') public form: NgForm;
    @ViewChild('searchAddress') public searchElementRef: ElementRef;
    // @ViewChild('address_street_number') addressStreetNum: ElementRef;
    // @ViewChild('address_street') addressStreet: ElementRef;
    // @ViewChild('address_state') public addressState: ElementRef;
    // @ViewChild('address_state') public addressState: ElementRef;
    @Input() canCalculateDistance: boolean;
    @Input() isReadOnly = false;
    @Input() parentForm: NgForm;
    @Input() userModel: Interpreter;

    isTravelCostApplicable = false;
    constructor(
        public notificationServiceBus: NotificationServiceBus,
        public gmapApi: GmapsApiService,
        private mapsAPILoader: MapsAPILoader,
        private ngZone: NgZone
    ) {}

    ngAfterViewInit() {
        if (this.parentForm != null) {
            if (!this.parentForm.form.contains('billAddressFields')) {
                this.parentForm.form.addControl('billAddressFields', this.form.form);
            }
        }
    }

    ngOnInit() {
        this.mapsAPILoader.load().then(() => {
            let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
                types: ['address']
            });
            autocomplete.addListener('place_changed', () => {
                this.ngZone.run(() => {
                    let place: google.maps.places.PlaceResult = autocomplete.getPlace();
                    if (place.geometry !== undefined || place.geometry !== null) {
                        this.address.street_number = place.address_components[0]['short_name'];
                        this.address.street_name = place.address_components[1]['long_name'];
                        this.address.suburb = place.address_components[2]['long_name'];
                        this.address.state = place.address_components[4]['short_name'];
                        this.address.post_code = Number(place.address_components[6]['short_name']);
                    }
                });
            });
        });
    }

    fieldClick(evnt) {
        if ((evnt.target as Element).hasAttribute('readonly')) {
            this.notificationServiceBus
                .launchNotification(true, 'In order to change this field, please contact the booking office.');
        }
    }

    calculateDistance(): boolean {
        debugger;
        let originAddress: Array<string> = [];
        if (this.form.valid) {
            for (let i in this.form.value) {
                if (!isNullOrUndefined(this.form.value[i])) { originAddress.push(this.form.value[i]); }
            }
            originAddress.push('Australia');
            this.gmapApi.getMinDistance([originAddress.join(', ')], [GLOBAL.GPO_ADDRESS_ONE, GLOBAL.GPO_ADDRESS_TWO]).then(value => {
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

    autoFillAddress(): boolean {
        debugger;
        // for (let i of place.address_components.length) {
        //     let addressType = place.address_components[i].types[0];
            // debugger;
            // if (this.addressComponents[addressType]) {
            //     let val = place.address_components[i][this.addressComponents[addressType]];
            //     document.getElementById(addressType).value = val;
            // }
        // }
        return true;
    }
}
