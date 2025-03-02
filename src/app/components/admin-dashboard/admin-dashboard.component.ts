import {Component, OnInit} from '@angular/core';
import {AdminService} from '../../shared/services/admin.service';
import {isPlatformBrowser} from '@angular/common';
import {ChangeDetectorRef, inject, effect} from '@angular/core';

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

  // PrimeNG Chart Data
  lineChartData: any;
  lineChartOptions: any;

  pieChartData: any;
  pieChartOptions: any;

  constructor(private adminService: AdminService, private cd: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.loadDashboardData();
    this.setupCharts();
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

  setupCharts() {
    // Line Chart Data
    this.lineChartData = {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [
        {
          label: 'Completed Rides',
          data: [15, 25, 40, 30, 45, 60],
          borderColor: '#42A5F5',
          backgroundColor: 'rgba(66, 165, 245, 0.2)',
          fill: true
        },
        {
          label: 'Cancelled Rides',
          data: [5, 10, 8, 12, 7, 9],
          borderColor: '#FF6384',
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          fill: true
        }
      ]
    };

    this.lineChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top',
          labels: {
            color: '#ffffff'
          }
        }
      },
      scales: {
        x: {
          grid: {
            color: 'rgba(255, 255, 255, 0.1)'
          },
          ticks: {
            color: '#ffffff'
          }
        },
        y: {
          grid: {
            color: 'rgba(255, 255, 255, 0.1)'
          },
          ticks: {
            color: '#ffffff'
          }
        }
      }
    };

    // Pie Chart Data
    this.pieChartData = {
      labels: ['Online', 'Offline', 'On Trip'],
      datasets: [
        {
          data: [50, 30, 20],
          borderColor: 'rgba(79,79,79,0.7)',
          backgroundColor: [
            'rgb(0, 230, 118)',
            'rgb(255, 82, 82)',
            'rgb(255, 214, 0)'
          ]
        }
      ]
    };

    this.pieChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top',
          labels: {
            color: '#fff',
            usePointStyle: true,
            padding: 20,
          },
        }
      }
    };

    // Trigger change detection
    this.cd.markForCheck();
  }
}
