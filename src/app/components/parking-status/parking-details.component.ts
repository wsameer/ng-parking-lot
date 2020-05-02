import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ParkingLotService } from 'src/app/shared/parking-lot.service';

@Component({
  selector: 'swp-parking-details',
  template: `
    <table class="table table-bordered">
      <thead>
        <tr>{{showDelete}}</tr>
        <tr>
          <th scope="col">Slot No.</th>
          <th scope="col">Vehicle Registration</th>
          <th scope="col">Type of Vehicle</th>
          <th *ngIf="showDelete === 'true'" scope="col"></th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let status of parkingLotStatus ">
          <td>{{ status.slotNumber }}</td>
          <td>{{ status.registrationNumber }}</td>
          <td>{{ status.vehicleType | vehicleType }}</td>
          <td *ngIf="showDelete === 'true'">
            <button class="btn btn-danger" (click)="delete(status.registrationNumber)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  `
})

export class ParkingDetailsComponent implements OnInit {
  @Input() parkingLotStatus: Array<any>;
  @Input() showDelete;
  @Output() unParkVehicle = new EventEmitter<any>();

  constructor(private parkingLotService: ParkingLotService) { }

  ngOnInit() { }

  delete(registrationNumber: string) {
    return this.unParkVehicle.emit(registrationNumber);
  }

}