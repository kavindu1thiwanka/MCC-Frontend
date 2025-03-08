import {Component, EventEmitter, Input, Output} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-manage-booking-modal',
  standalone: false,
  templateUrl: './manage-booking-modal.component.html',
  styleUrls: ['./manage-booking-modal.component.scss']
})
export class ManageBookingModalComponent {
  @Input() display = false;
  @Output() close = new EventEmitter<void>();

  isEditable = false;
  reservationId: string = '';
  bookingForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.bookingForm = this.fb.group({
      customerName: [''],
      pickupLocation: [''],
      dropOffLocation: [''],
      dateTime: ['']
    });
  }

  // Open Modal
  openModal() {
    this.display = true;
  }

  // Close Modal
  closeModal() {
    this.display = false;
    this.isEditable = false;
    this.reservationId = '';
    this.bookingForm.reset();
    this.close.emit();
  }

  // Search Reservation by ID
  searchReservation() {
    // Mock data fetching (Replace with API call)
    if (this.reservationId === '12345') {
      this.bookingForm.setValue({
        customerName: 'John Doe',
        pickupLocation: 'Central Park',
        dropOffLocation: 'Times Square',
        dateTime: '2025-03-10T14:30'
      });
    } else {
      alert('Reservation not found!');
    }
  }

  // Toggle Edit Mode
  toggleEditMode() {
    this.isEditable = !this.isEditable;
  }
}
