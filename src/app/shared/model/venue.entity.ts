import {PARKING} from './parking.enum';

export class Address {

  public addressline_1: string;
  public addressline_2: string;
  public addressline_3: string;
  public suburb: string;
  public state: string;
  public post_code: number;

}

export class Venue extends Address {
  expected_attendance: number;
  start_time: Date;
  end_time: Date;
  date: Date;
  parking_type: PARKING;
}
