import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, tap, throwError } from 'rxjs';
import { IProduct } from 'src/app/models/product';
import { FiltersService } from 'src/app/services/filters.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  microbannersTexts: string[] = [
    "Spedizione gratuita per gli ordini superiori a 50 €",
    "Iscriviti alla nostra Newsletter per accedere a sconti e promozioni imperdibili",
    "Non perderti la nuova collezione primavera estate"
  ];

  microbannersLinks: string[] = ["/construction"];

  currentIndex: number = 0;
  currentText: string = '';
  products: IProduct[] = [];
  isLoading: boolean = false;

  constructor(
    private ps: ProductService,
    private fs: FiltersService,
    private route: Router
) { }

  ngOnInit(): void {
    setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.microbannersTexts.length;
      this.currentText = this.microbannersTexts[this.currentIndex];
    }, 4000);
    this.loadAllProducts();
  }
  loadAllProducts() {
    console.log('Loading all products with query:');
    this.isLoading = true;
    this.ps.getProducts()
      .pipe(
        tap({
          next: (products: IProduct[]) => {
            console.log('Prodotti caricati con successo:', products);
            this.products = products;
            this.isLoading = false;
          },
          error: (error) => {
            console.error('Si è verificato un errore durante il recupero dei prodotti:', error);
            this.isLoading = false;
          }
        })
      )
      .subscribe();
  }

}

