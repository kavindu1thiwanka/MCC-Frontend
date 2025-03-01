import { Component, OnInit } from '@angular/core';
import { DriverService } from '../../shared/services/driver.service';
import {AppConstant} from '../../shared/utils/app-constant';

@Component({
  selector: 'app-driver-dashboard',
  standalone: false,
  templateUrl: './driver-dashboard.component.html',
  styleUrls: ['./driver-dashboard.component.scss'],
})
export class DriverDashboardComponent implements OnInit {
  driverName = '';
  isOnline: boolean = false;
  activeSection: string = 'dashboard';

  earnings = {
    daily: 0,
    weekly: 0,
    monthly: 0,
  };

  upcomingRides = [];
  rideHistory = [];

  displayedColumns: string[] = ['reservationId', 'pickup', 'dropoff', 'dateTime'];
  displayedColumnsHistory: string[] = ['reservationId', 'pickup', 'dropoff', 'dateTime', 'status'];

  constructor(private driverService: DriverService) {}

  ngOnInit(): void {
    this.loadDriverDetails();
  }

  loadDriverDetails() {
    this.driverService.getDashboardDetails().then((res) => {
      this.driverName = localStorage.getItem(AppConstant.NAME) || 'Driver Name';
      this.earnings = (res?.body as any).earnings;
      this.upcomingRides = (res?.body as any).upcomingRides;
    });
  }

  toggleStatus() {
    this.isOnline = !this.isOnline;
    this.driverService.updateOnlineStatus(this.isOnline).then(res => {
      // Error
    }).catch(e => {

    });
  }

  setActiveSection(section: string) {
    this.activeSection = section;
  }
}
