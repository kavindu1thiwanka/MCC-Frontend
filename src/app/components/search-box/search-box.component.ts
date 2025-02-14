import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LocationService } from '../../shared/services/location.service';

@Component({
  selector: 'app-search-box',
  standalone: false,
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss']
})
export class SearchBoxComponent implements OnInit {

  searchForm: FormGroup;
  differentReturnLocation: boolean = false;
  selectedVehicleType: string = 'car';
  isCollapsed: boolean = false;
  pickupSuggestions: any[] = [];
  returnSuggestions: any[] = [];

  constructor(private fb: FormBuilder, private router: Router, private locationService: LocationService) {
    this.searchForm = this.fb.group({
      vehicleType: ['car'],
      pickupLocation: ['', Validators.required],
      returnLocation: [''],
      pickupDate: [this.getCurrentDate(), Validators.required],
      returnDate: [this.getCurrentDate(), Validators.required]
    });
  }

  ngOnInit(): void {}

  getCurrentDate(): string {
    return new Date().toISOString().split('Z')[0];
  }

  toggleReturnLocation(): void {
    this.differentReturnLocation = !this.differentReturnLocation;

    const returnLocationControl = this.searchForm.get('returnLocation');

    if (this.differentReturnLocation) {
      returnLocationControl?.setValidators(Validators.required);
    } else {
      returnLocationControl?.clearValidators();
    }

    returnLocationControl?.updateValueAndValidity();
  }

  setVehicleType(type: string): void {
    this.selectedVehicleType = type;
    this.searchForm.patchValue({ vehicleType: type });
  }

  redirectToCarSelection(): void {
    if (this.searchForm.valid) {
      this.router.navigate(['/cars'], {
        queryParams: {
          pickup: this.searchForm.value.pickupLocation,
          return: this.searchForm.value.returnLocation,
          pickupDate: this.searchForm.value.pickupDate,
          returnDate: this.searchForm.value.returnDate
        }
      });
    } else {
      this.searchForm.markAllAsTouched();
    }
  }

  onPickupLocationChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const query = input.value;

    if (query) {
      this.locationService.getLocationSuggestions(query).subscribe(
        (data) => {
          this.pickupSuggestions = data;
        },
        (error) => {
          console.error('Error fetching location suggestions', error);
        }
      );
    } else {
      this.pickupSuggestions = [];
    }
  }

  onReturnLocationChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const query = input.value;

    if (query) {
      this.locationService.getLocationSuggestions(query).subscribe(
        (data) => {
          this.returnSuggestions = data;
        },
        (error) => {
          console.error('Error fetching location suggestions', error);
        }
      );
    } else {
      this.returnSuggestions = [];
    }
  }

  selectPickupSuggestion(suggestion: any): void {
    this.searchForm.patchValue({ pickupLocation: suggestion.description });
    this.pickupSuggestions = [];
  }

  selectReturnSuggestion(suggestion: any): void {
    this.searchForm.patchValue({ returnLocation: suggestion.description });
    this.returnSuggestions = [];
  }
}
