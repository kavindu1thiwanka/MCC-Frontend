import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';

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

  constructor(private fb: FormBuilder, private router: Router) {
    this.searchForm = this.fb.group({
      vehicleType: ['car'],
      pickupLocation: [''],
      returnLocation: [''],
      pickupDate: [this.getCurrentDate()],
      returnDate: [this.getCurrentDate()]
    });
  }

  ngOnInit(): void {
  }

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
    console.log('Redirecting to car selection...');
    this.router.navigate(['/cars'], {
      queryParams: {
        pickup: this.searchForm.value.pickupLocation,
        return: this.searchForm.value.returnLocation,
        pickupDate: this.searchForm.value.pickupDate,
        pickupTime: this.searchForm.value.pickupTime,
        returnDate: this.searchForm.value.returnDate,
        returnTime: this.searchForm.value.returnTime
      }
    });
  }
}
