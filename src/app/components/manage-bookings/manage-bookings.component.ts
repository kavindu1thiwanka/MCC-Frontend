import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CommonService } from '../../shared/services/common.service';
import {ReservationService} from '../../shared/services/reservation.service';
import {AppConstant} from '../../shared/utils/app-constant';

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

  constructor(private commonService: CommonService, private reservationService: ReservationService) {}

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

  cancelReservation(reservationId: number) {
    if (confirm('Are you sure you want to cancel this reservation?')) {
      this.reservationService.updateReservationStatus(reservationId, AppConstant.STATUS_RESERVATION_CANCELLED).then((res: any) => {
        if (res.status === 200) this.getReservations();
      }).catch(() => {});
    }
  }
}
