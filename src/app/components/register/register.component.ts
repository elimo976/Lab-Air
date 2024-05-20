// import { Component } from '@angular/core';
// import { FormGroup, FormControl, Validators } from '@angular/forms';
// import { ActivatedRoute, Router } from '@angular/router';
// import { NgbToastConfig } from '@ng-bootstrap/ng-bootstrap';
// import { IUserRegistration } from 'src/app/models/userRegister.model';
// import { AuthService } from 'src/app/services/auth.service';

// interface ToastConfig {
//   message: string
//   cssClass: string
// }

// @Component({
//   selector: 'app-register',
//   templateUrl: './register.component.html',
//   styleUrls: ['./register.component.css']
// })

// export class RegisterComponent {

//   toastConfig?: ToastConfig;

//   registerFrm = new FormGroup({
//     username: new FormControl("", [Validators.required, Validators.minLength(2)]),
//     email: new FormControl("", [Validators.required, Validators.email]),
//     password: new FormControl("", Validators.required)
//   })


//   constructor(
//     private ar: ActivatedRoute,
//     private as: AuthService,
//     private router: Router
//   ){  }

//   register() {
//     if (this.registerFrm.valid) {
//       const username = this.registerFrm.get('username')!.value;
//       const email = this.registerFrm.get('email')!.value;
//       const password = this.registerFrm.get('password')!.value;
  
//       if (username && email && password) {
//         const newUser: IUserRegistration = {
//           username: username,
//           email: email,
//           password: password
//         };
  
//         this.as.register(newUser).subscribe({
//           next: response => {
//             console.log('User registered successfully:', response);
//             this.toastConfig = {
//               cssClass: "bg-success",
//               message: "Registrazione avvenuta con successo. Ora puoi effettuare l'accesso."
//             };
//             setTimeout(() => {
//               this.toastConfig = undefined;
//             }, 3000);
//             this.router.navigateByUrl(`/account/welcome?username=${username}`);
//           },
//           error: error => {
//             console.error('Error registering user:', error);
//             this.toastConfig = {
//               cssClass: "bg-danger",
//               message: "Si è verificato un errore durante la registrazione. Riprova più tardi."
//             };
//             setTimeout(() => {
//               this.toastConfig = undefined;
//             }, 3000);
//           }
//         });
//       }
//     }
//   }
// }  

import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbToastConfig } from '@ng-bootstrap/ng-bootstrap';
import { IUserRegistration } from 'src/app/models/userRegister.model';
import { AuthService } from 'src/app/services/auth.service';

interface ToastConfig {
  message: string
  cssClass: string
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent {

  toastConfig?: ToastConfig;

  registerFrm = new FormGroup({
    username: new FormControl("", [Validators.required, Validators.minLength(2)]),
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", Validators.required)
  })


  constructor(
    private ar: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ){  }

  register() {
    if (this.registerFrm.valid) {
      const username = this.registerFrm.get('username')!.value;
      const email = this.registerFrm.get('email')!.value;
      const password = this.registerFrm.get('password')!.value;

      if (username && email && password) {
        const newUser: IUserRegistration = {
          username: username,
          email: email,
          password: password
        };

        this.authService.register(newUser).subscribe({
          next: response => {
            console.log('User registered successfully:', response);
            
            this.authService.login(email, password).subscribe(() => {
              this.router.navigateByUrl(`/account/welcome?username=${username}`);
            });
          },
          error: error => {
            console.error('Error registering user:', error);
            this.toastConfig = {
              cssClass: "bg-danger",
              message: "Si è verificato un errore durante la registrazione. Riprova più tardi."
            };
            setTimeout(() => {
              this.toastConfig = undefined;
            }, 3000);
          }
        });
      }
    }
  }
}  

