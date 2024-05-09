import { Component } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
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
