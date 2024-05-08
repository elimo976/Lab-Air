import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';
import { IProduct } from 'src/app/models/product';
import { FiltersService } from 'src/app/services/filters.service';
import { ProductService } from 'src/app/services/product.service';
import { priceFilterState } from '../filters/filters.component';

interface ProductFilters {
  category?: string;
  newArrival?: boolean;
  bestSellerGte?: number;
  bestSellerLte?: number;
}

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {
  products: IProduct[] = [];
  isLoading: boolean = false;
  page = 0;
  pageSize = 20;
  query: string = '';
  filters: ProductFilters = {};

  constructor(
    private productService: ProductService,
    private fs: FiltersService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    console.log('Inizializzazione della lista dei prodotti...');
    this.fs.getQuery().subscribe(query => {
      this.query = query;
      console.log('Query:', this.query);
    });
    

    this.route.params
    .pipe(
      tap(params => {
        this.filters.category = params['category'];
        this.filters.newArrival = params['newArrival'] === 'true';
        this.loadFilteredProducts();
      }),
      switchMap(() => this.route.queryParams)
    ).subscribe(params => {
      this.filters.bestSellerGte = +params['bestSellerGte'];
      this.filters.bestSellerLte = +params['bestSellerLte'];
      // this.loadFilteredProducts();  // se inserisco questa riga, non carica i prodotti non filtrati né applica il filtro per nome, MA funziona il filtro per best seller. Se this.loadFilteredProducts(); viene inserito in entrambe le porzioni di codice, succede la stessa cosa. 
    })
  }

  loadFilteredProducts(): void {
    this.isLoading = true;
    if (this.filters.category) {
      this.fs.getProductsByCategory(this.filters.category).subscribe({
        next: (products: IProduct[]) => {
          this.products = products;
          this.isLoading = false;
        },
        error: (error) => {
          console.error("Si è verificato un errore durante il recupero dei prodotti", error);
          this.isLoading = false;
        }
      });
    } else if (this.filters.newArrival) {
      this.fs.getProductsByNewArrival(this.filters.newArrival).subscribe({
        next: (products: IProduct[]) => {
          this.products = products;
          this.isLoading = false;
        },
        error: (error) => {
          console.error("Si è verificato un errore durante il recupero dei prodotti", error);
          this.isLoading = false;
        }
      });
    } else if (this.filters.bestSellerGte !== undefined && this.filters.bestSellerLte !== undefined) {
      this.fs.getProductsByBestSeller(this.filters.bestSellerGte, this.filters.bestSellerLte).subscribe({
        next: (products: IProduct[]) => {
          this.products = products;
          this.isLoading = false;
        },
        error: (error) => {
          console.error("Si è verificato un errore durante il recupero dei prodotti", error);
          this.isLoading = false;
        }
      });
    } else {
      this.loadAllProducts();
    }
  }

  loadAllProducts(): void {
    if (this.fs.getQuery()) {
      this.fs.setQuery('');
    }
    this.isLoading = true;
    this.productService.getProducts().pipe(
      tap({
        next: (products: IProduct[]) => {
          this.products = products;
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Si è verificato un errore durante il recupero dei prodotti:', error);
          this.isLoading = false;
        }
      })
    ).subscribe();
  }

applyPriceFilters(priceFilters: { lowPrice: boolean, mediumPrice: boolean, highPrice: boolean }): void {
  const selectedFilters = [];
  if (priceFilters.lowPrice) {
    selectedFilters.push('lowPrice');
  }
  if (priceFilters.mediumPrice) {
    selectedFilters.push('mediumPrice');
  }
  if (priceFilters.highPrice) {
    selectedFilters.push('highPrice');
  }

  this.fs.getProductsByPrice(selectedFilters)
    .subscribe(products => {
      this.products = products;
    });
}


}


