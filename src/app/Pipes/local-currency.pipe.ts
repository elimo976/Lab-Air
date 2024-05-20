import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'localCurrency'
})
@Injectable({
  providedIn: 'root'
})
export class LocalCurrencyPipe implements PipeTransform {

  transform(value: number, currencyCode: string): string {
    if (isNaN(value)) {
      throw new Error('Il valore passato alla pipe non è un numero valido.');
    }

    if (typeof currencyCode !== 'string') {
      throw new Error('Il codice valuta passato alla pipe non è una stringa valida.');
    }

    const locale = 'it-IT';
    const formattedValue = new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currencyCode,
      currencyDisplay: 'narrowSymbol'
    }).format(value);
    return formattedValue;
  }

}
