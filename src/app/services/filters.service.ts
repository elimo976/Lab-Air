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

getProductsByPrice(selectedFilters: string[]): Observable<IProduct[]> {
  let params = new HttpParams();

  selectedFilters.forEach(filter => {
    console.log('Filtro selezionato: ', filter);
    switch (filter) {
      case 'lowPrice':
        params = params.set('prezzo_lte', '99');
        console.log('Applicando filtro per prezzo basso (<= 99)), param: ', params.toString());
        break;
      case 'mediumPrice':
        params = params.set('prezzo_gte', '100');
        params = params.set('prezzo_lte', '150');
        console.log('Applicando filtro per prezzo medio (>= 100 e <= 150), param: ', params.toString());
        break;
      case 'highPrice':
        params = params.set('prezzo_gte', '150');
        console.log('Applicando filtro per prezzo alto (> 150), param: ', params.toString());
        break;
      default:
        console.warn(`Valore non riconosciuto: ${filter}`);
        break;
    }
  });

  return this.http.get<IProduct[]>(`${environment.base_url}?`, { params }).pipe(
    catchError(error => {
      console.error("Si è verificato un errore durante il recupero dei prodotti", error);
      throw error;
    })
  );
}

}


