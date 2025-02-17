import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-payment',
  standalone: false,

  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent {
  @Input() visible: boolean = false;
  @Input() carDetails: any = { image: '', name: '', price: 0, duration: 0 };

  cardNumber: string = '';
  expiry: string = '';
  cvv: string = '';

  processPayment() {
    console.log("Processing payment for:", this.carDetails);
    this.visible = false;
  }
}
