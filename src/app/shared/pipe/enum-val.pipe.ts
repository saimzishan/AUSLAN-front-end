import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'enumVal'
})
export class EnumValPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let keys = [];
    for (let enumMember in value) {
      if (parseInt(enumMember, 10) >= 0) {
        keys.push({key: enumMember, value: value[enumMember]});
      }
    }
    return keys;  }

}
