import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ApiEndPoint} from '../utils/api-end-point';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  constructor(public httpClient: HttpClient) { }

  getVehicleList(commonFilterDto: any) {
    return this.httpClient.post(ApiEndPoint.VEHICLE_V1 + '/get_vehicle_list', commonFilterDto,
      {observe: 'response', withCredentials: false}
    ).toPromise();
  }

  getVehicleTotalCost(reservationDetails: any) {
    return this.httpClient.post(ApiEndPoint.VEHICLE_V1 + '/get_vehicle_total_cost', reservationDetails,
      {observe: 'response', withCredentials: false}
    ).toPromise();
  }

  getAllVehicles() {
    return this.httpClient.get(ApiEndPoint.VEHICLE_V1 + '/get_all_vehicle_list',
      {observe: 'response', withCredentials: true}
    ).toPromise();
  }

  updateVehicleStatus(vehicleNo: string, status: string) {
    return this.httpClient.put(ApiEndPoint.VEHICLE_V1 + '/update_vehicle_status', {},
      {observe: 'response', withCredentials: true, params: {vehicleNumber: vehicleNo, status: status}}
    ).toPromise();
  }

  addVehicle(formData: FormData) {
    return this.httpClient.post(ApiEndPoint.VEHICLE_V1 + '/add_vehicle', formData,
      {observe: 'response', withCredentials: true}
    ).toPromise();
  }

  getVehicleDetails(vehicleNumber: string) {
    return this.httpClient.get(ApiEndPoint.VEHICLE_V1 + '/get_vehicle_details',
      {observe: 'response', withCredentials: true, params: {vehicleNumber: vehicleNumber}}
    ).toPromise();
  }
}
