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

  updateReservationStatus(reservationId: number, status: any) {
    return this.httpClient.put(ApiEndPoint.RESERVATION_V1 + '/update_reservation_status',{},
      {observe: 'response', withCredentials: true, params: {reservationId: reservationId, status: status}}
    ).toPromise();
  }

  getActiveRides() {
    return this.httpClient.get(ApiEndPoint.RESERVATION_V1 + '/get_active_reservation_details',
      {observe: 'response', withCredentials: true}
    ).toPromise();
  }

  getRidesHistory() {
    return this.httpClient.get(ApiEndPoint.RESERVATION_V1 + '/get_reservation_history_details',
      {observe: 'response', withCredentials: true}
    ).toPromise();
  }

  getReservationById(reservationId: number) {
    return this.httpClient.get(ApiEndPoint.RESERVATION_V1 + '/get_reservation_details_by_id',
      {observe: 'response', withCredentials: true, params: {reservationId: reservationId}}
    ).toPromise();
  }

  changeOnTripStatus(reservationId: number) {
    return this.httpClient.put(ApiEndPoint.RESERVATION_V1 + '/change_on_trip_status',{},
      {observe: 'response', withCredentials: true, params: {reservationId: reservationId}}
    ).toPromise();
  }
}
