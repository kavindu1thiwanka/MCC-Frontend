import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  private apiUrl = '/api/reports'; // Adjust the URL as per your backend API

  constructor(private http: HttpClient) {}

  getReport(type: string, format: 'pdf' | 'excel'): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/${type}`, { responseType: 'blob' });
  }

  getReportData(type: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/data/${type}`);
  }
}
