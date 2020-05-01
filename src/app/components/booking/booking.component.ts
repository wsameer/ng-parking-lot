import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ParkingLotService } from 'src/app/shared/parking-lot.service';

@Component({
  selector: 'swp-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.less']
})
export class BookingComponent implements OnInit {
  isFormSubmitted = false;
  parkingForm;
  vehicleTypes = [{
    value: 1,
    text: 'Motorcycle'
  }, {
    value: 2,
    text: 'Car'
  }, {
    value: 3,
    text: 'Truck'
  }];

  constructor(
    private parkingLot: ParkingLotService,
    private formBuilder: FormBuilder
  ) {
    this.parkingForm = this.formBuilder.group({
      registrationNumber: ['MH-12-BK-4165', [Validators.required, Validators.maxLength(13)]],
      vehicleType: ['', Validators.required]
    });
  }

  ngOnInit() { }

  changeVehicleType(event) {
    this.vehicleType.setValue(event.target.value, {
      onlySelf: true
    });
  }

  // Getter method to access formcontrols
  get vehicleType() {
    return this.parkingForm.get('vehicleType');
  }

  findParkingSlot() {
    if (this.parkingForm.invalid) {
      return false;
    }

    // valid form
    console.log(JSON.stringify(this.parkingForm.value));

    this.parkingLot.findParking({ vehicleType: this.parkingForm.value.vehicleType })
      .subscribe(response => {
        console.log(response);
      });
  }

}
