import { Component, EventEmitter, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { CartModalComponent } from '../cart-modal/cart-modal.component';
import { CartService } from 'src/app/services/cart.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sizes',
  templateUrl: './sizes.component.html',
  styleUrls: ['./sizes.component.css']
})
export class SizesComponent {
  
  sizesShoes = [
    { id: 1, num: 'EU 36' },
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

  constructor(
    private ps: ProductService,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private cs: CartService,
    private as: AuthService,
    private router: Router
  ) { }


  selectSize(size: { id: number; num: string }) {
    // console.log('Taglia seleziona:', size);
    this.selectedSize = size;
    this.cs.setSelectedSize(size);
    this.errorMessage = "";
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
    
    this.isPopupVisible = true;
  
    if (this.selectedSize.id) {
      this.getProductDetails();
    }
  
    setTimeout(() => {
      this.closePopup();
    }, 10000);
  }
  
  getProductDetails() {
    this.route.params.subscribe({
      next: (params) => {
        this.ps.getProductById(params['id']).subscribe({
          next: (product: IProduct) => {
            this.productDetails = product;
            this.cs.addToCart(this.productDetails);
          },
          error: (error: any) => {
            console.error('Errore nella chiamata AJAX:', error);
            this.errorMessage = 'Errore nel recupero delle informazioni del prodotto';
          }
        });
      }
    });
  }

  openCartLimitModal() {
    const modalRef = this.modalService.open(CartModalComponent);
    modalRef.componentInstance.message = 'Hai raggiunto il limite massimo di 3 articoli';
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
}
