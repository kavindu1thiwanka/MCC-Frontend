import {Component, OnInit} from '@angular/core';
import {AppConstant} from '../../shared/utils/app-constant';
import {CommonService} from '../../shared/services/common.service';

@Component({
  selector: 'app-profile-dropdown',
  standalone: false,

  templateUrl: './profile-dropdown.component.html',
  styleUrl: './profile-dropdown.component.scss'
})
export class ProfileDropdownComponent implements OnInit {

  userFullName: string = '';

  constructor(private commonService: CommonService) {
  }

  ngOnInit(): void {
    this.userFullName = localStorage.getItem(AppConstant.NAME) || 'User Name';
  }

  logout() {
   this.commonService.logout();
  }
}
