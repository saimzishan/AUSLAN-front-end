import {Injectable} from '@angular/core';
import {ApiService} from "./api.service";
import 'rxjs/add/operator/toPromise';
declare var google: any;

@Injectable()
export class GmapsApiService extends ApiService {

    getDistance(origin: Array<string>, destination: Array<string>, units: string = 'km'): Promise<any> {
        return this.distanceWithLocation(origin, destination, units).then(data => {
            return data[0].elements[0].distance;
        }, error => {
            return error;
        });
    }

    getMinDistance(origin: Array<string>, destination: Array<string>, units: string = 'km'): Promise<any> {
        return new Promise((resolve, reject) => {
            return this.distanceWithLocation(origin, destination, units).then((data) => {
                resolve(Math.min.apply(Math, data[0].elements.map(function(e) { return e.distance && e.distance.value; })));
            }, (error) => {
                reject(error);
            });
        });
    }

    distanceWithLocation(origin: Array<string>, destination: Array<string>, units: string = 'km'): Promise<any> {
        let promise = new Promise((resolve, reject) => {
            let distanceMatrixObject = new google.maps.DistanceMatrixService();
            return distanceMatrixObject.getDistanceMatrix(
                {
                    origins: origin,
                    destinations: destination,
                    travelMode: 'DRIVING',
                    unitSystem: google.maps.UnitSystem.METRIC,
                    avoidHighways: false,
                    avoidTolls: false,
                }, (response, status) => {
                    if (status !== 'OK') {
                        reject(status);
                    } else {
                        resolve(response.rows);
                    }
                });
        });
        return promise;
    }
}
