import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterByName'
})
export class FilterByNamePipe implements PipeTransform {

  transform(products: any[], query: string): any[] {
    if (!products || !query) {
      return products;
    }
    return products.filter(product => {
      return product.nome.toLowerCase().includes(query.toLowerCase());
    });
  }
}
