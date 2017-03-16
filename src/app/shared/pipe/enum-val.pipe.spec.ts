/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { EnumValPipe } from './enum-val.pipe';
import {ROLE} from '../model/role.enum';

import {BOOKING_NATURE} from '../model/booking-nature.enum';
import {BOOKING_STATUS} from '../model/booking-status.enum';
import {PARKING} from '../model/parking.enum';

describe('EnumValPipe', () => {
  let pipe = new EnumValPipe();

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('transforms ROLE enum into dict, as far as its base 10 >= 0', () => {
    let r = ROLE;
    let keys = pipe.transform(r);

    expect(keys[r.Organisation].key).toEqual([r.Organisation].toString());
    expect(r[r.Organisation]).toEqual(keys[r.Organisation].value);
  });

  it('transforms PARKING enum into dict, as far as its base 10 >= 0', () => {
    let r = PARKING;
    let keys = pipe.transform(r);
    expect(keys[r.None].key).toEqual([r.None].toString());
  });

  it('transforms BOOKING_NATURE enum into dict, as far as its base 10 >= 0', () => {
    let r = BOOKING_NATURE;
    let keys = pipe.transform(r);

    expect(keys[r.Engagement].key).toEqual([r.Engagement].toString());
    expect(r[r.Engagement]).toEqual(keys[r.Engagement].value);
  });

  it('transforms enum into dict, as far as its base 10 >= 0', () => {
    let r = BOOKING_STATUS;
    let keys = pipe.transform(r);

    expect(keys[r.Ready_to_process].key).toEqual([r.Ready_to_process].toString());
    expect(r[r.Ready_to_process]).toEqual(keys[r.Ready_to_process].value);
  });

  it('do not transforms enum into dict, as far as its base 10 < 0', () => {
    enum BAD_ENUM { ANYKEY1= -1 , ANYKEY2= -2};
    let r = BAD_ENUM;
    let keys = pipe.transform(r);
    expect(keys.length).toEqual(0);
  });


});
