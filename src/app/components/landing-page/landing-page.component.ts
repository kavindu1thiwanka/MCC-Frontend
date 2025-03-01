import {Component, OnInit} from '@angular/core';
import {AppConstant} from '../../shared/utils/app-constant';

@Component({
  selector: 'app-landing-page',
  standalone: false,
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {
  userLoggedIn = false;
  adminLoggedIn = false;

  ngOnInit(): void {
    this.userLoggedIn = localStorage.getItem(AppConstant.IDENTIFIER) ? localStorage.getItem(AppConstant.IDENTIFIER) === AppConstant.IDENTIFIER_ROLE_CUSTOMER : true;
    this.adminLoggedIn = localStorage.getItem(AppConstant.IDENTIFIER) === AppConstant.IDENTIFIER_ROLE_ADMIN;
  }
}
