import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateParkingLot } from './api-response.interface';

const BASE_URL = 'http://localhost:3000/parkinglots';

@Injectable({
  providedIn: 'root'
})
export class ParkingLotService {
  private options = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
  // private parkingStatus = [];

  constructor(private httpClient: HttpClient) { }

  getTotalParkingSlots(): Observable<any> {
    return this.httpClient.get(BASE_URL);
  }

  createParkingLot(params: CreateParkingLot) {
    return this.httpClient.post(`${BASE_URL}/create`, params, this.options);
  }

  findParking(params) {
    let data = new HttpParams();
    data = data.append('vehicleType', params.vehicleType);
    return this.httpClient.get(`${BASE_URL}/find/parking`, { params: params });
  }

  searchVehicleLocationByRegistration(params) {
    let data = new HttpParams();
    data = data.append('registrationNumber', params.registrationNumber);
    return this.httpClient.get(`${BASE_URL}/find/vehicle`, { params: data });
  }

  searchVehicleLocationByVehicleType(params) {
    let data = new HttpParams();
    data = data.append('vehicleType', params.vehicleType);
    return this.httpClient.get(`${BASE_URL}/find/vehicle`, { params: data });
  }

  reserveParking(params) {
    return this.httpClient.post(`${BASE_URL}/park`, params, this.options);
  }

  unParkThisVehicle(params) {
    console.log(params);
    let data = new HttpParams();
    data = data.append('registrationNumber', params.registrationNumber);
    return this.httpClient.request('delete', `${BASE_URL}/unpark`, { body: data });
  }

  parkingStatus() {
    return this.httpClient.get(`${BASE_URL}/status`);
  }
}
