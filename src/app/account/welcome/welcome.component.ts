import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent {

  currentUser: string | null = null;
  username: string | null = null;

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.authService.isAuthenticated()
    .subscribe(isAuthenticated => {
      if(!isAuthenticated) {
        this.router.navigateByUrl('/account/login');
      }
    })
    this.currentUser = localStorage.getItem('currentUser');

      this.route.queryParams.subscribe(params => {
      this.username = params['username'];
    });
  }

  navigateToDefaultPage() {
    this.router.navigateByUrl('/account');
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/');
  }
}
