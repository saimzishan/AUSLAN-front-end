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
    @Input() canCalculateDistance: boolean;
    @Input() isReadOnly = false;
    @Input() parentForm: NgForm;
    @Input() userModel: Interpreter;

    isTravelCostApplicable = false;
    addressTypes = {
        'floor' : 'short_name',
        'subpremise' : 'short_name',
        'street_number' : 'short_name',
        'route' : 'long_name',
        'locality' : 'long_name',
        'administrative_area_level_1' : 'short_name',
        'postal_code' : 'short_name'
    };
    addressAttrs = {
        'floor' : 'unit_number',
        'subpremise' : 'unit_number',
        'street_number' : 'street_number',
        'route' : 'street_name',
        'locality' : 'suburb',
        'administrative_area_level_1' : 'state',
        'postal_code' : 'post_code'
    };

    subpremiseAddressAttrs = {
        'floor' : 'unit_number',
        'premise' : 'unit_number',
        'subpremise' : 'street_number',
        'street_number' : 'unit_number',
        'route' : 'street_name',
        'locality' : 'suburb',
        'administrative_area_level_1' : 'state',
        'postal_code' : 'post_code'
    };

    constructor(
        public notificationServiceBus: NotificationServiceBus,
        public gmapApi: GmapsApiService,
        private mapsAPILoader: MapsAPILoader,
        private ngZone: NgZone
    ) {}

    ngAfterViewInit() {
        if (this.parentForm != null) {
            if (!this.parentForm.form.contains('addressFields')) {
                this.parentForm.form.addControl('addressFields', this.form.form);
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
                        this.address.street_number = '';
                        this.setAddressComponents(place);
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
        return this.isTravelCostApplicable;
    };

    private setAddressComponents(place) {
        if (place.types[0] === 'subpremise') {
            for (let component of place.address_components) {
                let addressType = this.addressTypes[component['types'][0]];
                let subpremiseAddressAttr = this.subpremiseAddressAttrs[component['types'][0]];
                if (!isNullOrUndefined(subpremiseAddressAttr)) {
                    this.address[subpremiseAddressAttr] = component[addressType];
                }
            }
        } else {
            let firstCompont = place.address_components[0];
            if (firstCompont['types'][0] === 'street_number' && firstCompont.short_name.indexOf('/') === 1) {
                this.address.unit_number = firstCompont.short_name.split('/')[0];
                this.address.street_number = firstCompont.short_name.split('/')[1];
                for (let component of place.address_components) {
                    if (component['types'][0] !== 'street_number') {
                        let addressType = this.addressTypes[component['types'][0]];
                        let addressAttr = this.addressAttrs[component['types'][0]];
                        if (!isNullOrUndefined(addressAttr)) {
                            this.address[addressAttr] = component[addressType];
                        }
                    }
                }
            } else {
                for (let component of place.address_components) {
                    let addressType = this.addressTypes[component['types'][0]];
                    let addressAttr = this.addressAttrs[component['types'][0]];
                    if (!isNullOrUndefined(addressAttr)) {
                        this.address[addressAttr] = component[addressType];
                    }
                }
            }
        }
    }
}
