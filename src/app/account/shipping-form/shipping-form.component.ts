import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent {
  shippingForm!: FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.shippingForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z ]*$'), Validators.minLength(2)]),
      surName: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z ]*$'), Validators.minLength(2)]),
      address:  new FormControl('', [Validators.required, Validators.pattern('^[\w]{3,}[\d]{1}$'), Validators.minLength(3)]),
    });
  }

  get name() {
    return this.shippingForm.get('name');
  }

  get surName() {
    return this.shippingForm.get('surName');
  }

  get address() {
    return this.shippingForm.get('address');
  }

  onSubmit() {
    if (this.shippingForm!.valid) {
    } else {
      // Mostra un messaggio di errore o fai qualcosa in base al caso
    }
  }
}
