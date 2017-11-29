import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'removeSpace'
})
export class RemoveSpacePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (value !== undefined) {
          return value.replace(/\s+/g, '').trim();
    }
  }

}
