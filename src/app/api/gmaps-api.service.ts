import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import 'rxjs/add/operator/toPromise';
declare var google: any;

@Injectable()
export class GmapsApiService extends ApiService {

    getDistance(origin: Array<string>, destination: Array<string>, unit = 'km'): Promise<any> {
        return this.fetchDistanceAndDuration(origin, destination, unit).then(data => {
            return data[0].elements[0].distance;
        }, error => {
            return error;
        });
    }

    getMinDistance(origin: Array<string>, destination: Array<string>, unit = 'km'): Promise<any> {
        return new Promise((resolve, reject) => {
            return this.fetchDistanceAndDuration(origin, destination, unit).then(data => {
                resolve(Math.min.apply(Math, data[0].elements.map(e => { return e.distance && e.distance.value; })));
            }, error => {
                reject(error);
            });
        });
    }

    fetchDistanceAndDuration(origin: Array<string>, destination: Array<string>, unit = 'km'): Promise<any> {
        let promise = new Promise((resolve, reject) => {
            let distanceMatrixObject = new google.maps.DistanceMatrixService();
            return distanceMatrixObject.getDistanceMatrix(
                {
                    origins: origin,
                    destinations: destination,
                    travelMode: 'DRIVING',
                    unitSystem: this.setDistanceUnit(unit),
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

    private setDistanceUnit(unit: string): number {
        return {'km': 0, 'mi': 1}[unit];
    }
}
