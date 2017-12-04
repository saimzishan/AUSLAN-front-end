export enum BOOKING_NATURE {
  Conference = <any>'Conference/Forum',
  Counselling = <any>'Counselling',
  Court = <any>'Court',
  Education = <any>'Education',
  Employment = <any>'Employment',
  Human = <any>'Human Services',
  Legal = <any>'Legal/Tribunal',
  Media = <any>'Media',
  Medical = <any>'Medical',
  Mental = <any>'Mental Health',
  Police = <any>'Police',
  Social = <any>'Social/Private',
  Theatre = <any>'Theatre',
  Other = <any>'Other',
  None = <any>'None'
}

export class BA {
  static DISSCUSSION_ITEM = {};

  public static loadItems() {
    BA.DISSCUSSION_ITEM[BOOKING_NATURE.Human] =
      ['Centrelink', 'Child protection', 'Crisis/Emergency', 'Home Visit', 'Housing', 'Other'].sort();
    BA.DISSCUSSION_ITEM[BOOKING_NATURE.Social] =
      ['Accountant', 'Baptism', 'Body Corporate Meeting', 'Church Service', 'Family Celebration',
          'Financial Advisor',
          'Funeral – Full Mass',
          'Funeral – Non Religious',
          'Funeral – Service',
          'Health and Lifestyle',
          'School Play',
          'Sports Club',
          'Wedding', 'Other'].sort();
    BA.DISSCUSSION_ITEM[BOOKING_NATURE.Counselling] =
      ['Family',
          'Financial',
          'Individual',
          'Marriage', 'Other'].sort();
    BA.DISSCUSSION_ITEM[BOOKING_NATURE.Court] =
      ['Children and Family Court - Mention',
          'Children and Family Court – Contested Hearing/DHS',
          'Children and Family Court – Intervention Order',
          'Children and Family Court – Mediation', 'Coroners - Inquest',
          'Coroners - Directions', 'County/Supreme – Directions',
          'County/Supreme – Trial',
          'DHS Order',
          'Magistrates - Contested Hearing',
          'Magistrates - Criminal',
          'Magistrates - Intervention Order',
          'Magistrates - Mention',
          'Mental Health Court', 'Other'].sort();
    BA.DISSCUSSION_ITEM[BOOKING_NATURE.Education] =
      ['Childcare',
          'Early Intervention',
          'Kindergarten',
          'Primary School – Graduation',
          'Primary School – Other',
          'Primary School – Parent Meeting/Information Session',
          'Primary School – Staff Meeting',
          'Secondary School - Graduation',
          'Secondary School – Other',
          'Secondary School – Parent Meeting/Information Session',
          'Secondary School – Staff Meeting',
          'TAFE - Graduation', 'TAFE – Practical',
          'TAFE – Theoretical', 'University - Graduation',
          'University – Deaf Lecturer',
          'University – Lecture',
          'University – Meeting',
          'University – Practical/Tutorial', 'Other'].sort();
    BA.DISSCUSSION_ITEM[BOOKING_NATURE.Employment] =
      ['Job Interview – Complex/Deaf Professional',
          'Job Interview – Entry Level',
          'Meeting - Board',
          'Meeting – 1:1',
          'Meeting – Coaching/Mentoring',
          'Meeting – Human Resources',
          'Meeting – Large Group (5 or more)',
          'Meeting at employment service / with employment consultant',
          'Training Session', 'Other'].sort();
    BA.DISSCUSSION_ITEM[BOOKING_NATURE.Legal] =
      ['Anti-discrimination',
          'Forensic Assessment',
          'Guardianship',
          'Mediation',
          'Meeting – Solicitor/Lawyer',
          'Prison Visit',
          'Tribunal',
          'Work Cover', 'Other'].sort();
    BA.DISSCUSSION_ITEM[BOOKING_NATURE.Medical] =
      ['Audiology',
          'Complimentary Medicine (Please specify in Notes)',
          'Dental', 'Dietician',
          'Emergency',
          'Family Planning',
          'GP',
          'Home Visit',
          'Hospital Clinics (Please specify in Notes)',
          'In-patient (Please specify in Notes)',
          'Medical Imaging'
          , 'Men\'s Health',
          'Oncology',
          'Optometrist',
          'Paediatric',
          'Palliative Care',
          'Physical Therapy (Please specify in Notes)',
          'Rehabilitation (Please specify in Notes)',
          'Sexual Health',
          'Specialist (Please specify in Notes)',
          'Speech Therapy',
          'Women’s Health', 'Other'];
    BA.DISSCUSSION_ITEM[BOOKING_NATURE.Mental] =
      ['Assessment',
          'Forensic Assessment',
          'Home Visit',
          'Medication Appointment',
          'Mental Health Review Board',
          'Ongoing Appointment (Please specify length in Notes)',
          'Psychiatry',
          'Psychology', 'Other'].sort();
    BA.DISSCUSSION_ITEM[BOOKING_NATURE.Police] =
      ['Arrest',
          'Interview – accused',
          'Interview – victim',
          'Statement – accused',
          'Statement – victim',
          'Warrant', 'Other'].sort();
    BA.DISSCUSSION_ITEM[BOOKING_NATURE.Conference] =
      [ 'Community consultation',
          'Conference (please specify in Notes)',
          'Creative arts / festival',
          'Expo', 'Information Session',
          'Rally/Protest', 'Other'].sort();
    BA.DISSCUSSION_ITEM[BOOKING_NATURE.Theatre] =
      ['Adults Only',
          'Comedy',
          'Community',
          'School',
          'Stage show', 'Other'].sort();
    BA.DISSCUSSION_ITEM[BOOKING_NATURE.Media] =
      ['Interview – Other',
          'Interview – Radio',
          'Interview – Television',
          'Media Conference', 'Other'].sort();
    BA.DISSCUSSION_ITEM[BOOKING_NATURE.Other] = ['Please specify in Notes'];
  }
}
