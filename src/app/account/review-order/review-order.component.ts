import { Component } from '@angular/core';
import { FormService } from '../services/form.service';

@Component({
  selector: 'app-review-order',
  templateUrl: './review-order.component.html',
  styleUrls: ['./review-order.component.css']
})
export class ReviewOrderComponent {

  shippingData: any;
  paymentData: any;
  maskedCreditCardNumber?: string;

  constructor(private formService: FormService) {}

  ngOnInit(): void {
    this.shippingData = this.formService.getShippingFormData();
    this.paymentData = this.formService.getPaymentFormData();
    this.maskedCreditCardNumber = this.maskCreditCardNumber(this.paymentData.creditCardNumber);
  }

  maskCreditCardNumber(creditCardNumber: string): string {
    const lastFourDigits = creditCardNumber.slice(-4);
    return 'XXXX-XXXX-XXXX-' + lastFourDigits;
  }

}
