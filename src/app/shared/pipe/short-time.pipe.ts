import { Pipe, PipeTransform } from '@angular/core';
import {Booking} from '../model/booking.entity';
import * as momentTimeZone from 'moment-timezone';

@Pipe({
  name: 'timeShort'
})
export class ShortTimePipe implements PipeTransform {

  transform(timeVal: any, state?: any, postCode?: any): any {
    if (timeVal !== undefined && state !== undefined && postCode !== undefined) {
         let timeZone = Booking.getNamedTimeZone(state, postCode.toString());
         return momentTimeZone(timeVal).tz(timeZone).format('hh:mm A');
    }
  }

}
