import { Pipe, PipeTransform } from '@angular/core';

/*
 * Usage:
 *   value | vehicleType
 * Example:
 *   {{ '1' | vehicleType }}
 *   formats to: 'Motorcycle'
*/
@Pipe({
  name: 'vehicleType'
})
export class VehicleTypePipe implements PipeTransform {

  transform(value: string, ...args: any[]): string {
    switch (value) {
      case '1':
        return 'Motorcycle';

      case '2':
        return 'Car';

      case '3':
        return 'Truck'

      default:
        return ''
    }
  }

}
