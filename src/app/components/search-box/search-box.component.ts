import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import {LocationService} from '../../shared/services/location.service';

@Component({
  selector: 'app-search-box',
  standalone: false,
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss']
})
export class SearchBoxComponent implements OnInit {

  searchForm: FormGroup;
  showReturnLocation: boolean = false;
  selectedVehicleType: string = 'car';
  isCollapsed: boolean = false;
  pickupSuggestions: any[] = [];
  returnSuggestions: any[] = [];

  constructor(private fb: FormBuilder, private router: Router, private locationService: LocationService) {
    this.searchForm = this.fb.group({
      vehicleType: ['car'],
      pickupLocation: [''],
      returnLocation: [''],
      pickupDate: [this.getCurrentDate()],
      returnDate: [this.getCurrentDate()]
    });
  }

  ngOnInit(): void {}

  getCurrentDate(): string {
    return new Date().toISOString().split('Z')[0];
  }

  toggleReturnLocation(): void {
    this.showReturnLocation = !this.showReturnLocation;
  }

  setVehicleType(type: string): void {
    this.selectedVehicleType = type;
    this.searchForm.patchValue({vehicleType: type});
  }

  redirectToCarSelection() {
    this.router.navigate(['/cars'], {
      queryParams: {
        pickup: this.searchForm.value.pickupLocation,
        return: this.searchForm.value.returnLocation,
        pickupDate: this.searchForm.value.pickupDate,
        returnDate: this.searchForm.value.returnDate
      }
    });
  }

  onPickupLocationChange(event: Event): void {
    const input = event.target as HTMLInputElement;  // Cast to HTMLInputElement
    const query = input.value;  // Now you can access `value` safely

    if (query) {
      this.locationService.getLocationSuggestions(query).subscribe(
        (data) => {
          this.pickupSuggestions = data;  // Adjust according to API response structure
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
    const input = event.target as HTMLInputElement;  // Cast to HTMLInputElement
    const query = input.value;  // Now you can access `value` safely

    if (query) {
      this.locationService.getLocationSuggestions(query).subscribe(
        (data) => {
          this.returnSuggestions = data;  // Adjust according to API response structure
        },
        (error) => {
          console.error('Error fetching location suggestions', error);
        }
      );
    } else {
      this.returnSuggestions = [];
    }
  }

}
