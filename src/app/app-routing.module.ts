import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LandingPageComponent} from './components/landing-page/landing-page.component';
import {CarSelectionComponent} from './components/car-selection/car-selection.component';
import {LoginPageComponent} from './components/login-page/login-page.component';

const routes: Routes = [
  {path: '', component: LandingPageComponent},
  {path: 'cars', component: CarSelectionComponent},
  {path: 'login', component: LoginPageComponent},
  {path: '**', redirectTo: '', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
