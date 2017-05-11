export enum BOOKING_NATURE {

  HumanServices = <any>'Human Services',
  Social = <any>'Social / Private',
  Counselling = <any>'Counselling',
  Court = <any>'Court',
  Education = <any>'Education',
  Employment = <any>'Employment',
  Legal = <any>'Legal / Tribunal',
  Medical = <any>'Medical',
  Mental = <any>'Mental Health',
  Police = <any>'Police',
  Conference = <any>'Conference / Public Forum',
  Theatre = <any>'Theatre',
  Media = <any>'Media',
  Other = <any>'Other',
  None = <any>'None'
}

export class BA {
  static DISSCUSSION_ITEM = {};

  constructor() {
    BA.DISSCUSSION_ITEM[BOOKING_NATURE.HumanServices] =
      ['Centrelink', 'Child protection', 'Crisis/Emergency', 'Home Visit', 'Housing', 'Other'];
    BA.DISSCUSSION_ITEM[BOOKING_NATURE.Social] =
      ['Centrelink', 'Child protection', 'Crisis/Emergency', 'Home Visit', 'Housing', 'Other'];
    BA.DISSCUSSION_ITEM[BOOKING_NATURE.Counselling] =
      ['Centrelink', 'Child protection', 'Crisis/Emergency', 'Home Visit', 'Housing', 'Other'];
    BA.DISSCUSSION_ITEM[BOOKING_NATURE.Court] =
      ['Centrelink', 'Child protection', 'Crisis/Emergency', 'Home Visit', 'Housing', 'Other'];
    BA.DISSCUSSION_ITEM[BOOKING_NATURE.Education] =
      ['Centrelink', 'Child protection', 'Crisis/Emergency', 'Home Visit', 'Housing', 'Other'];
    BA.DISSCUSSION_ITEM[BOOKING_NATURE.Employment] =
      ['Centrelink', 'Child protection', 'Crisis/Emergency', 'Home Visit', 'Housing', 'Other'];
    BA.DISSCUSSION_ITEM[BOOKING_NATURE.Legal] =
      ['Centrelink', 'Child protection', 'Crisis/Emergency', 'Home Visit', 'Housing', 'Other'];
    BA.DISSCUSSION_ITEM[BOOKING_NATURE.Medical] =
      ['Centrelink', 'Child protection', 'Crisis/Emergency', 'Home Visit', 'Housing', 'Other'];
    BA.DISSCUSSION_ITEM[BOOKING_NATURE.Mental] =
      ['Centrelink', 'Child protection', 'Crisis/Emergency', 'Home Visit', 'Housing', 'Other'];
    BA.DISSCUSSION_ITEM[BOOKING_NATURE.Police] =
      ['Centrelink', 'Child protection', 'Crisis/Emergency', 'Home Visit', 'Housing', 'Other'];
    BA.DISSCUSSION_ITEM[BOOKING_NATURE.Conference] =
      ['Centrelink', 'Child protection', 'Crisis/Emergency', 'Home Visit', 'Housing', 'Other'];
    BA.DISSCUSSION_ITEM[BOOKING_NATURE.Theatre] =
      ['Centrelink', 'Child protection', 'Crisis/Emergency', 'Home Visit', 'Housing', 'Other'];
    BA.DISSCUSSION_ITEM[BOOKING_NATURE.Media] =
      ['Centrelink', 'Child protection', 'Crisis/Emergency', 'Home Visit', 'Housing', 'Other'];
    BA.DISSCUSSION_ITEM[BOOKING_NATURE.Other] = []
  }
}
