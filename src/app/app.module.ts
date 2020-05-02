import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { ParkingStatusComponent } from './components/parking-status/parking-status.component';
import { BookingComponent } from './components/booking/booking.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VehicleTypePipe } from './shared/pipes/vehicle-type.pipe'
import { ParkingDetailsComponent } from './components/parking-status/parking-details.component';
import { CreateParkingLotComponent } from './components/parking-status/create-parking-lot.component';
import { FindVehicleComponent } from './components/find-vehicle/find-vehicle.component';
import { AppHttpInterceptor } from './shared/http.interceptor';
import { SpotConverterPipe } from './shared/pipes/spot-converter.pipe';

const toastrOptions = {
  timeOut: 6000,
  positionClass: 'toast-top-right',
  preventDuplicates: true,
};

/** Http interceptor providers in outside-in order */
const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AppHttpInterceptor, multi: true },
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ParkingStatusComponent,
    BookingComponent,
    ParkingDetailsComponent,
    CreateParkingLotComponent,
    FindVehicleComponent,
    VehicleTypePipe,
    SpotConverterPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(toastrOptions),
  ],
  providers: [
    httpInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
