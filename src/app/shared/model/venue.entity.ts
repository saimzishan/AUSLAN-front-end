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
  expected_attendance = 0;
  start_time: number;
  end_time: number;
  start_date: number;
  parking_type: PARKING;
}
