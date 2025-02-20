import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ApiEndPoint} from '../utils/api-end-point';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private httpClient: HttpClient) {
  }

  createCheckoutSessionAndMakeReservation(amount: number) {
    return this.httpClient.post<{ checkoutUrl: string }>(`${ApiEndPoint.RESERVATION_V1}/create_reservation`, {amount}, {withCredentials: true});
  }
}
