import { Component } from '@angular/core';
import { IProduct } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {

  products: IProduct[] = [];  

  constructor(private cs: CartService) { }

  ngOnInit() {
    this.cs.getCartItems()
    .subscribe(cartItems => {
       this.products = cartItems;
    })

    this.selectedSize = this.cs.selectedSize;
    console.log('Valore di selectedSize nel CartComponent:', this.selectedSize);
  }

  removeFromCart(index: number) {
    this.cs.removeFromCart(index);
    this.products.splice(index, 1);
  }

  get selectedSize() {
    return this.cs.selectedSize;
  }

  set selectedSize(value: any) {
    this.cs.selectedSize = value;
  }

  removeSelectedSize(index: number) {
    this.cs.removeSelectedSize(index);
    this.products.splice(index, 1);
  }

  removeFromCartAndSelectedSize(index: number) {
    this.removeFromCart(index);
    this.removeSelectedSize(index);
  }

  changeSelectedSize(event: any, index: number) {
  const sizeValue = event.target.value;
  if (sizeValue) {
    const selectedSize = { id: parseInt(sizeValue), num: sizeValue };
    this.cs.setSelectedSize(selectedSize);
    this.selectedSize[index] = selectedSize;
  } else {
    console.error("Valore della taglia non valido.");
  }
}



  LikelyFaves = [
    { title: 'Kettlebells', imageUrl: 'https://images.pexels.com/photos/221247/pexels-photo-221247.jpeg' },
    { title: 'Baseball', imageUrl: 'https://images.pexels.com/photos/257970/pexels-photo-257970.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
    { title: 'Skip Rope', imageUrl: 'https://images.pexels.com/photos/45056/pexels-photo-45056.jpeg' },
    { title: 'Fit ball', imageUrl: 'https://images.pexels.com/photos/3768593/pexels-photo-3768593.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
    { title: 'Dumbbells', imageUrl: 'https://images.pexels.com/photos/4397833/pexels-photo-4397833.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
    { title: 'Boxing Gloves', imageUrl: 'https://images.pexels.com/photos/6798724/pexels-photo-6798724.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
    { title: 'Resistance Bands', imageUrl: 'https://images.pexels.com/photos/863977/pexels-photo-863977.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'},
    { title: 'Tennis Racket', imageUrl: 'https://images.pexels.com/photos/1432039/pexels-photo-1432039.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
  ];

}
