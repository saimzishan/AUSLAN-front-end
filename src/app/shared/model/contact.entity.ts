import {Venue} from './venue.entity';

export class Contact {
  public id: number;
  public email: string;
  public first_name: string;
  public last_name: string;
  public phone_number: string;
  public mobile_number: string;
  public address: Venue;
  public photo_url = '';


}

export class DEAFContact extends Contact {
  public eaf;
  public ur_number;
  public ndis_id;
}

export class BookingInterpreter extends Contact {
  public id: number;
  public state: string;
}

