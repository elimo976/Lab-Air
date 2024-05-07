import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { IProduct, ProductDTO } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  @Input() product?: IProduct;

  currentImage?: string;
  currentVideo?: string;
  activeThumbnail?: string | null;
  products: ProductDTO[] = [];
  category: string = "";

  constructor(
    private ps: ProductService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.ps.getProductById(params['id'])
        .pipe(
          catchError(error => {
            console.error('Si è verificato un errore durante il recupero del prodotto', error);
            return throwError('Errore durante il recupero del prodotto');
          })
        )
        .subscribe(product => {
          this.product = product;
          if (this.product) {
            this.currentImage = this.product.immagine;
          }
        });
    });

  }

  isVideo(thumb: string): boolean {
    return thumb.endsWith('mp4') || thumb.endsWith('mov');
  }

  changeImage(src: string): void {
    if (this.isVideo(src)) {
      this.currentVideo = src;
      this.currentImage = "";

    } else {
      this.currentImage = src;
      this.currentVideo = "";
    }
  }
}