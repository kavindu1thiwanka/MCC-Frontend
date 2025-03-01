import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../shared/services/admin.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: false,

  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  activeSection: string = 'dashboard';

  stats = {
    totalUsers: 0,
    totalDrivers: 0,
    activeRides: 0,
  };

  users = [];
  drivers = [];
  admins = [];

  userColumns: string[] = ['name', 'email', 'role'];
  driverColumns: string[] = ['name', 'email', 'role'];
  adminColumns: string[] = ['name', 'email', 'role'];

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData() {
    // Example API call (uncomment when integrating)
    // this.adminService.getDashboardStats().then((data) => {
    //   this.stats = data.stats;
    //   this.users = data.users;
    //   this.drivers = data.drivers;
    //   this.admins = data.admins;
    // });
  }

  setActiveSection(section: string) {
    this.activeSection = section;
  }
}
