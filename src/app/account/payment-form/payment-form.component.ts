import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormService } from '../services/form.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment-form',
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.css']
})
export class PaymentFormComponent implements OnInit {

  @Output() paymentFormSubmitted = new EventEmitter<void>();

  paymentForm!: FormGroup;

  constructor(
    private formService: FormService,
    private route: Router) { }

  ngOnInit(): void {
    this.paymentForm = new FormGroup({
      paymentMethod: new FormControl('creditDebitCard', [Validators.required]),
      creditCardNumber: new FormControl('', [Validators.required, Validators.pattern(/(^[0-9]{16}$)/), Validators.minLength(16)]),
      cvv: new FormControl('', [Validators.required, Validators.pattern(/(^[0-9]{3}$)/), Validators.minLength(3)]),
      expirationDate: new FormControl('', [Validators.required, Validators.pattern(/(^[0-9]{2}\/[0-9]{2}$)/)]),
    });
    this.subscribeToPaymentFormData();
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
      this.formService.setPaymentFormData(this.paymentForm.value);
      this.formService.setPaymentFormCompleted(true);
      this.paymentFormSubmitted.emit();
      this.route.navigateByUrl('/account/reviewOrder')
    }
  }

  selectGPay(): void {
    this.paymentForm.get('paymentMethod')!.setValue('gPay');
  }

  private subscribeToPaymentFormData(): void {
    this.formService.paymentFormData$
     .subscribe(data => {
        this.paymentForm.patchValue(data);
      });
  }
}
