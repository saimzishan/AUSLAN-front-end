import { environment } from '../../environments/environment';


export class GLOBAL {
  public static MOCK_SERVER_PORT = 3000;
  public static LOG_LEVEL = 'INFO';
  public static API_ENDPOINT = (environment.production) ? 'http://<prod_ip>:8080/api/v1' :
  `http://127.0.0.1:${GLOBAL.MOCK_SERVER_PORT}/api/v1` ;
  public static USER_API = GLOBAL.API_ENDPOINT + '/users' ;
  public static USER_API_DEPRECIATED = 'http://localhost:8080/api/v1/users/' ;

  public static BOOKING_API = GLOBAL.API_ENDPOINT + '/bookings' ;
  public static TITLE = 'Auslan ApBooking System' ;
  public static VERSION = '0.0.1' ; // This should be broken into MAJOR and MINOR version?

}
