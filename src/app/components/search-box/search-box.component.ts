import {Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LocationService } from '../../shared/services/location.service';

declare var google: any;

@Component({
  selector: 'app-search-box',
  standalone: false,
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss']
})
export class SearchBoxComponent implements OnInit {

  @ViewChild('locationSuggestionsDropdown') locationSuggestionsDropdown!: ElementRef;

  searchForm: FormGroup;
  differentReturnLocation: boolean = false;
  selectedVehicleType: string = 'motorcycle';
  isCollapsed: boolean = false;
  pickupSuggestions: any[] = [];
  returnSuggestions: any[] = [];
  bookingType: string = 'reserve';

  constructor(private fb: FormBuilder, private router: Router, private locationService: LocationService, private eRef: ElementRef) {
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
    const date = new Date().toISOString().split('Z')[0].split(':');
    return date[0] + ':' + date[1];
  }

  toggleReturnLocation(): void {
    this.differentReturnLocation = !this.differentReturnLocation;
    const returnLocationControl = this.searchForm.get('returnLocation');

    if (this.differentReturnLocation) {
      returnLocationControl?.setValidators(Validators.required);
    } else {
      returnLocationControl?.clearValidators();
      returnLocationControl?.reset();
      this.returnSuggestions = [];
    }
    returnLocationControl?.updateValueAndValidity();
  }

  // Close dropdown when clicking outside
  @HostListener('document:click', ['$event'])
  clickOutside(event: Event) {
    const target = event.target as HTMLElement;
    if (!target.closest('.dropdown-suggestions') && !target.closest('.input-group')) {
      this.pickupSuggestions = [];
      this.returnSuggestions = [];
    }
  }

  // Close dropdown on Escape key press
  @HostListener('document:keydown.escape', ['$event'])
  onEscape(event: KeyboardEvent) {
    this.pickupSuggestions = [];
    this.returnSuggestions = [];
  }

  // Location Search Input Event Handlers
  onPickupLocationChange(event: any): void {
    const input = event.target as HTMLInputElement;
    const query = input.value;

    // Clear return suggestions when pickup dropdown is active
    this.returnSuggestions = [];

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

  onReturnLocationChange(event: any): void {
    const input = event.target as HTMLInputElement;
    const query = input.value;

    // Clear pickup suggestions when return dropdown is active
    this.pickupSuggestions = [];

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

  // Map and Location Handling
  openMap(locationType: 'pickup' | 'return'): void {
    let modal = document.createElement('div');
    modal.id = "mapModal";
    modal.innerHTML = `<div id="map" style="width: 100%; height: 90%;"></div>
                      <button id="closeMap">Close Map</button>`;
    modal.style.position = 'fixed';
    modal.style.top = '50%';
    modal.style.left = '50%';
    modal.style.transform = 'translate(-50%, -50%)';
    modal.style.width = '80%';
    modal.style.height = '80%';
    modal.style.backgroundColor = '#fff';
    modal.style.boxShadow = '0px 4px 10px rgba(0, 0, 0, 0.3)';
    modal.style.zIndex = '1000';
    modal.style.borderRadius = '8px';

    document.body.appendChild(modal);

    // Initialize Google Map
    const map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
      center: { lat: 6.927079, lng: 79.861244 },
      zoom: 14,
    });

    let marker = new google.maps.Marker({
      position: map.getCenter(),
      map: map,
      draggable: true,
    });

    let geocoder = new google.maps.Geocoder();

    google.maps.event.addListener(marker, "dragend", () => {
      let latLng = marker.getPosition();
      if (latLng) {
        geocoder.geocode({ location: latLng }, (results: any, status: any) => {
          if (status === "OK" && results[0]) {
            const selectedLocation = results[0].formatted_address;
            if (locationType === "pickup") {
              this.searchForm.patchValue({ pickupLocation: selectedLocation });
            } else {
              this.searchForm.patchValue({ returnLocation: selectedLocation });
            }
          }
        });
      }
    });

    document.getElementById("closeMap")?.addEventListener("click", () => {
      document.body.removeChild(modal);
    });
  }

  // Redirect to car selection page
  redirectToCarSelection(): void {
    if (this.searchForm.valid) {
      this.router.navigate(['/vehicle-selection'], {
        queryParams: {
          pickup: this.searchForm.value.pickupLocation,
          return: this.searchForm.value.returnLocation,
          pickupDate: this.searchForm.value.pickupDate,
          returnDate: this.searchForm.value.returnDate,
          category: this.selectedVehicleType,
          bookingType: this.bookingType
        }
      });
    } else {
      this.searchForm.markAllAsTouched();
    }
  }

  setVehicleType(vehicleType: string): void {
    this.selectedVehicleType = vehicleType;
    this.searchForm.patchValue({ vehicleType });
  }

  setBookingType(type: string): void {
    this.searchForm.reset();
    this.selectedVehicleType = 'motorcycle';
    this.bookingType = type;
  }
}
