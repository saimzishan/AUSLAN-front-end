import { ShortTimePipe } from './short-time.pipe';

describe('ShortTimePipe', () => {
  const pipe = new ShortTimePipe();

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('transforms 2018-02-25T22:00:00Z to 08:00 AM', () => {
    let r = '2018-02-25T22:00:00Z';
    let newVal = pipe.transform(r, 'QLD' , '3025');
    expect(newVal).toEqual('08:00 AM');
  });

});
