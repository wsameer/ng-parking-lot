import { Pipe, PipeTransform } from '@angular/core';

/*
 * Usage:
 *   value | spotConverter
 * Example:
 *   {{ 1 | spotConverter }}
 *   formats to: 2
*/
@Pipe({
  name: 'spotConverter'
})
export class SpotConverterPipe implements PipeTransform {

  transform(value: any, ...args: any[]): number {
    return parseInt(value, 10) + 1;
  }

}
