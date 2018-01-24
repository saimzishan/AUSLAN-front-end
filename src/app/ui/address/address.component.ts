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
    addressTypes = {
        'premise' : 'short_name',
        'street_number' : 'short_name',
        'route' : 'long_name',
        'locality' : 'long_name',
        'administrative_area_level_1' : 'short_name',
        'postal_code' : 'short_name'
    }
    addressAttrs = {
        'premise' : 'unit_number',
        'street_number' : 'street_number',
        'route' : 'street_name',
        'locality' : 'suburb',
        'administrative_area_level_1' : 'state',
        'postal_code' : 'post_code'
    }

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
                types: ['address'],
                componentRestrictions: {country: 'au'}
            });
            autocomplete.addListener('place_changed', () => {
                this.ngZone.run(() => {
                    let place: google.maps.places.PlaceResult = autocomplete.getPlace();
                    if (place.geometry !== undefined || place.geometry !== null) {
                        this.address.unit_number = '';
                        for (let component of place.address_components) {
                            let addressType = this.addressTypes[component['types'][0]]
                            let addressArrr = this.addressAttrs[component['types'][0]]
                            if (!isNullOrUndefined(addressArrr)) {
                                this.address[addressArrr] = component[addressType];
                            }
                        }
                        this.calculateDistance();
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
