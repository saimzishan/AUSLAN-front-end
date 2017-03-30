import { SpacerPipe } from './spacer.pipe';

describe('SpacerPipe', () => {
  const pipe = new SpacerPipe();

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('transforms OrganisationalRepresentative to Organisational Representative', () => {
    let r = 'OrganisationalRepresentative';
    let newVal = pipe.transform(r);
    expect(newVal).toEqual('Organisational Representative');
  });

});
