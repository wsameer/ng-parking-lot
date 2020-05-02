import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ParkingLotService } from 'src/app/shared/parking-lot.service';

@Component({
  selector: 'swp-find-vehicle',
  templateUrl: './find-vehicle.component.html'
})

export class FindVehicleComponent implements OnInit {

  vehicleDetails;
  findVehicleByRegForm;

  constructor(
    private formBuilder: FormBuilder,
    private parkingLotService: ParkingLotService
  ) {
    this.findVehicleByRegForm = this.formBuilder.group({
      registrationNumber: ['MH-12-BK-4165', [Validators.required, Validators.maxLength(13)]],
    });
  }

  ngOnInit() { }

  findVehicle() {

    if (this.findVehicleByRegForm.invalid) {
      return false;
    }

    console.log(this.findVehicleByRegForm.value);

    this.parkingLotService.searchVehicleLocationByRegistration(this.findVehicleByRegForm.value)
      .subscribe((response: any) => {
        console.log(response);
        this.vehicleDetails = response.data;
        this.findVehicleByRegForm.patchValue({
          registrationNumber: ''
        });
      });


  }
}