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
  notCustomer: boolean = false;

  constructor(private location: Location) {}

  ngOnInit(): void {
    this.userLoggedIn = localStorage.getItem(AppConstant.REFRESH_TOKEN) != null && localStorage.getItem(AppConstant.ACCESS_TOKEN) != null;
    this.notCustomer = localStorage.getItem(AppConstant.IDENTIFIER) === AppConstant.IDENTIFIER_ROLE_DRIVER || localStorage.getItem(AppConstant.IDENTIFIER) === AppConstant.IDENTIFIER_ROLE_ADMIN;
  }

  goBack(): void {
    this.location.back();
  }

  closeManageBookings() {
    this.showBookingsDetails = false;
  }

    protected readonly AppConstant = AppConstant;
}
