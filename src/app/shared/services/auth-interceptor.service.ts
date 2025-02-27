import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse, HttpClient } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, switchMap, filter, take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AppConstant } from '../utils/app-constant';
import {ApiEndPoint} from '../utils/api-end-point';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

  constructor(private http: HttpClient, private router: Router) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const accessToken = localStorage.getItem(AppConstant.ACCESS_TOKEN);

    if (accessToken && request.withCredentials) {
      request = this.addTokenHeader(request, accessToken);
    }

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          return this.handle401Error(request, next);
        }
        return throwError(() => error);
      })
    );
  }

  private addTokenHeader(request: HttpRequest<any>, token: string): HttpRequest<any> {
    return request.clone({
      setHeaders: { Authorization: `Bearer ${token}` }
    });
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      const refreshToken = localStorage.getItem(AppConstant.REFRESH_TOKEN);

      if (refreshToken) {
        return this.http.post<any>(ApiEndPoint.AUTH_V1 + '/refresh', { refreshToken }).pipe(
          switchMap((response) => {
            const newAccessToken = response.accessToken;
            localStorage.setItem(AppConstant.ACCESS_TOKEN, newAccessToken);
            this.isRefreshing = false;
            this.refreshTokenSubject.next(newAccessToken);

            return next.handle(this.addTokenHeader(request, newAccessToken));
          }),
          catchError(() => {
            this.isRefreshing = false;
            this.logout();
            return throwError(() => new Error('Session expired. Please log in again.'));
          })
        );
      } else {
        this.logout();
      }
    }

    return this.refreshTokenSubject.pipe(
      filter(token => token !== null),
      take(1),
      switchMap(token => next.handle(this.addTokenHeader(request, token!)))
    );
  }

  private logout(): void {
    localStorage.removeItem(AppConstant.ACCESS_TOKEN);
    localStorage.removeItem(AppConstant.REFRESH_TOKEN);
    this.router.navigate(['#']);
  }
}
