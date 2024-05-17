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
      firstName: new FormControl('', Validators.required),
      // Aggiungi gli altri controlli del form qui con le rispettive validazioni
    });
  }

  onSubmit() {
    if (this.shippingForm!.valid) {
    } else {
      // Mostra un messaggio di errore o fai qualcosa in base al caso
    }
  }
}
