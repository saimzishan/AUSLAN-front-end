import { PrettyIDPipe } from './pretty-id.pipe';

describe('PrettyIDPipe', () => {
  const pipe = new PrettyIDPipe();

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('transforms 1 to 0001', () => {
    let r = '1';
    let newVal = pipe.transform(r);
    expect(newVal).toEqual('0001');
  });

  it('transforms 10 to 0010', () => {
    let r = '10';
    let newVal = pipe.transform(r);
    expect(newVal).toEqual('0010');
  });


  it('transforms 100 to 0100', () => {
    let r = '100';
    let newVal = pipe.transform(r);
    expect(newVal).toEqual('0100');
  });


  it('transforms 1000 to 1000', () => {
    let r = '1000';
    let newVal = pipe.transform(r);
    expect(newVal).toEqual('1000');
  });



  it('transforms 10000 to 10000', () => {
    let r = '10000';
    let newVal = pipe.transform(r);
    expect(newVal).toEqual('10000');
  });
});
