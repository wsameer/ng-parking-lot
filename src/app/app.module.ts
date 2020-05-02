import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { ParkingStatusComponent } from './components/parking-status/parking-status.component';
import { BookingComponent } from './components/booking/booking.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VehicleTypePipe } from './shared/pipes/vehicle-type.pipe'
import { ParkingDetailsComponent } from './components/parking-status/parking-details.component';
import { CreateParkingLotComponent } from './components/parking-status/create-parking-lot.component';
import { FindVehicleComponent } from './components/find-vehicle/find-vehicle.component';

const toastrOptions = {
  timeOut: 3000,
  positionClass: 'toast-top-right',
  preventDuplicates: true,
}

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ParkingStatusComponent,
    BookingComponent,
    ParkingDetailsComponent,
    CreateParkingLotComponent,
    FindVehicleComponent,
    VehicleTypePipe
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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
