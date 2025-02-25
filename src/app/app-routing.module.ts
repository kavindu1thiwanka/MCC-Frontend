import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LandingPageComponent} from './components/landing-page/landing-page.component';
import {CarSelectionComponent} from './components/car-selection/car-selection.component';
import {LoginComponent} from './components/login/login.component';
import {UserConfirmationComponent} from './components/user-confirmation/user-confirmation.component';
import {PaymentSuccessComponent} from './components/payment-success/payment-success.component';
import {PaymentCancelComponent} from './components/payment-cancel/payment-cancel.component';
import {ResetPasswordComponent} from './components/reset-password/reset-password.component';

const routes: Routes = [
  {path: '', component: LandingPageComponent},
  {path: 'vehicle-selection', component: CarSelectionComponent},
  {path: 'login', component: LoginComponent},
  {path: 'confirm-email', component: UserConfirmationComponent},
  { path: 'payment-success', component: PaymentSuccessComponent },
  { path: 'payment-cancel', component: PaymentCancelComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  {path: '**', redirectTo: '', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
