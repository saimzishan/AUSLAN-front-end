import { RemoveSpacePipe } from './remove-space.pipe';

describe('RemoveSpacePipe', () => {
  const pipe = new RemoveSpacePipe();

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('transforms 0400 123 456 to 0400123456', () => {
    let r = '0400 123 456';
    let newVal = pipe.transform(r);
    expect(newVal).toEqual('0400123456');
  });

});
