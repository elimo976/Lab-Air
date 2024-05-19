// import { Component, EventEmitter, Output, OnInit } from '@angular/core';
// import { FormGroup, FormControl, Validators } from '@angular/forms';
// import { FormService } from '../services/form.service';

// @Component({
//   selector: 'app-shipping-form',
//   templateUrl: './shipping-form.component.html',
//   styleUrls: ['./shipping-form.component.css']
// })
// export class ShippingFormComponent implements OnInit {

//   @Output() shippingFormSubmitted = new EventEmitter<void>();

//   shippingForm: FormGroup;

//   constructor(private formService: FormService) {

//     this.shippingForm = new FormGroup({
//       name: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z ]*$'), Validators.minLength(2)]),
//       surName: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z ]*$'), Validators.minLength(2)]),
//       address:  new FormControl('', [Validators.required, Validators.pattern(/^([A-Za-zÀ-ÖØ-öø-ÿ\s]+)(?:\s+(\d{1,5})(?:[/-]\d{1,5})?)?\s/), Validators.minLength(3)]),
//       cap: new FormControl('', [Validators.required, Validators.pattern(/^\d{5}$/)]),
//       city: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-ZàèéìòùÀÈÉÌÒÙ' -]+$/), Validators.minLength(2)]),
//       email: new FormControl('', [Validators.required, Validators.pattern(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/), Validators.minLength(10)]),
//       phone: new FormControl('', [Validators.required, Validators.pattern(/(^[0|3]{1}[0-9]{5,10}$)/)])
//     });
//   }

//   ngOnInit() {
//     this.formService.shippingFormData$.subscribe(data => {
//       this.shippingForm.patchValue(data);
//     });
//   }

//   get name() {
//     return this.shippingForm.get('name');
//   }

//   get surName() {
//     return this.shippingForm.get('surName');
//   }

//   get address() {
//     return this.shippingForm.get('address');
//   }

//   get cap() {
//     return this.shippingForm.get('cap');
//   }

//   get city() {
//     return this.shippingForm.get('city');
//   }

//   get email() {
//     return this.shippingForm.get('email');
//   }

//   get phone() {
//     return this.shippingForm.get('phone');
//   }

//   onSubmit() {
//     if (this.shippingForm.valid) {
//       this.formService.setShippingFormData(this.shippingForm.value);
//       this.formService.setShippingFormCompleted(true);
//       this.shippingFormSubmitted.emit();
//     }
//   }
// }

import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormService } from '../services/form.service';

@Component({
  selector: 'app-shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit {

  @Output() shippingFormSubmitted = new EventEmitter<void>();

  shippingForm!: FormGroup;

  constructor(private formService: FormService) {}

  ngOnInit(): void {
    this.initForm();
    this.subscribeToShippingFormData();
  }

  private initForm(): void {
    this.shippingForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z ]*$'), Validators.minLength(2)]),
      surName: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z ]*$'), Validators.minLength(2)]),
      address: new FormControl('', [Validators.required, Validators.pattern(/^([A-Za-zÀ-ÖØ-öø-ÿ\s]+)(?:\s+(\d{1,5})(?:[/-]\d{1,5})?)?\s/), Validators.minLength(3)]),
      cap: new FormControl('', [Validators.required, Validators.pattern(/^\d{5}$/)]),
      city: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-ZàèéìòùÀÈÉÌÒÙ' -]+$/), Validators.minLength(2)]),
      email: new FormControl('', [Validators.required, Validators.pattern(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/), Validators.minLength(10)]),
      phone: new FormControl('', [Validators.required, Validators.pattern(/(^[0|3]{1}[0-9]{5,10}$)/)])
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

  get cap() {
    return this.shippingForm.get('cap');
  }

  get city() {
    return this.shippingForm.get('city');
  }

  get email() {
    return this.shippingForm.get('email');
  }

  get phone() {
    return this.shippingForm.get('phone');
  }

  onSubmit() {
    if (this.shippingForm.valid) {
      this.formService.setShippingFormData(this.shippingForm.value);
      this.formService.setShippingFormCompleted(true);
      this.shippingFormSubmitted.emit();
    }
  }

  private subscribeToShippingFormData(): void {
    this.formService.shippingFormData$.subscribe(data => {
      this.shippingForm.patchValue(data);
    });
  }

}

