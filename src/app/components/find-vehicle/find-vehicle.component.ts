import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ParkingLotService } from 'src/app/shared/parking-lot.service';
import { VEHICLE_TYPES } from "../../shared/app.constant.js";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'swp-find-vehicle',
  templateUrl: './find-vehicle.component.html'
})

export class FindVehicleComponent implements OnInit {

  vehicleDetails;
  findVehicleByRegForm;

  vehicleTypes = VEHICLE_TYPES;

  constructor(
    private formBuilder: FormBuilder,
    private parkingLotService: ParkingLotService,
    private toastr: ToastrService
  ) {
    this.findVehicleByRegForm = this.formBuilder.group({
      registrationNumber: ['', [Validators.maxLength(13), Validators.pattern(/^[a-zA-Z0-9-]+$/g)]],
      vehicleType: ['']
    });
  }

  ngOnInit() { }

  // convenience getter for easy access to form fields
  get f() { return this.findVehicleByRegForm.controls; }

  findVehicle() {
    if (
      this.findVehicleByRegForm.value.registrationNumber !== ''
      && this.findVehicleByRegForm.value.registrationNumber != null
    ) {
      this.parkingLotService.searchVehicleLocationByRegistration(this.findVehicleByRegForm.value)
        .subscribe((response: any) => {
          if (response.data.length === 0) {
            return this.toastr.error(
              `Vehicle not found with Reg. No. ${this.findVehicleByRegForm.value.registrationNumber}`,
              'Nada!'
            );
          }
          this.findVehicleByRegForm.reset();
          return this.vehicleDetails = response.data;
        });
    } else if (
      this.findVehicleByRegForm.value.vehicleType != null
      && this.findVehicleByRegForm.value.vehicleType != ''
    ) {
      this.parkingLotService.searchVehicleLocationByVehicleType(this.findVehicleByRegForm.value)
        .subscribe((response: any) => {
          if (response.data.length === 0) {
            return this.toastr.error(
              `No vehicle found.`,
              'Nada!'
            );
          }
          this.findVehicleByRegForm.reset();
          return this.vehicleDetails = response.data;
        });
    }
    return false;
  }
}