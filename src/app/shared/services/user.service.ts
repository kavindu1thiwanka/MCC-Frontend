import {Injectable} from '@angular/core';
import {ApiEndPoint} from '../utils/api-end-point';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) {
  }

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

  updateUserProfile(values: any) {
    return this.httpClient.put(ApiEndPoint.USER_V1 + '/update_user', values,
      {observe: 'response', withCredentials: true}).toPromise();
  }

  getAllUsers() {
    return this.httpClient.get(ApiEndPoint.USER_V1 + '/get_all_users',
      {observe: 'response', withCredentials: true}).toPromise();
  }

  getAllAdmins() {
    return this.httpClient.get(ApiEndPoint.USER_V1 + '/get_all_admins',
      {observe: 'response', withCredentials: true}).toPromise();
  }

  getAllDrivers() {
    return this.httpClient.get(ApiEndPoint.USER_V1 + '/get_all_drivers',
      {observe: 'response', withCredentials: true}).toPromise();
  }

  updateUserStatus(id: number, status: string) {
    return this.httpClient.put(ApiEndPoint.USER_V1 + '/change_user_status', {},
      {observe: 'response', withCredentials: true, params: {userId: id, status: status}}).toPromise();
  }

  createUser(value: any) {
    return this.httpClient.post(ApiEndPoint.USER_V1 + '/create', value,
      {observe: 'response', withCredentials: true}).toPromise();
  }
}
