import {Injectable} from '@angular/core';
import {AppConstant} from '../utils/app-constant';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DriverService {

  constructor(private httpClient: HttpClient) {
  }

  getDriverDetails(): Promise<any> {
    return Promise.resolve({name: localStorage.getItem(AppConstant.NAME)});
  }

  getUpcomingRides(): Promise<any[]> {
    return Promise.resolve([
      {pickup: 'Location A', dropoff: 'Location B', time: '10:00 AM'},
      {pickup: 'Location C', dropoff: 'Location D', time: '12:30 PM'}
    ]);
  }

  getRideHistory(): Promise<any[]> {
    return Promise.resolve([
      {pickup: 'Location X', dropoff: 'Location Y'},
      {pickup: 'Location M', dropoff: 'Location N'}
    ]);
  }

  getEarnings(): Promise<any> {
    return Promise.resolve({daily: 120, weekly: 840, monthly: 3600});
  }

  getDriverInfo() {
    return this.httpClient.get('/get_logged_in_user_details',
      {observe: 'response', withCredentials: true}).toPromise();
  }
}
