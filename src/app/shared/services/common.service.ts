import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {ApiEndPoint} from '../utils/api-end-point';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(public httpClient: HttpClient, public router: Router) {
  }

  login(obj: any) {
    const authRequest = {username: obj.email, password: obj.password};
    return this.httpClient.post(ApiEndPoint.AUTH_V1 + '/login',
      authRequest,
      {observe: 'response', withCredentials: false}
    ).toPromise();
  }

  registerUser(user: any) {
    return this.httpClient.post(ApiEndPoint.USER_V1 + '/register',
      user,
      {observe: 'response', withCredentials: false}
    ).toPromise();
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['#']);
  }

}
