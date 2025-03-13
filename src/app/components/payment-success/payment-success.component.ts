import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AppConstant} from '../../shared/utils/app-constant';
import {ReservationService} from '../../shared/services/reservation.service';

@Component({
  selector: 'app-payment-success',
  standalone: false,

  templateUrl: './payment-success.component.html',
  styleUrl: './payment-success.component.scss'
})
export class PaymentSuccessComponent implements OnInit {

  trxId: number | null = null;

  constructor(private route: ActivatedRoute, private reservationService: ReservationService) {
  }

  ngOnInit(): void {
    this.trxId = this.route.snapshot.queryParamMap.get('id') ? Number(this.route.snapshot.queryParamMap.get('id')) : null;
    this.updateReservationDetails();
  }

  updateReservationDetails() {
    if (!this.trxId) return;
    this.reservationService.updateReservationDetails(this.trxId, AppConstant.STATUS_TRANSACTION_COMPLETE).then(() => {}).catch(() => {});
  }
}
