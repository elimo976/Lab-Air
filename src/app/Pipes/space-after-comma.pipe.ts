import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'spaceAfterComma'
})
export class SpaceAfterCommaPipe implements PipeTransform {

  transform(value: string[], ...args: any[]): string {
    if (!value || !Array.isArray(value)) return '';
    return value.join(', ');
  }
}

// appunti:
// Se per qualche motivo il valore passato non è un array di stringhe, questa condizione eviterà errori imprevisti.