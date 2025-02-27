import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DriverService } from '../../shared/services/driver.service';

@Component({
  selector: 'app-driver-dashboard',
  standalone: false,
  templateUrl: './driver-dashboard.component.html',
  styleUrls: ['./driver-dashboard.component.scss'],
})
export class DriverDashboardComponent implements OnInit {
  driver: any = {};
  upcomingRides: any[] = [];
  rideHistory: any[] = [];
  earnings = { daily: 0, weekly: 0, monthly: 0 };
  isOnline = false;

  displayedColumns = ['pickup', 'dropoff', 'time'];
  displayedColumnsHistory = ['pickup', 'dropoff', 'status'];

  constructor(private driverService: DriverService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadDriverData();
  }

  loadDriverData(): void {
    Promise.all([
      this.driverService.getDriverDetails().then((data) => (this.driver = data)),
      this.driverService.getUpcomingRides().then((data) => (this.upcomingRides = data)),
      this.driverService.getRideHistory().then((data) => (this.rideHistory = data)),
      this.driverService.getEarnings().then((data) => (this.earnings = data)),
    ]);
  }

  toggleStatus(): void {
    this.isOnline = !this.isOnline;
  }

  trackById(index: number, item: any): number {
    return item.id || index;
  }
}
