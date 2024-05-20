import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

interface ToastConfig {
  message: string
  cssClass: string
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  toastConfig?: ToastConfig;

  loginFrm = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", Validators.required)
  })

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  login() {
    const email = this.loginFrm.get('email')?.value ?? '';
    const password = this.loginFrm.get('password')?.value ?? '';
  
    this.authService.login(email, password)
      .subscribe((loggedIn: boolean) => {
        if (loggedIn) {
          this.router.navigateByUrl('/account/welcome');
        } else {
          this.toastConfig = {
            cssClass: "bg-danger",
            message: "Credenziali errate"
          };
          setTimeout(() => {
            this.toastConfig = undefined;
          }, 3000);
        }
      });
  }
}  

