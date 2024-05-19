import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-payment-form',
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.css']
})
export class PaymentFormComponent implements OnInit {

  paymentForm!: FormGroup;

  ngOnInit(): void {
    this.paymentForm = new FormGroup({
      paymentMethod: new FormControl('creditDebitCard', [Validators.required]),
      creditCardNumber: new FormControl('', [Validators.required, Validators.pattern(/(^[0-9]{16}$)/), Validators.minLength(16)]),
      cvv: new FormControl('', [Validators.required, Validators.pattern(/(^[0-9]{3}$)/), Validators.minLength(3)]),
      expirationDate: new FormControl('', [Validators.required, Validators.pattern(/(^[0-9]{2}\/[0-9]{2}$)/)]),
    });
  }

  get creditCardNumber() {
    return this.paymentForm.get('creditCardNumber');
  }

  get cvv() {
    return this.paymentForm.get('cvv');
  }

  get expirationDate() {
    return this.paymentForm.get('expirationDate');
  }

  onSubmit(): void {
    if (this.paymentForm.valid) {
      console.log(this.paymentForm.value);
    }
  }

  selectGPay(): void {
    this.paymentForm.get('paymentMethod')!.setValue('gPay');
  }
}
