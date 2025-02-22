import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {ApiEndPoint} from '../utils/api-end-point';
import {AppConstant} from '../utils/app-constant';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(public httpClient: HttpClient) {
  }

  login(obj: any) {
    if (!obj.email) {
      obj.email = obj.username;
    }
    const authRequest = {username: obj.email, password: obj.password};
    return this.httpClient.post(ApiEndPoint.AUTH_V1 + '/login',
      authRequest,
      {observe: 'response', withCredentials: false}
    ).toPromise();
  }

  setUserDetails(userDetails: any) {
      localStorage.setItem(AppConstant.REFRESH_TOKEN, userDetails.refreshToken);
      localStorage.setItem(AppConstant.ACCESS_TOKEN, userDetails.accessToken);
      localStorage.setItem(AppConstant.NAME, userDetails.firstName + ' ' + userDetails.lastName);
      localStorage.setItem(AppConstant.IDENTIFIER, userDetails.identifier);
  }

  registerUser(user: any) {
    return this.httpClient.post(ApiEndPoint.USER_V1 + '/register',
      user,
      {observe: 'response', withCredentials: false}
    ).toPromise();
  }

  confirmUserEmail(uuid: any) {
    return this.httpClient.get(ApiEndPoint.USER_V1 + '/confirm?uuid=' + uuid,
      {observe: 'response', withCredentials: false}
    ).toPromise();
  }

  getReservationDetails() {
    return this.httpClient.get(ApiEndPoint.RESERVATION_V1 + '/get_reservation_details',
      {observe: 'response', withCredentials: true}
    ).toPromise();
  }

  logout(): void {
    localStorage.clear();
    location.reload();
  }

}
