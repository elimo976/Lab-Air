import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { WelcomeComponent } from './welcome/welcome.component';
import { ShippingFormComponent } from './shipping-form/shipping-form.component';
import { PaymentFormComponent } from './payment-form/payment-form.component';
import { ThankyouComponent } from './thankyou/thankyou.component';
import { DefaultComponent } from './default/default.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ReviewOrderComponent } from './review-order/review-order.component';

@NgModule({
  declarations: [
    WelcomeComponent,
    ShippingFormComponent,
    PaymentFormComponent,
    ThankyouComponent,
    DefaultComponent,
    ReviewOrderComponent,
    
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    ReactiveFormsModule
  ]
})
export class AccountModule { }
