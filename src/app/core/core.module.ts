import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppHttpInterceptor } from './interceptors/http.interceptor';

import { ApiService } from './services/api.service';
import { ParkingLotService } from './services';

/** Http interceptor providers in outside-in order */
const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AppHttpInterceptor, multi: true },
];

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [],
  declarations: [],
  providers: [
    httpInterceptorProviders,
    ApiService,
    ParkingLotService
  ],
})
export class CoreModule { }
