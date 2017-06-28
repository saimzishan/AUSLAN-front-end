import {PARKING} from './parking.enum';

export class Address {

  public title: string;
  public street_number: string;
  public unit_number: string;
  public street_name: string;
  public suburb: string;
  public state: string;
  public post_code: number;

}

export class Venue extends Address {
  expected_attendance = 0;
  interpreter_attendance = 0;
  // start_time: number;
  // end_time: number;
  start_time_iso: string;
  end_time_iso: string;
  // start_date: number;
  parking_type: PARKING;
}
