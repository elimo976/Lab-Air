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
  colors: { name: string, code: string }[] = [];
  products: IProduct[] = [];

  @Output()
  priceFilterChange = new EventEmitter<priceFilterState>();

  @Output()
  colorSelected = new EventEmitter<string>();

  constructor(
    private fs: FiltersService,
  ) { }

  ngOnInit(): void {
    this.getColors();
    // console.log('Colors in ngOnInit: ', this.colors);
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
          code: this.isColorPair(color) ? this.getGradient(color) : this.getColorCode(color)
        }));
      },
      error: err => {
        console.error('Si è verificato un errore durante il recupero dei colori', err);
      }
    });
  }

  isColorPair(colorName: string): boolean {
    return colorName.includes('/');
  }

  getGradient(colorName: string): string {
    const colorMappings: { [key: string]: string } = {
      "Nero/Giallo": "linear-gradient(to right, #000000 50%, #FFFF00 50%)",
      "Grigio/Blu": "linear-gradient(to right, #808080 50%, #0000FF 50%)",
      "Bianco/Rosso": "linear-gradient(to right, #FFFFFF 50%, #FF0000 50%)",
      "Grigio/Arancione": "linear-gradient(to right, #808080 50%, #FFA500 50%)",
      "Bianco/Nero": "linear-gradient(to right, #FFFFFF 50%, #000000 50%)",
      "Blu/Verde": "linear-gradient(to right, #0000FF 50%, #008000 50%)",
      "Nero/Rosso": "linear-gradient(to right, #000000 50%, #FF0000 50%)",
      "Blu/Rosso": "linear-gradient(to right, #0000FF 50%, #FF0000 50%)",
      "Rosso/Bianco": "linear-gradient(to right, #FF0000 50%, #FFFFFF 50%)",
      "Nero/Grigio": "linear-gradient(to right, #000000 50%, #808080 50%)",
      "Nero/Bianco": "linear-gradient(to right, #000000 50%, #FFFFFF 50%)",
      "Rosso/Nero": "linear-gradient(to right, #FF0000 50%, #000000 50%)"
    };
    return colorMappings[colorName] || '#000000';
  }

  getColorCode(colorName: string): string {
    const colorMappings: { [key: string]: string } = {
      "Rosso": "#FF0000",
      "Verde": "#008000",
      "Bianco": "#FFFFFF",
      "Grigio": "#808080",
      "Blu": "#0000FF",
      "Arancione": "#FFA500",
      "Nero": "#000000",
      "Argento": "#C0C0C0",
      "Oro": "#FFD700",
    };
    return colorMappings[colorName] || '#000000';
  }

  updateProductListByColor(color: string): void {
    this.colorSelected.emit(color);
  }

}
