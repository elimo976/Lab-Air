import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { CartModalComponent } from '../cart-modal/cart-modal.component';

@Component({
  selector: 'app-sizes',
  templateUrl: './sizes.component.html',
  styleUrls: ['./sizes.component.css']
})
export class SizesComponent {
  sizesShoes = [
    { id: 1, num: 'EU 36', prezzo: 149.99 },
    { id: 2, num: 'EU 37' },
    { id: 3, num: 'EU 38' },
    { id: 4, num: 'EU 39' },
    { id: 5, num: 'EU 40' },
    { id: 6, num: 'EU 41' },
    { id: 7, num: 'EU 42' },
    { id: 8, num: 'EU 43' },
    { id: 9, num: 'EU 44' },
    { id: 10, num: 'EU 45' },
    { id: 11, num: 'EU 46' },
    { id: 12, num: 'EU 47' },
    { id: 13, num: 'EU 48' },
    { id: 14, num: 'EU 49' }
  ]

  errorMessage?: string;
  selectedSize: any;
  isPopupVisible: boolean = false;
  productDetails?: IProduct;
  selectedSizesArray: any[] = [];
  totalPrice: number = 0;

  constructor(
    private ps: ProductService,
    private route: ActivatedRoute,
    private modalService: NgbModal
  ) { }


  selectSize(size: any) {
    this.selectedSize = size;
    this.errorMessage = "";
  }

  addToCart() {
    if (!this.selectedSize) {
      this.errorMessage = "Seleziona una taglia";
      return;
    }

    if (this.selectedSizesArray.length > 2) {
      this.openCartLimitModal();
      return;
    }

    this.selectedSizesArray.push(this.selectedSize);

    const currentPrice = this.selectedSize.prezzo;
    const totalPrice = this.countSelectedSizes() * currentPrice;

    this.isPopupVisible = true;

    if (this.selectedSize.id) {
      this.getProductDetails();
    }

    setTimeout(() => {
      this.closePopup();
    }, 10000);

  }

  closePopup() {
    this.isPopupVisible = false;
  }

  removeSize(size: any) {
    this.selectedSizesArray = this.selectedSizesArray.filter(item => item !== size);
  }

  countSelectedSizes() {
    return this.selectedSizesArray.length;
  }

  getProductDetails() {
    this.route.params.subscribe(params => {
      this.ps.getProductById(params['id'])
        .subscribe(product => {
          this.productDetails = product;
        }),
        (error: string) => {
          console.error('Errore nella chiamata AJAX:', error);
          this.errorMessage = 'Errore nel recupero delle informazioni del prodotto';
        }
    })
  }

  openCartLimitModal() {
    const modalRef = this.modalService.open(CartModalComponent);
    modalRef.componentInstance.message = 'Hai raggiunto il limite massimo di 3 articoli';
  }
}
