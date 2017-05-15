import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'PrettyID'
})
export class PrettyIDPipe implements PipeTransform {

  transform(value: any, args?: any): any {
        if ( value === undefined ) {
          return value;
        }
        let v = value.toString();
    		return '0000'.substring(0, '0000'.length - v.length) + v;
  }

}
