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
}
