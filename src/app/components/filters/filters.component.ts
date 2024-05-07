import { Component, EventEmitter, Output } from '@angular/core';
import { FiltersService } from 'src/app/services/filters.service';

export interface priceFilterState {
  lowPrice: boolean;
  mediumPrice: boolean;
  highPrice: boolean;
}

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})

export class FiltersComponent {
  categories?: string[];
  lowPrice: boolean = false;
  mediumPrice: boolean = false;
  highPrice: boolean = false;


  @Output()
  priceFilterChange = new EventEmitter<priceFilterState>();

  constructor(
    private fs: FiltersService,
  ) { }

  getCategorie() {
    this.fs.getCategorie()
      .subscribe({
        next: cat => {
          this.categories = cat;
        },
        error: err => {
          console.error('Si è verificato un errore durante il recupero delle categorie', err);
        }
      });
  }

  onClickGetCategories(){
    this.getCategorie();
  }

  onPriceFilterChange(){
    this.priceFilterChange.emit({
      lowPrice: this.lowPrice,
      mediumPrice: this.mediumPrice,
      highPrice: this.highPrice
    })
  }
}
