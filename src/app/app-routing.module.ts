import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LandingPageComponent} from './components/landing-page/landing-page.component';
import {CarSelectionComponent} from './components/car-selection/car-selection.component';
import {LoginComponent} from './components/login/login.component';

const routes: Routes = [
  {path: '', component: LandingPageComponent},
  {path: 'cars', component: CarSelectionComponent},
  {path: 'login', component: LoginComponent},
  {path: '**', redirectTo: '', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
