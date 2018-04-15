import { Pipe, PipeTransform } from '@angular/core';
import {Booking} from './shared/model/booking.entity';
import * as momentTimeZone from 'moment-timezone';

@Pipe({
  name: 'momentTZDate'
})
export class MomentTZDatePipe implements PipeTransform {


    transform(timeVal: any, state?: any, postCode?: any): any {
        if (timeVal !== undefined && state !== undefined && postCode !== undefined) {
            let timeZone = Booking.getNamedTimeZone(state, postCode.toString());
            return momentTimeZone(timeVal).tz(timeZone).format('ddd MMM Do YY');
        }
    }

}
