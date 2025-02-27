import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DriverService {
  getDriverDetails(): Promise<any> {
    return Promise.resolve({ name: 'John Doe' });
  }

  getUpcomingRides(): Promise<any[]> {
    return Promise.resolve([
      { pickup: 'Location A', dropoff: 'Location B', time: '10:00 AM' },
      { pickup: 'Location C', dropoff: 'Location D', time: '12:30 PM' }
    ]);
  }

  getRideHistory(): Promise<any[]> {
    return Promise.resolve([
      { pickup: 'Location X', dropoff: 'Location Y' },
      { pickup: 'Location M', dropoff: 'Location N' }
    ]);
  }

  getEarnings(): Promise<any> {
    return Promise.resolve({ daily: 120, weekly: 840, monthly: 3600 });
  }
}
