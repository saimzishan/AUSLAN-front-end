import { SpacerPipe } from './spacer.pipe';

describe('SpacerPipe', () => {
  const pipe = new SpacerPipe();

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('transforms OrganisationalRepresentative to Organisation Representative', () => {
    let r = 'OrganisationRepresentative';
    let newVal = pipe.transform(r);
    expect(newVal).toEqual('Organisation Representative');
  });

});
