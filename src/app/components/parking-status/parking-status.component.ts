import { Component, OnInit } from '@angular/core';
import { ParkingLotService } from 'src/app/shared/parking-lot.service';
import { CreateParkingLot, createParkingResponse } from 'src/app/shared/api-response.interface';

@Component({
  selector: 'swp-parking-status',
  template: `
    <div class="status-wrapper">
      <div class="card">
        <h5 class="card-header">Current Parking Status</h5>
        <div class="card-body">
          <ng-container *ngIf="totalParkingSlots">
            <p>Total Parking Slots: {{ totalParkingSlots }}</p>
          </ng-container>

          <ng-container *ngIf="!totalParkingSlots">
            <swp-create-parking-lot (createNewParkingLot)="createNewParkingLot($event)"></swp-create-parking-lot>
          </ng-container>

          <hr />

          <div class="table-responsive"
            *ngIf="parkingLotStatus.length > 0">
            <swp-parking-details 
              [parkingLotStatus]="parkingLotStatus">
            </swp-parking-details>
          </div>
        </div>
      </div>
    </div>
  `
})
export class ParkingStatusComponent implements OnInit {

  totalParkingSlots = null;
  parkingLotStatus = [];

  constructor(
    private parkingLot: ParkingLotService,
  ) { }

  ngOnInit() {
    this.getTotalParkingSlotsCount();
  }

  /**
   * Get the count of total parking lots
   */
  getTotalParkingSlotsCount() {
    this.parkingLot.getTotalParkingSlots()
      .subscribe(response => {
        if (response) {
          this.totalParkingSlots = response.availableSlots;
          if (this.totalParkingSlots > 0) {
            this.getCurrentParkingStatus();
          }
        }
      });
  }

  /**
   * Get the current status of the Parking lot
   */
  getCurrentParkingStatus() {
    this.parkingLot.parkingStatus()
      .subscribe((res: any) => {
        if (res && res.success == 1) {
          this.parkingLotStatus = res.data
        }
      });
  }

  /**
   * Creates a new parking lot
   * @param params { slots: <number> } 
   */
  createNewParkingLot(params: CreateParkingLot) {
    this.parkingLot.createParkingLot(params)
      .subscribe((response: createParkingResponse) => {
        if (response && response.success == 1) {
          this.getTotalParkingSlotsCount();
        }
      });
  }

}
