import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AppConstant} from '../../shared/utils/app-constant';
import {PaymentService} from '../../shared/services/payment.service';

@Component({
  selector: 'app-payment-cancel',
  standalone: false,

  templateUrl: './payment-cancel.component.html',
  styleUrl: './payment-cancel.component.scss'
})
export class PaymentCancelComponent implements OnInit {

  trxId: number | null = null;

  constructor(private route: ActivatedRoute, private paymentService: PaymentService) {
  }

  ngOnInit(): void {
    this.trxId = this.route.snapshot.queryParamMap.get('id') ? Number(this.route.snapshot.queryParamMap.get('id')) : null;
    this.updateReservationDetails();
  }

  updateReservationDetails() {
    if (!this.trxId) return;
    this.paymentService.updateReservationDetails(this.trxId, AppConstant.STATUS_FAILED).then(() => {}).catch(() => {});
  }
}
