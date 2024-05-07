import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, pipe, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { IProduct, ProductDTO } from '../models/product';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root'
})
export class FiltersService {
  private querySource = new BehaviorSubject<string>('');

  constructor(private http: HttpClient, private ps: ProductService) { }

  // filterByName
  getQuery(): Observable<string> {
    return this.querySource.asObservable();
  }
  setQuery(query: string): void {
    this.querySource.next(query);
  }

  // filterByCategory
  getCategorie(): Observable<string[]> {
    return this.http.get<ProductDTO[]>(`${environment.base_url}`)
      .pipe(
        map(products => {
          const categorie = Array.from(new Set(products.map(product => product.categoria)));
          return categorie;
        })
      );
  }

  getProductsByCategory(category: string): Observable<IProduct[]> {
    return this.ps.getProducts()
      .pipe(
        map(products => products.filter(product => product.categoria === category))
      );
  }

  // filterByNewArrival
  getProductsByNewArrival(newArrival: boolean): Observable<IProduct[]> {
    return this.ps.getProducts()
      .pipe(
        map(products => products.filter(product => product.nuovi_arrivi === newArrival))
      );
  }

getProductsByBestSeller(best_seller_gte: number, best_seller_lte: number): Observable<IProduct[]> {
  const url = `${environment.base_url}?best_seller_gte=${best_seller_gte}&best_seller_lte=${best_seller_lte}`
  return this.http.get<IProduct[]>(url)
    .pipe(
      map(
        (data) => {
          // console.log("Dati ricevuti:", data);
          return data;
        }
      ),
      catchError(
        (error) => {
          console.error("Si è verificato un errore durante il recupero dei prodotti", error);
          return throwError(error);
        }
      )
    );
}

// filterByPrice
// chiamata al server prezzo inferiore a 100€: "http://localhost:3000/prodotti?prezzo_lte=99"

// chiamata al server prezzo tra 100€ e 150€: "http://localhost:3000/prodotti?prezzo_gte=100&prezzo_lte=150"

// chiamata al server prezzo superiore a 150€: "http://localhost:3000/prodotti?prezzo_gte=150"

getProductsByPrice(lowPrice: boolean, mediumPrice: boolean, highPrice: boolean): Observable<IProduct[]>{
  let params = new HttpParams();

  if(lowPrice){
    params = params.set('prezzo_lte', '99');
  }
  if(mediumPrice){
    params = params.set('prezzo_gte', '100');
    params = params.set('prezzo_lte', '150');
  }
  if(highPrice){
    params = params.set('prezzo_gte', '150');
  }
  return this.http.get<IProduct[]>(`${environment.base_url}?`, {params})
}

}


