import { Component, OnInit } from '@angular/core';
import { ParkingLotService } from 'src/app/shared/parking-lot.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'swp-parking-status',
  templateUrl: './parking-status.component.html',
  styleUrls: ['./parking-status.component.less']
})
export class ParkingStatusComponent implements OnInit {

  totalParkingSlots = null;
  status = [];
  createParkingLotForm: FormGroup;
  submitted = false;
  collapseCreateParkingLot = false;

  constructor(
    private parkingLot: ParkingLotService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {

    this.createParkingLotForm = this.formBuilder.group({
      slots: [0, [Validators.required, Validators.minLength(2), Validators.min(4)]]
    });

    this.parkingLot.getTotalParkingSlots()
      .subscribe(response => {
        if (response) {
          console.log(response);
          this.totalParkingSlots = response.availableSlots;
        }
      });
  }

  // convenience getter for easy access to form fields
  get f() { return this.createParkingLotForm.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.createParkingLotForm.invalid) {
      return false;
    }

    console.log('Form submitted correctly', this.createParkingLotForm.value);
    this.parkingLot.createParkingLot(this.createParkingLotForm.value)
      .subscribe(response => {
        console.log(response);
        if (response) {
          this.collapseCreateParkingLot = false;
        }
      });
  }
}
