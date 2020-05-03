import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'swp-parking-details',
  templateUrl: './parking-details.component.html'
})

export class ParkingDetailsComponent implements OnInit {
  @Input() parkingLotStatus: Array<any>;
  @Input() showDelete;
  @Output() unParkVehicle = new EventEmitter<any>();

  constructor() { }

  ngOnInit() { }

  delete(registrationNumber: string) {
    return this.unParkVehicle.emit(registrationNumber);
 }

}
