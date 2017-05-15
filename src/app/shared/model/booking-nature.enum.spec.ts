import {BA, BOOKING_NATURE} from './booking-nature.enum';

describe('BOOKING_NATURE', () => {

    it('all values should be either equal to keys or startsWith', () => {
      let vals = Object.keys(BOOKING_NATURE).filter(value => value === BOOKING_NATURE[value]
  || BOOKING_NATURE[value].startsWith(value));

    for (let key of vals) {
      let res = key === BOOKING_NATURE[key] || (BOOKING_NATURE[key]).startsWith(key);
      expect(res).toEqual(true);
    }
    });
});
