import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ApiEndPoint} from '../utils/api-end-point';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private httpClient: HttpClient) {}

  generateReport(requestData: {}) {
    return this.httpClient.post(ApiEndPoint.REPORT_V1 + '/generate',
      requestData, {observe: 'response', withCredentials: true}
    ).toPromise();
  }
}
