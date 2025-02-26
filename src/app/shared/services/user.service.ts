import { Injectable } from '@angular/core';
import {ApiEndPoint} from '../utils/api-end-point';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) {}

  getUserAddress() {
    return this.httpClient.get(ApiEndPoint.USER_V1 + '/get_user_address',
      {observe: 'response', withCredentials: true}).toPromise();
  }

  updateUserAddress(addressDetails: any) {
    return this.httpClient.put(ApiEndPoint.USER_V1 + '/update_user_address', addressDetails,
      {observe: 'response', withCredentials: true}).toPromise();
  }

  getLoggedInUserDetails() {
    return this.httpClient.get(ApiEndPoint.USER_V1 + '/get_logged_in_user_details',
      {observe: 'response', withCredentials: true}).toPromise();
  }
}
