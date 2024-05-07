import { Component, Input } from '@angular/core';
import { IProduct } from 'src/app/models/product';

@Component({
  selector: 'app-products-preview',
  templateUrl: './products-preview.component.html',
  styleUrls: ['./products-preview.component.css']
})
export class ProductsPreviewComponent {
  @Input()
  product?: IProduct;
}
