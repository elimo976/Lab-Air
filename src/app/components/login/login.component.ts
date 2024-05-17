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
  loginFrm = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", Validators.required)
  })
  toastConfig?: ToastConfig

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  // constructor(
  //   private ar: ActivatedRoute
  // ){
  //   this.ar.queryParams.subscribe(p => {
  //     if(p["register"]){
  //       this.toastConfig = {
  //         cssClass: "bg-success",
  //         message: "Ora puoi effettuare l'accesso"
  //       }
  //       setTimeout(() => {
  //         this.toastConfig = undefined
  //       }, 3000);
  //     }
  //   })
  // }

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

