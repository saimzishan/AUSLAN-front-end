/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { EnumValPipe } from './enum-val.pipe';
import {ROLE} from '../model/role.enum';

describe('EnumValPipe', () => {
  let pipe = new EnumValPipe();

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('transforms enum into dict, as far as its base 10 >= 0', () => {
    let r = ROLE;
    let keys = pipe.transform(r);

    expect(keys[r.Organisation].key).toEqual([r.Organisation].toString());
    expect(r[r.Organisation]).toEqual(keys[r.Organisation].value);
  });

  it('do not transforms enum into dict, as far as its base 10 < 0', () => {
    enum BAD_ENUM { ANYKEY1= -1 , ANYKEY2= -2};
    let r = BAD_ENUM;
    let keys = pipe.transform(r);
    expect(keys.length).toEqual(0);
  });


});
