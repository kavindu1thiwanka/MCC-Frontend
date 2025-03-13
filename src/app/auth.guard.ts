import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import {AppConstant} from './shared/utils/app-constant';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const accessToken = localStorage.getItem(AppConstant.ACCESS_TOKEN);
    const refreshToken = localStorage.getItem(AppConstant.REFRESH_TOKEN);
    const identity = localStorage.getItem(AppConstant.IDENTIFIER);
    if (accessToken && refreshToken && identity) {
      return true;
    } else {
      this.router.navigate(['#']);
      return false;
    }
  }
}
