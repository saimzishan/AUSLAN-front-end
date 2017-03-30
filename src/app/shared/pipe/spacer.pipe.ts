import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'spacer'
})
export class SpacerPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    		return value.replace(/([A-Z])/g, ' $1').trim();
  }

}
