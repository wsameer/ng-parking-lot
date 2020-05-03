import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'swp-create-parking-lot',
  templateUrl: './create-parking-lot.component.html'
})

export class CreateParkingLotComponent implements OnInit {
  @Output() createNewParkingLot = new EventEmitter<object>();
  collapseCreateParkingLot = false;
  submitted = false;
  createParkingLotForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.createParkingLotForm = this.formBuilder.group({
      slots: [0, [Validators.required, Validators.minLength(2), Validators.min(4)]]
    });
  }

  ngOnInit() { }

  onSubmit() {
    this.submitted = true;

    if (this.createParkingLotForm.invalid) {
      return false;
    }

    this.submitted = false;
    this.toggle();
    return this.createNewParkingLot.emit(this.createParkingLotForm.value);
  }

  toggle() {
    this.collapseCreateParkingLot = !this.collapseCreateParkingLot;
  }

  // convenience getter for easy access to form fields
  get f() { return this.createParkingLotForm.controls; }

}
