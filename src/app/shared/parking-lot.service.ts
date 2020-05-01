import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

const BASE_URL = 'http://localhost:3000/parkinglots';

@Injectable({
  providedIn: 'root'
})
export class ParkingLotService {
  private options = { headers: new HttpHeaders().set('Content-Type', 'application/json') };

  constructor(private httpClient: HttpClient) { }

  getTotalParkingSlots(): Observable<any> {
    return this.httpClient.get(BASE_URL);
  }

  createParkingLot(params) {
    return this.httpClient.post(`${BASE_URL}/create`, params, this.options);
  }

  findParking(params) {
    let data = new HttpParams();
    data = data.append('vehicleType', params.vehicleType);
    return this.httpClient.get(`${BASE_URL}/find`, { params: params });
  }
}
