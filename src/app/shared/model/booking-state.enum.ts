
export enum BOOKING_STATE {
  None= 0, Allocated= 5 , Requested= 1, In_progress= 4,
  Unable_to_service = 8, Cancelled_no_charge = 7, Service_completed = 6, Cancelled_chargeable = 9,
  Claimed = 10, Claimed_exported = 11, Cancelled_claimed = 12, Cancelled_claimed_exported = 13
}
