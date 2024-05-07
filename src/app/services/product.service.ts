import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProduct } from '../models/product';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }


  getProducts() {
    return this.http.get<IProduct[]>(environment.base_url);
  }

  getProductById(id: number) {
    return this.http.get<IProduct>(environment.base_url + id);
  }

}
