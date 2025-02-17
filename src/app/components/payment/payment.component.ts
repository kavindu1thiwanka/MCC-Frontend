import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-payment',
  standalone: false,

  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss'
})
export class PaymentComponent {

  @Input() visible: boolean = false;
  @Input() carDetails: any = {};

}
