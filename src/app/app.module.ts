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
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from '@angular/material/card';
import {Button, ButtonDirective} from "primeng/button";
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { UserConfirmationComponent } from './components/user-confirmation/user-confirmation.component';
import { ProfileDropdownComponent } from './components/profile-dropdown/profile-dropdown.component';
import {AuthInterceptor} from './shared/services/auth-interceptor.service';
import {Dialog, DialogModule} from 'primeng/dialog';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {providePrimeNG} from 'primeng/config';
import Aura from '@primeng/themes/aura';
import { PaymentSuccessComponent } from './components/payment-success/payment-success.component';
import { PaymentCancelComponent } from './components/payment-cancel/payment-cancel.component';
import { CardModule } from 'primeng/card';
import { VehicleDetailsComponent } from './components/vehicle-details/vehicle-details.component';
import { AddressModalComponent } from './components/address-modal/address-modal.component';
import { AuthModalComponent } from './components/auth-modal/auth-modal.component';
import { ManageBookingsComponent } from './components/manage-bookings/manage-bookings.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { DriverDashboardComponent } from './components/driver-dashboard/driver-dashboard.component';

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
    ProfileDropdownComponent,
    PaymentSuccessComponent,
    PaymentCancelComponent,
    VehicleDetailsComponent,
    AddressModalComponent,
    AuthModalComponent,
    ManageBookingsComponent,
    ResetPasswordComponent,
    UserProfileComponent,
    DriverDashboardComponent
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
        Button,
        Dialog,
        DialogModule,
        CardModule,
        MatCardHeader,
    ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: Aura,
        options: {
          darkModeSelector: 'none'
        }
      }
    })
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
