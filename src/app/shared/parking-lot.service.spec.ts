import { TestBed } from '@angular/core/testing';

import { ParkingLotService } from './parking-lot.service';

describe('ParkingLotService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ParkingLotService = TestBed.get(ParkingLotService);
    expect(service).toBeTruthy();
  });
});
