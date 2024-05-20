import { Component } from '@angular/core';
import { FormService } from '../services/form.service';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-review-order',
  templateUrl: './review-order.component.html',
  styleUrls: ['./review-order.component.css']
})
export class ReviewOrderComponent {

  shippingData: any;
  paymentData: any;
  maskedCreditCardNumber?: string;
  cartItems: any[] = [];
  total: number = 0;

  constructor(
    private formService: FormService,
    private cartService: CartService,
    private router: Router,
    private authService: AuthService)
    { }

  ngOnInit(): void {
    this.shippingData = this.formService.getShippingFormData();
    this.paymentData = this.formService.getPaymentFormData();
    this.maskedCreditCardNumber = this.maskCreditCardNumber(this.paymentData.creditCardNumber);

    this.cartService.getCartItems()
    .subscribe(items => {
      this.cartItems = items;
      this.total = this.cartService.calculateTotal();
    })
  }

  maskCreditCardNumber(creditCardNumber: string): string {
    const lastFourDigits = creditCardNumber.slice(-4);
    return 'XXXX-XXXX-XXXX-' + lastFourDigits;
  }

  placeOrder(): void {
    this.formService.clearLocalStorage();
    this.formService.setShippingFormCompleted(false);
    this.formService.setPaymentFormCompleted(false);
    this.formService.setShippingFormData({});
    this.formService.setPaymentFormData({});
    this.cartService.clearCart();
    this.logout();
    this.router.navigateByUrl('/account/thankyou')
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/');
  }

}
