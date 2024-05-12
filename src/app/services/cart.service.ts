import { EventEmitter, Injectable } from '@angular/core';
import { IProduct } from '../models/product';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: IProduct[] = [];
  private cartSubject = new BehaviorSubject<IProduct[]>([]);
  private localStorageKey = 'selectedSize';
  selectedSize: { id: number; num: string }[] = [];

  sizeSelected = new EventEmitter<{ id: number; num: string }>();

  constructor() {
    const savedCartItems = localStorage.getItem('cartItems');
    if (savedCartItems) {
      this.cartItems = JSON.parse(savedCartItems);
      this.cartSubject.next(this.cartItems);
    }
    const savedSelectedSize = localStorage.getItem(this.localStorageKey);
    if (savedSelectedSize) {
      this.selectedSize = JSON.parse(savedSelectedSize);
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

  getSelectedSize(): { id: number; num: string }[] {
    return JSON.parse(localStorage.getItem(this.localStorageKey) || '[]') as { id: number; num: string }[];
  }
  

  setSelectedSize(size: { id: number; num: string }) {
    const selectedSizes = JSON.parse(localStorage.getItem(this.localStorageKey) || '[]') as { id: number; num: string }[];
    selectedSizes.push(size);
    localStorage.setItem(this.localStorageKey, JSON.stringify(selectedSizes));
  }
  
  removeSelectedSize(index: number) {
    localStorage.removeItem(this.localStorageKey);
    this.selectedSize.splice(index, 1);
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.selectedSize));
  }

  calculateTotal(): number {
    return this.cartItems.reduce((total, product) => total + product.prezzo, 0);
  }
  
}
