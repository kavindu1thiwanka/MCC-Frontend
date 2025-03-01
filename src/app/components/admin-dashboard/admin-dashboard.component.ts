import {Component, OnInit} from '@angular/core';
import {AdminService} from '../../shared/services/admin.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: false,

  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent implements OnInit {
  activeSection: string = 'dashboard';

  stats = {
    totalUsers: 0,
    totalDrivers: 0,
    activeRides: 0,
  };

  users = [];
  userColumns: string[] = ['name', 'email', 'role'];

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData() {
    // this.adminService.getDashboardStats().then((data) => {
    //   this.stats = data.stats;
    //   this.users = data.users;
    // });
  }

  setActiveSection(section: string) {
    this.activeSection = section;
  }
}
