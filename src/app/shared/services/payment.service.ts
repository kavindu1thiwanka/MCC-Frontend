import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ApiEndPoint} from '../utils/api-end-point';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private httpClient: HttpClient) {
  }

  createCheckoutSession(amount: number) {
    return this.httpClient.post<{ checkoutUrl: string }>(`${ApiEndPoint.PAYMENTS}/create-payment-session`, {amount}, {withCredentials: true});
  }
}
