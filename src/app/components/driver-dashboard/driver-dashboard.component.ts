import { Component, OnInit } from '@angular/core';
import { DriverService } from '../../shared/services/driver.service';

@Component({
  selector: 'app-driver-dashboard',
  standalone: false,
  templateUrl: './driver-dashboard.component.html',
  styleUrls: ['./driver-dashboard.component.scss'],
})
export class DriverDashboardComponent implements OnInit {
  driver: any = {};
  isOnline: boolean = false;
  activeSection: string = 'dashboard';

  earnings = {
    daily: 0,
    weekly: 0,
    monthly: 0,
  };

  upcomingRides = [];
  rideHistory = [];

  displayedColumns: string[] = ['pickup', 'dropoff', 'time'];
  displayedColumnsHistory: string[] = ['pickup', 'dropoff', 'status'];

  constructor(private driverService: DriverService) {}

  ngOnInit(): void {
    this.loadDriverDetails();
  }

  loadDriverDetails() {
    this.driverService.getDriverInfo().then((data) => {
      // this.driver = data;
      // this.earnings = data.earnings;
      // this.upcomingRides = data.upcomingRides;
      // this.rideHistory = data.rideHistory;
    });
  }

  toggleStatus() {
    this.isOnline = !this.isOnline;
  }

  setActiveSection(section: string) {
    this.activeSection = section;
  }
}
