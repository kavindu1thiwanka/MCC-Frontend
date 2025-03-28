import {environment} from "./../../../environments/environment";

const API = environment.apiUrl;


export class ApiEndPoint {

  constructor() {
  }

  private static API_URL = API;
  // public static API_URL = 'http://' + window.location.hostname + ':8082/proxy';

  private static V1 = '/v1';
  private static AUTH = this.API_URL + '/auth';
  private static USER = this.API_URL + '/user';
  private static MENU = this.API_URL + '/menu';
  private static ROLE = this.API_URL + '/role';
  private static VEHICLE = this.API_URL + '/vehicle';
  public static PAYMENTS = this.API_URL + '/payments';
  private static RESERVATION = this.API_URL + '/res';
  private static DRIVER = this.API_URL + '/driver';
  private static ADMIN = this.API_URL + '/admin';
  private static REPORT = this.API_URL + '/report';

  public static AUTH_V1 = this.AUTH + this.V1;
  public static USER_V1 = this.USER + this.V1;
  public static MENU_V1 = this.MENU + this.V1;
  public static ROLE_V1 = this.ROLE + this.V1;
  public static VEHICLE_V1 = this.VEHICLE + this.V1;
  public static PAYMENTS_V1 = this.PAYMENTS + this.V1;
  public static RESERVATION_V1 = this.RESERVATION + this.V1;
  public static DRIVER_V1 = this.DRIVER + this.V1;
  public static ADMIN_V1 = this.ADMIN + this.V1;
  public static REPORT_V1 = this.REPORT + this.V1;
}
