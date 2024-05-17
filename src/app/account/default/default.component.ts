import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.css']
})
export class DefaultComponent {

  constructor(
    private router: Router,
    private route: ActivatedRoute 
  ) { }

  navigateToShippingForm() {
    this.router.navigate(['shipping-form'], { relativeTo: this.route.parent });
}

}
