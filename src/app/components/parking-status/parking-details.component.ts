import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'swp-parking-details',
  template: `
    <table class="table table-bordered">
      <thead>
        <tr>
          <th scope="col">Slot No.</th>
          <th scope="col">Vehicle Registration</th>
          <th scope="col">Type of Vehicle</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let status of parkingLotStatus">
          <td>{{ status.slotNumber }}</td>
          <td>{{ status.registrationNumber }}</td>
          <td>{{ status.vehicleType | vehicleType }}</td>
        </tr>
      </tbody>
    </table>
  `
})

export class ParkingDetailsComponent implements OnInit {
  @Input() parkingLotStatus: Array<any>;
  constructor() { }

  ngOnInit() { }
}