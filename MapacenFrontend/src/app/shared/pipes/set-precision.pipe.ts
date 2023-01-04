import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'setPrecision'
})
export class SetPrecisionPipe implements PipeTransform {

  transform(price: number): string {
    let newPrice = price.toString();
    if (newPrice.includes('.')) {
      newPrice = newPrice + '0';
    }
    return newPrice;
  }
}