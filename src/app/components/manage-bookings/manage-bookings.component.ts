import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CommonService } from '../../shared/services/common.service';

@Component({
  selector: 'app-manage-bookings',
  standalone: false,

  templateUrl: './manage-bookings.component.html',
  styleUrls: ['./manage-bookings.component.scss']
})
export class ManageBookingsComponent implements OnChanges {
  @Input() display: boolean = false;
  @Output() close = new EventEmitter<void>();
  reservations: any = [];

  constructor(private commonService: CommonService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['display'] && this.display) {
      this.getReservations();
    }
  }

  getReservations() {
    this.commonService.getReservationDetails().then(res => {
      if (res?.status === 200) {
        this.reservations = res.body;
      }
    }).catch(() => alert('Failed to fetch reservations.'));
  }

  closeModal() {
    this.reservations = [];
    this.display = false;
    this.close.emit();
  }

  editReservation(reservation: any) {
    alert(`Edit functionality for reservation ID: ${reservation.id}`);
  }

  cancelReservation(reservationId: string) {
    if (confirm('Are you sure you want to cancel this reservation?')) {
      alert(`Reservation with ID ${reservationId} canceled.`);
    }
  }
}
