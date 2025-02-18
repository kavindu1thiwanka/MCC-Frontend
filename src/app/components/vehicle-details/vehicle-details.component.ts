import {Component, Input} from '@angular/core';
import {PaymentService} from '../../shared/services/payment.service';

@Component({
  selector: 'app-vehicle-details',
  standalone: false,

  templateUrl: './vehicle-details.component.html',
  styleUrl: './vehicle-details.component.scss'
})
export class VehicleDetailsComponent {

  @Input() visible: boolean = false;
  @Input() vehicle: any = { image: '', name: '', price: 0, duration: 0 };

  constructor(private paymentService: PaymentService) {
  }

  checkout() {
    this.paymentService.createCheckoutSession(1).subscribe(({ checkoutUrl }) => {
      window.location.href = checkoutUrl;
    });
  }
}
