import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'swp-create-parking-lot',
  template: `
    <p>
      <button class="btn btn-primary"
        type="button"
        (click)="toggle()">
        Create/Add a new parking lot
      </button>
    </p>

    <div *ngIf="collapseCreateParkingLot">
      <form class="form-inline"
        [formGroup]="createParkingLotForm"
        (ngSubmit)="onSubmit()">
        <div class="form-group mb-2">
          <label for="parkingSlotNumber"
            class="col-sm-4 p-0 col-form-label">Number of slots</label>
          <input type="number"
            class="form-control"
            formControlName="slots"
            id="parkingSlotNumber"
            [ngClass]="{ 'is-invalid': submitted && f.slots.errors }" />
          <div *ngIf="submitted && f.slots.errors"
            class="invalid-feedback">
            <div *ngIf="f.slots.errors.required">Slot number is required</div>
          </div>
        </div>

        <button type="submit"
          class="btn btn-primary ml-2 mb-2">Create Parking Lot</button>
      </form>
    </div>
  `
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