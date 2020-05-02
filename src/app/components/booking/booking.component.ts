import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ParkingLotService } from 'src/app/shared/parking-lot.service';
import { ToastrService } from 'ngx-toastr';
import { VEHICLE_TYPES } from '../../shared/app.constant.js';

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
  submitted = false;
  parkingForm;
  parkingSpace = {
    finding: false,
    spaceAvailable: []
  }
  reservingSpace = false;

  vehicleTypes = VEHICLE_TYPES;

  constructor(
    private parkingLot: ParkingLotService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) {
    this.parkingForm = this.formBuilder.group({
      registrationNumber: ['', [
        Validators.required,
        Validators.maxLength(13),
        Validators.pattern(/^[a-zA-Z0-9-]+$/g)
      ]],
      vehicleType: ['', Validators.required]
    });
  }

  ngOnInit() { }

  // convenience getter for easy access to form fields
  get f() { return this.parkingForm.controls; }

  // Getter method to access formcontrols
  get vehicleType() {
    return this.parkingForm.get('vehicleType');
  }

  onFormSubmit() {
    this.submitted = true;
    if (this.parkingForm.invalid) {
      return false;
    }

    this.parkingSpace.finding = true;
    this.reservingSpace = true;

    this.parkingLot.findParking({ vehicleType: this.parkingForm.value.vehicleType })
      .subscribe((response: any) => {
        if (response.success === 1) {
          this.parkingSpace.spaceAvailable = response.data;
          this.parkingSpace.finding = false;
          return;
        }
        this.parkingSpace.spaceAvailable = [];
        this.parkingSpace.finding = false;
        this.toastr.error(response.message, 'Error');
      });
  }

  cancelReservingSpace() {
    this.parkingSpace.spaceAvailable = [];
    this.parkingSpace.finding = false;
    this.reservingSpace = false;
    this.parkingForm.reset();
    return;
  }

  reserveParking() {
    const parameters = {
      slots: this.parkingSpace.spaceAvailable.join(','),
      registrationNumber: this.parkingForm.value.registrationNumber,
      vehicleType: this.parkingForm.value.vehicleType
    }

    return this.parkingLot.reserveParking(parameters)
      .subscribe((response: any) => {
        this.reservingSpace = false;
        if (response && response.success === 1) {
          // ADD THE VALUE IN SOMETHING
          this.toastr.success(response.data, 'Parked!');
        } else {
          // error
          this.toastr.error(response.message, 'Not Parked!');
          console.log(response.message || response.error);
        }

        this.parkingSpace.spaceAvailable = [];
        this.parkingSpace.finding = false;
        this.parkingForm.controls.registrationNumber.setValue('');
        this.parkingForm.controls.vehicleType.setValue('');
      });
  }
}
