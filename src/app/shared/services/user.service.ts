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
}
