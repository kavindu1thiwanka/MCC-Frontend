import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {ApiEndPoint} from '../utils/api-end-point';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private httpClient: HttpClient) {}

  getDashboardStats() {
    return this.httpClient.get(ApiEndPoint.ADMIN_V1 + '/load_admin_dashboard_details',
      {observe: 'response', withCredentials: true}).toPromise();
  }
}
