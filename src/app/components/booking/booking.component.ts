import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ParkingLotService } from 'src/app/shared/parking-lot.service';

@Component({
  selector: 'swp-booking',
  templateUrl: './booking.component.html',
  styles: [`
    .mt-30 {
      margin-top: 32px;
    }
  `]
})
export class BookingComponent implements OnInit {
  isFormSubmitted = false;
  parkingForm;
  parkingSpace = {
    finding: false,
    spaceAvailable: []
  }

  vehicleTypes = [{
    value: '1',
    text: 'Motorcycle'
  }, {
    value: '2',
    text: 'Car'
  }, {
    value: '3',
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

  // Getter method to access formcontrols
  get vehicleType() {
    return this.parkingForm.get('vehicleType');
  }

  findParkingSlot() {
    if (this.parkingForm.invalid) {
      return false;
    }

    this.parkingSpace.finding = true;

    this.parkingLot.findParking({ vehicleType: this.parkingForm.value.vehicleType })
      .subscribe((response: any) => {
        console.log(response);
        if (response.success === 1) {
          this.parkingSpace.spaceAvailable = response.data;
          this.parkingSpace.finding = false;
          this.parkingForm.controls.registrationNumber.disable();
          this.parkingForm.controls.vehicleType.disable();
          return;
        }
        this.parkingSpace.spaceAvailable = [];
        this.parkingSpace.finding = false;
      });
  }

  reserveParking() {
    const parameters = {
      slots: this.parkingSpace.spaceAvailable.join(','),
      registrationNumber: this.parkingForm.value.registrationNumber,
      vehicleType: this.parkingForm.value.vehicleType
    }

    return this.parkingLot.reserveParking(parameters)
      .subscribe((response: any) => {
        if (response && response.success === 1) {
          // ADD THE VALUE IN SOMETHING
        } else {
          // error
          console.log(response.message || response.error);
        }
      });
  }
}
