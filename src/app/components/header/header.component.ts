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

  constructor(private location: Location) {}

  ngOnInit(): void {
    this.userLoggedIn = localStorage.getItem(AppConstant.TOKEN) != null;
  }

  goBack(): void {
    this.location.back();
  }
}
