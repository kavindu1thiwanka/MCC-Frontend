import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

// Material UI Imports
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';

// Component Imports
import {AppComponent} from './app.component';
import {HeaderComponent} from './components/header/header.component';
import {LandingPageComponent} from './components/landing-page/landing-page.component';
import {NgOptimizedImage} from "@angular/common";
import {SearchBoxComponent} from './components/search-box/search-box.component';
import {FooterComponent} from './components/footer/footer.component';
import {CarSelectionComponent} from './components/car-selection/car-selection.component';
import {RouterModule} from '@angular/router';
import {AppRoutingModule} from './app-routing.module';
import {LoginComponent} from './components/login/login.component';
import {MatCard, MatCardContent, MatCardTitle} from '@angular/material/card';
import {ButtonDirective} from "primeng/button";
import {HttpClientModule} from '@angular/common/http';
import { UserConfirmationComponent } from './components/user-confirmation/user-confirmation.component';
import { ProfileDropdownComponent } from './components/profile-dropdown/profile-dropdown.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LandingPageComponent,
    SearchBoxComponent,
    FooterComponent,
    CarSelectionComponent,
    LoginComponent,
    UserConfirmationComponent,
    ProfileDropdownComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    NgOptimizedImage,
    MatCard,
    MatCardTitle,
    MatCardContent,
    FormsModule,
    ButtonDirective,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
