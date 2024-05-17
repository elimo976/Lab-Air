import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { IUser } from '../models/user.model';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent {

  currentUser: string | null = null;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.authService.isAuthenticated()
    .subscribe(isAuthenticated => {
      if(!isAuthenticated) {
        this.router.navigateByUrl('/account/login');
      }
    })
    this.currentUser = localStorage.getItem('currentUser');
  }

  navigateToShippingForm() {
    this.router.navigate(['welcome/shipping-form']);
  }
}
