import {Component, OnInit} from '@angular/core';
import {DriverService} from '../../shared/services/driver.service';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-driver-dashboard',
  standalone: false,

  templateUrl: './driver-dashboard.component.html',
  styleUrl: './driver-dashboard.component.scss'
})
export class DriverDashboardComponent implements OnInit {
  driver: any = {};
  upcomingRides: any[] = [];
  rideHistory: any[] = [];
  earnings: any = { daily: 0, weekly: 0, monthly: 0 };
  isOnline: boolean = false;

  constructor(private driverService: DriverService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadDriverData();
  }

  loadDriverData(): void {
    this.driverService.getDriverDetails().then(data => this.driver = data);
    this.driverService.getUpcomingRides().then(data => this.upcomingRides = data);
    this.driverService.getRideHistory().then(data => this.rideHistory = data);
    this.driverService.getEarnings().then(data => this.earnings = data);
  }

  toggleStatus(): void {
    this.isOnline = !this.isOnline;
  }
}
