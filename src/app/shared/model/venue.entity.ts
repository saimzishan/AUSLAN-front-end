import {PARKING} from './parking.enum';

export class Address {
  public id: number;
  public title: string;
  public street_number = '';
  public unit_number = '';
  public street_name = '';
  public suburb = '';
  public state = '';
  public post_code = 0;

  public isValid(): boolean {
      return [this.street_number, this.street_name, this.suburb, this.state, this.post_code].every((ele: any) => ele);
  }
}

export class Venue extends Address {
  expected_attendance = 0;
  start_time_iso: string;
  end_time_iso: string;
  parking_type: PARKING;
}
