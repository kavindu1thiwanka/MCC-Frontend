import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ApiEndPoint} from '../utils/api-end-point';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private httpClient: HttpClient) {
  }

  createCheckoutSessionAndMakeReservation(vehicle: any) {
    return this.httpClient.post<{ checkoutUrl: string }>(`${ApiEndPoint.RESERVATION_V1}/create_reservation`, vehicle, {withCredentials: true});
  }

  updateReservationDetails(trxId: number, status: any) {
    return this.httpClient.put(ApiEndPoint.RESERVATION_V1 + '/update_reservation_details',
      {observe: 'response', withCredentials: false, params: {trxId:trxId, paymentStatus: status}}
    ).toPromise();
  }
}
