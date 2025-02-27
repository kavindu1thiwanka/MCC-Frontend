import {Component, Input, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {AppConstant} from '../../shared/utils/app-constant';

@Component({
  selector: 'app-header',
  standalone: false,

  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {

  @Input() public isLandingPage = true;
  userLoggedIn = false;
  showBookingsDetails: boolean = false;
  inDriverDashboard: boolean = false;

  constructor(private location: Location) {}

  ngOnInit(): void {
    this.userLoggedIn = localStorage.getItem(AppConstant.REFRESH_TOKEN) != null && localStorage.getItem(AppConstant.ACCESS_TOKEN) != null;
    this.inDriverDashboard = localStorage.getItem(AppConstant.IDENTIFIER) === AppConstant.IDENTIFIER_ROLE_DRIVER;
  }

  goBack(): void {
    this.location.back();
  }

  closeManageBookings() {
    this.showBookingsDetails = false;
  }

    protected readonly AppConstant = AppConstant;
}
