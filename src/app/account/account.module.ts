import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { WelcomeComponent } from './welcome/welcome.component';
import { ShippingFormComponent } from './shipping-form/shipping-form.component';
import { PaymentFormComponent } from './payment-form/payment-form.component';
import { ThankyouComponent } from './thankyou/thankyou.component';
import { DefaultComponent } from './default/default.component';


@NgModule({
  declarations: [
    WelcomeComponent,
    ShippingFormComponent,
    PaymentFormComponent,
    ThankyouComponent,
    DefaultComponent
    
  ],
  imports: [
    CommonModule,
    AccountRoutingModule
  ]
})
export class AccountModule { }
