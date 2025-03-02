import {Component, OnInit} from '@angular/core';
import {AdminService} from '../../shared/services/admin.service';
import {isPlatformBrowser} from '@angular/common';
import {ChangeDetectorRef, inject, effect} from '@angular/core';
import {HttpResponse} from '@angular/common/http';
import {UserService} from '../../shared/services/user.service';

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

  userColumns: string[] = ['username', 'firstname', 'lastname', 'email', 'status', 'actions'];
  driverColumns: string[] = ['name', 'email', 'role'];
  adminColumns: string[] = ['name', 'email', 'role'];

  // PrimeNG Chart Data

  isPieChartDataAvailable = false;

  lineChartConfigData: any;
  lineChartOptions: any;

  pieChartConfigData: any;
  pieChartOptions: any;

  lineChartData = {
    labels: [],
    datasets: []
  };
  pieChartData = [];

  constructor(private adminService: AdminService, private cd: ChangeDetectorRef, private userService: UserService) {
  }

  ngOnInit(): void {
    this.loadDashboardData().then(() =>
      this.setupCharts()
    );
  }

  setActiveSection(section: string) {
    this.activeSection = section;

    if (section === 'dashboard') this.loadDashboardData().then(() => this.setupCharts());
    if (section === 'users') this.loadUserTableData();
  }

  async loadUserTableData() {
    await this.userService.getAllUsers().then(res => {
      if (res?.status === 200 && res.body) this.users = res.body as any;
    }).catch(e => {});
  }

  async loadDashboardData() {
    await this.adminService.getDashboardStats().then(res => {
      if (res?.status === 200 && res.body) {
        this.stats = (res.body as any).stats;
        this.lineChartData = (res.body as any).lineChartData;
        this.pieChartData = (res.body as any).pieChartData;
      }
    }).catch(e => {
    });
  }

  setupCharts() {

    this.isPieChartDataAvailable = this.pieChartData && this.pieChartData.length !== 0;

    // Line Chart Data
    this.lineChartConfigData = {
      labels: !this.lineChartData.labels || this.lineChartData.labels.length === 0 ? [] : this.lineChartData.labels,
      datasets: [
        {
          label: 'Completed Rides',
          data: this.lineChartData.datasets[0],
          borderColor: '#42A5F5',
          backgroundColor: 'rgba(66, 165, 245, 0.2)',
          fill: true
        },
        {
          label: 'Cancelled Rides',
          data: this.lineChartData.datasets[1],
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
    if (this.isPieChartDataAvailable) {
      this.pieChartConfigData = {
        labels: ['Online', 'Offline', 'On Trip'],
        datasets: [
          {
            data: this.pieChartData,
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
    }

    // Trigger change detection
    this.cd.markForCheck();
  }
}
