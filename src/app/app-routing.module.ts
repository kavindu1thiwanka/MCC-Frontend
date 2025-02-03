import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LandingPageComponent} from './components/landing-page/landing-page.component';
import {CarSelectionComponent} from './components/car-selection/car-selection.component';

const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'car-selection', component: CarSelectionComponent },
  {path: '**', redirectTo: '', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
