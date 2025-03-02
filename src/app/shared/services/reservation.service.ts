import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ApiEndPoint} from '../utils/api-end-point';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor(private httpClient: HttpClient) {
  }

  createCheckoutSessionAndMakeReservation(reservationDetails: any) {
    return this.httpClient.post(ApiEndPoint.RESERVATION_V1 + '/create_reservation', reservationDetails,
      {observe: 'response', withCredentials: true}
    ).toPromise();
  }

  updateReservationDetails(trxId: number, status: any) {
    return this.httpClient.put(ApiEndPoint.RESERVATION_V1 + '/update_reservation_details',{},
      {observe: 'response', withCredentials: true, params: {trxId: trxId, paymentStatus: status}}
    ).toPromise();
  }
}
