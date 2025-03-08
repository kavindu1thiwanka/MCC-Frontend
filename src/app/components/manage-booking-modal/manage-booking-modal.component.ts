import {Component, EventEmitter, Input, Output} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {ReservationService} from '../../shared/services/reservation.service';

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
  reservationId: number = 0;
  bookingForm: FormGroup;

  constructor(private fb: FormBuilder, private reservationService: ReservationService) {
    this.bookingForm = this.fb.group({
      id: [''],
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
    this.reservationId = 0;
    this.bookingForm.reset();
    this.close.emit();
  }

  // Search Reservation by ID
  async searchReservation() {
    if (!this.reservationId || this.reservationId === 0) alert('Please enter a valid reservation ID.');
    await this.reservationService.getReservationById(this.reservationId).then(res => {
      if (res?.status === 200 && res.body) this.bookingForm.patchValue(res.body);
    }).catch(e => {

    });
  }

  // Toggle Edit Mode
  toggleEditMode() {
    this.isEditable = !this.isEditable;
  }
}
