import { MomentTZDatePipe } from './moment-tzdate.pipe';

describe('MomentTZDatePipe', () => {
  it('create an instance', () => {
    const pipe = new MomentTZDatePipe();
    expect(pipe).toBeTruthy();
  });
});
