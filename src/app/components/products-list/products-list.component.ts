import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { catchError, switchMap, tap, throwError } from 'rxjs';
import { IProduct } from 'src/app/models/product';
import { FiltersService } from 'src/app/services/filters.service';
import { ProductService } from 'src/app/services/product.service';
import { priceFilterState } from '../filters/filters.component';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {
  products: IProduct[] = [];
  page = 0;
  pageSize = 20;
  query: string = '';
  selectedCategory?: string;
  isLoading: boolean = false;
  newArrival: boolean = true;
  bestSellerGte?: number;
  bestSellerLte?: number;
  priceFilterState: priceFilterState = { lowPrice: false, mediumPrice: false, highPrice: false }; // Aggiungi una proprietà per memorizzare lo stato dei filtri dei prezzi


  constructor(
    private ps: ProductService,
    private fs: FiltersService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    console.log('Inizializzazione della lista dei prodotti...');
    this.fs.getQuery().subscribe(query => this.query = query);
  
    this.route.params
      .pipe(
        switchMap(params => {
          this.selectedCategory = params['category'];
          this.newArrival = params['newArrival'] === 'true';
          this.loadProducts();
          return this.route.queryParams;
        })
      )
      .subscribe(params => {
        this.bestSellerGte = +params['bestSellerGte'];
        this.bestSellerLte = +params['bestSellerLte'];
  
        if (this.selectedCategory) {
          this.loadProductsByCategory();
        } else if (this.newArrival) {
          this.loadProductsByNewArrival(this.newArrival);
        } else if (this.bestSellerGte !== undefined && this.bestSellerLte !== undefined) {
          this.loadBestSellerProducts(this.bestSellerGte, this.bestSellerLte);
        } else {
          this.loadAllProducts(); // Chiamata quando nessun filtro è applicato
        }
      });
      // this.loadAllProducts(); --------> se questo metodo viene chiamato al di fuori dei controlli,
      // allora è possibile visualizzare correttamente la lista dei prodotti filtrati,
      // ma non è più possibile filtrare i prodotti
  }

  applyPriceFilter() {
    console.log('Applicando il filtro dei prezzi...');
    console.log('Stato dei filtri dei prezzi:', this.priceFilterState);
    this.products = [...this.products]; // Copia l'array dei prodotti per mantenere l'originale inalterato
    this.products = this.products.filter(product => {
      if (this.priceFilterState.lowPrice && product.prezzo <= 99) {
        return true;
      }
      if (this.priceFilterState.mediumPrice && product.prezzo >= 100 && product.prezzo <= 150) {
        return true;
      }
      if (this.priceFilterState.highPrice && product.prezzo > 150) {
        return true;
      }
      return false;
    });
    console.log('Lista dei prodotti filtrati:', this.products);
  }

  
  loadProducts(){
    this.isLoading = true;
    this.fs.getProductsByPrice(this.priceFilterState.lowPrice, this.priceFilterState.mediumPrice, this.priceFilterState.highPrice).subscribe(products => {
      this.products = products;
      this.applyPriceFilter();
      this.isLoading = false;
    })
  }

  loadAllProducts() {
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

  loadProductsByCategory(): void {
    console.log('Loading products for category:', this.selectedCategory);
    this.isLoading = true;
    if (this.selectedCategory) {
      this.fs.getProductsByCategory(this.selectedCategory)
        .subscribe({
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
      console.warn("La categoria selezionata non è definita.");
    }
  }

  loadProductsByNewArrival(newArrival: boolean) {
    console.log('Loading new arrival products...');
    this.isLoading = true;
    this.fs.getProductsByNewArrival(newArrival)
      .subscribe({
        next: (products: IProduct[]) => {
          this.products = products;
          this.isLoading = false;
        },
        error: (error) => {
          console.error("Si è verificato un errore durante il recupero dei prodotti", error);
          this.isLoading = false;
        }
      });
  }

  loadBestSellerProducts(bestSellerGte: number, bestSellerLte: number): void {
    // console.log('Loading best seller products...');
    this.isLoading = true;
    this.fs.getProductsByBestSeller(bestSellerGte, bestSellerLte)
      .subscribe({
        next: (products: IProduct[]) => {
          this.products = products;
          this.isLoading = false;
          // console.log("Best seller products:", products);
        },
        error: (error) => {
          console.error("Si è verificato un errore durante il recupero dei prodotti", error);
          this.isLoading = false;
        }
      });
  }
}

