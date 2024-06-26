import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IProduct } from 'src/app/models/product';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {

  products: IProduct[] = [];  
  subTotal: number = 0;
  total: number = 0;

  constructor(
    private cs: CartService,
    private as: AuthService,
    private router: Router
    ) { }

  ngOnInit() {
    this.cs.getCartItems()
    .subscribe(cartItems => {
       this.products = cartItems;
    })

    this.selectedSize = this.cs.selectedSize;
    console.log('Valore di selectedSize nel CartComponent:', this.selectedSize);

    this.cs.getCartItems()
    .subscribe(data => {
      this.products = data;
      this.subTotal = this.cs.calculateSubTotal();
      this.total = this.cs.calculateTotal();
    })
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

  updateQuantity(event: any, index: number) {
    const quantity = parseInt(event.target.value);
    this.products[index].quantity = quantity;
    this.updateSubTotal();
    this.updateTotal();
  }
  
  updateSubTotal() {
    this.subTotal = this.products.reduce((total, product) => total + (product.prezzo * (product.quantity || 1)), 0);
  }

  updateTotal() {
    this.total = this.subTotal;
  
    if (this.subTotal <= 90) {
      this.total += 5;
    }
  }

  redirectToLinkPayPal(){
    window.open("https://www.paypal.com/it/home", "_blank");
  }
  
  handlePayment() {
    console.log('handlePayment called');
    this.as.isAuthenticated()
    .subscribe(isAuthenticated => {
      console.log('isAuthenticated: ', isAuthenticated);
      if (isAuthenticated) {
        this.router.navigateByUrl('/account');
      } else {
        this.router.navigateByUrl('/login');
      }
    })
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
