import { Component, Input } from '@angular/core';
import { IProduct } from 'src/app/models/product';

@Component({
  selector: 'app-best-sellers',
  templateUrl: './best-sellers.component.html',
  styleUrls: ['./best-sellers.component.css']
})
export class BestSellersComponent {
  @Input()
  bestSeller?: IProduct;

  stars = [1, 2, 3, 4, 5]

}
