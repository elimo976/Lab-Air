import { Injectable } from '@angular/core';
import { IProduct } from '../models/product';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: IProduct[] = [];
  private cartSubject = new BehaviorSubject<IProduct[]>([]);
  selectedSize: { id: number; num: string } | null = null;
  constructor() {
    const savedCartItems = localStorage.getItem('cartItems');
    if (savedCartItems) {
      this.cartItems = JSON.parse(savedCartItems);
      this.cartSubject.next(this.cartItems);
    }
   }

  addToCart(product: IProduct) {
    this.cartItems.push(product);
    this.cartSubject.next(this.cartItems);
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
  }

  removeFromCart(index: number) {
    this.cartItems.splice(index, 1);
    this.cartSubject.next(this.cartItems);
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
  }

  clearCart() {
    this.cartItems = [];
    this.cartSubject.next(this.cartItems);
    localStorage.removeItem('cartItems');
  }

  getCartItems() {
    return this.cartSubject.asObservable();
  }
}
