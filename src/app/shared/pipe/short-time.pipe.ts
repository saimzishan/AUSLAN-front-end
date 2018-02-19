import { Pipe, PipeTransform } from '@angular/core';
import {Booking} from '../model/booking.entity';
import * as momentTimeZone from 'moment-timezone';

@Pipe({
  name: 'timeShort'
})
export class ShortTimePipe implements PipeTransform {

  transform(timeVal: any, state?: any, postCode?: any): any {
    if (timeVal !== undefined) {
         let timeZone = Booking.getNamedTimeZone(state, postCode.toString());
         let asxx = momentTimeZone(timeVal).tz(timeZone).format('hh:mm A');
          return asxx;
    }
  }

}
