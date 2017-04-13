import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hyphen-case'
})
export class HyphenPipe implements PipeTransform {

  transform(value: any, args?: any): any {
        if ( value === undefined ){
          return value;
        }
    		let v = value.replace(/([A-Z])/g, ' $1').trim();
    		return v.replace(/\s+/g, '-').toLowerCase();
  }

}
