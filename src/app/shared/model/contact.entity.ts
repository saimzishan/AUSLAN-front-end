import {Venue} from './venue.entity';

export class Contact {

  public email: string;
  public name: string;
  public phone_number: string;
  public mobile_number: string;
  public address: Venue;

}

export class DEAFContact extends Contact {

  public eaf: number;

}
