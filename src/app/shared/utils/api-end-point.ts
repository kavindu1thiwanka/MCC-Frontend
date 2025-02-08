import {environment} from "./../../../environments/environment";

const API = environment.apiUrl;


export class ApiEndPoint {

  constructor() {
  }

  public static API_URL = API;
  // public static API_URL = 'http://' + window.location.hostname + ':8082/proxy';

  public static V1 = '/v1';
  public static AUTH = '/auth';
  public static USER = '/user';
  public static MENU = '/menu';
  public static ROLE = '/role';

  public static AUTH_V1 = this.API_URL + this.AUTH + this.V1;
  public static USER_V1 = this.API_URL + this.USER + this.V1;
  public static MENU_V1 = this.API_URL + this.MENU + this.V1;
  public static ROLE_V1 = this.API_URL + this.ROLE + this.V1;
}
