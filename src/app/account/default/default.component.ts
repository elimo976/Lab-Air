import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormService } from '../services/form.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.css']
})
export class DefaultComponent {

  shippingFormCompleted = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formService: FormService,
    private authService: AuthService
  ) {
    this.formService.shippingFormCompleted$.subscribe(completed => {
      this.shippingFormCompleted = completed;
    });
  }

  navigateToPaymentForm() {
    if (this.shippingFormCompleted) {
      this.router.navigate(['payment-form'], { relativeTo: this.route.parent });
    }
  }

  onShippingFormSubmitted() {
    this.shippingFormCompleted = true;
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/');
  }
}

