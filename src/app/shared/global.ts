import { environment } from '../../environments/environment';


export class GLOBAL {
  public static API_ENDPOINT = (environment.production) ? 'http://localhost:8080/api/v1' : 'http://localhost:8080/api/v1' ;
  public static USER_API = GLOBAL.API_ENDPOINT + '/user/' ;
  public static TITLE = 'Auslan ApBooking System' ;
  public static VERSION = '0.0.1' ; //This should be broken into MAJOR and MINOR version?  

}
