import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private baseUrl = '/api/admin'; // Adjust this based on your backend API

  constructor(private http: HttpClient) {}

  // Get all users
  getUsers(): Observable<any> {
    return this.http.get(`${this.baseUrl}/users`);
  }

  // Get all drivers
  getDrivers(): Observable<any> {
    return this.http.get(`${this.baseUrl}/drivers`);
  }

  // Get all admins
  getAdmins(): Observable<any> {
    return this.http.get(`${this.baseUrl}/admins`);
  }

  // Get system reports
  getReports(): Observable<any> {
    return this.http.get(`${this.baseUrl}/reports`);
  }

  // Update admin settings
  updateSettings(settings: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/settings`, settings);
  }

  getDashboardStats(): Observable<any> {
    return this.http.get(`${this.baseUrl}/dashboard`);
  }
}
