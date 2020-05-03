import { Car } from './car.model';

export interface ParkingLot {
  slotNumber: number;
  car: Car;
  totalCount: number;
}
