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
      paymentMethod: new FormControl('creditDebitCard', Validators.required),
      creditCardNumber: new FormControl({ value: '', disabled: true }, [
        Validators.required,
        Validators.pattern(/^\d{16}$/),
        Validators.minLength(16)
      ]),
      expirationDate: new FormControl({ value: '', disabled: true }, [
        Validators.required,
        Validators.pattern(/^(0[1-9]|1[0-2])\/\d{2}$/)
      ]),
      cvv: new FormControl({ value: '', disabled: true }, [
        Validators.required,
        Validators.pattern(/^\d{3}$/)
      ])
    });

    this.paymentForm.get('paymentMethod')?.valueChanges.subscribe(value => {
      if (value === 'creditDebitCard') {
        this.paymentForm.get('creditCardNumber')?.enable();
        this.paymentForm.get('expirationDate')?.enable();
        this.paymentForm.get('cvv')?.enable();
      } else {
        this.paymentForm.get('creditCardNumber')?.disable();
        this.paymentForm.get('expirationDate')?.disable();
        this.paymentForm.get('cvv')?.disable();
      }
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
