import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { NavbarComponent, SharedModule } from './shared';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core';
import { ParkingStatusComponent } from './components/parking-status/parking-status.component';
import { FindVehicleComponent } from './components/find-vehicle/find-vehicle.component';
import { BookingComponent } from './components/booking/booking.component';
import { CreateParkingLotComponent } from './components/parking-status/create-parking-lot/create-parking-lot.component';
import { ParkingDetailsComponent } from './components/parking-details/parking-details.component';

const toastrOptions = {
  timeOut: 6000,
  positionClass: 'toast-top-right',
  preventDuplicates: true,
};

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ParkingStatusComponent,
    FindVehicleComponent,
    BookingComponent,
    ParkingDetailsComponent,
    CreateParkingLotComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    SharedModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(toastrOptions),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
