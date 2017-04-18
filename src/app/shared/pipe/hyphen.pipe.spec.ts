import { HyphenPipe } from './hyphen.pipe';

describe('HyphenPipe', () => {
  const pipe = new HyphenPipe();

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('transforms OrganisationalRepresentative to organisational-representative', () => {
    let r = 'OrganisationalRepresentative';
    let newVal = pipe.transform(r);
    expect(newVal).toEqual('organisational-representative');
  });
  it('transforms BookingOfficer to booking-officer', () => {
    let r = 'BookingOfficer';
    let newVal = pipe.transform(r);
    expect(newVal).toEqual('booking-officer');
  });
  it('transforms Individual Client to individual-client', () => {
    let r = 'Individual Client';
    let newVal = pipe.transform(r);
    expect(newVal).toEqual('individual-client');
  });
  it('transforms Administrator to administrator', () => {
    let r = 'Administrator';
    let newVal = pipe.transform(r);
    expect(newVal).toEqual('administrator');
  });
});
