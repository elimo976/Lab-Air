import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { ShippingFormComponent } from './shipping-form/shipping-form.component';
import { PaymentFormComponent } from './payment-form/payment-form.component';
import { ThankyouComponent } from './thankyou/thankyou.component';
import { DefaultComponent } from './default/default.component';
import { ReviewOrderComponent } from './review-order/review-order.component';

const routes: Routes = [
  { path: 'welcome', component: WelcomeComponent },
      {
        path: '',
        component: DefaultComponent,
        children: [
      {
        path: 'shipping-form',
        component: ShippingFormComponent
      },
      {
        path: 'payment-form',
        component: PaymentFormComponent
      }
    ]
  },
  { path: 'reviewOrder', component: ReviewOrderComponent },
  { path: 'thankyou', component: ThankyouComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
