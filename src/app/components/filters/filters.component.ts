import { Component, EventEmitter, Output } from '@angular/core';
import { IProduct } from 'src/app/models/product';
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
  // filteredProducts: IProduct[] = [];
  colors: { name: string, code: string }[] = [];
  products: IProduct[] = [];

  colorMappings: { [key: string]: string } = {
    "Rosso": "#FF0000",
    "Verde": "#008000",
    "Bianco": "#FFFFFF",
    "Grigio": "#808080",
    "Blu": "#0000FF",
    "Arancione": "#FFA500",
    "Giallo": "#FFFF00",
    "Nero": "#000000",
    "Argento": "#C0C0C0",
    "Oro": "#FFD700"
    // Aggiungi altri colori se necessario
  };


  @Output()
  priceFilterChange = new EventEmitter<priceFilterState>();

  constructor(
    private fs: FiltersService,
  ) { }

  ngOnInit(): void {
    this.getColors();
    console.log('Colors in ngOnInit: ', this.colors);
  }

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

  getColors() {
    this.fs.getColors().subscribe({
      next: colors => {
        this.colors = colors.map(color => ({
          name: color,
          code: this.colorMappings[color] || '#000000'
        }));
      },
      error: err => {
        console.error('Si è verificato un errore durante il recupero dei colori', err);
      }
    });
  }

  filterPrductsByColor(color: string) {
    // if (color) {
    //   this.filteredProducts = this.products.filter(product => {
    //     return product.colori_disponibili.includes(color);
    //   });
    // } else {
    //   this.filteredProducts = this.products;
    // }
  }

}
