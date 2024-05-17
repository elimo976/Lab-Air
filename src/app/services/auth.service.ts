// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable, of } from 'rxjs';
// import { catchError, map } from 'rxjs/operators';
// import { environment } from 'src/environments/environment';
// import { IUser } from '../account/models/user.model';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {

//   private readonly AUTH_KEY = 'isAuthenticated';

//   constructor(private http: HttpClient) { }

//   isAuthenticated(): Observable<boolean> {
//     const isAuthenticated = localStorage.getItem(this.AUTH_KEY) === 'true';
//     return of(isAuthenticated);
//   }

//   // login(email: string, password: string): Observable<boolean> {
//   //   // Esegui il login chiamando il server con email e password
//   //   // Supponiamo che il server restituisca un token di autenticazione in caso di successo

//   //   // Simuliamo il login di successo
//   //   const fakeToken = 'fakeAuthToken';
//   //   localStorage.setItem('token', fakeToken);
//   //   localStorage.setItem(this.AUTH_KEY, 'true');
//   //   console.log('Dati di autenticazione salvati nel localStorage:', localStorage.getItem(this.AUTH_KEY));
//   //   return of(true); // Ritorna un Observable di tipo boolean per indicare il successo del login
//   // }

//   login(nome: string, email: string, password: string): Observable<boolean> {
//     // Esegui il login chiamando il server con email e password
//     // Supponiamo che il server restituisca un token di autenticazione e i dati dell'utente in caso di successo
    
//     // Simuliamo il login di successo
//     const fakeToken = 'fakeAuthToken';
//     const user: IUser = {nome: nome, password: password, email: email }; // Qui dovresti includere tutti i dati dell'utente ottenuti dalla risposta del server
//     localStorage.setItem('token', fakeToken);
//     localStorage.setItem('user', JSON.stringify(user)); // Salva i dati dell'utente nel localStorage
//     localStorage.setItem(this.AUTH_KEY, 'true');
//     console.log('Dati di autenticazione salvati nel localStorage:', localStorage.getItem(this.AUTH_KEY));
//     return of(true); // Ritorna un Observable di tipo boolean per indicare il successo del login
//   }
  

//   logout(): void {
//     // Effettua il logout e rimuove le informazioni di autenticazione dal localStorage
//     localStorage.removeItem('token');
//     localStorage.removeItem(this.AUTH_KEY);
//   }

//   checkLocalStorageData(key: string): boolean {
//     return localStorage.getItem(key) !== null;
//   }

//   getLocalStorageData(key: string): IUser | null {
//     const data = localStorage.getItem(key);
//     return data ? JSON.parse(data) : null;
//   }

//   setLocalStorageData(key: string, data: any): void {
//     localStorage.setItem(key, JSON.stringify(data));
//   }

//   removeLocalStorageData(key: string): void {
//     localStorage.removeItem(key);
//   }
// }

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IUser } from '../account/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly AUTH_KEY = 'isAuthenticated';
  private readonly USER_KEY = 'currentUser';

  constructor(private http: HttpClient) { }

  isAuthenticated(): Observable<boolean> {
    const isAuthenticated = localStorage.getItem(this.AUTH_KEY) === 'true';
    return of(isAuthenticated);
  }

  login(email: string, password: string): Observable<boolean> {
    // Esegui il login chiamando il server con email e password
    return this.fetchUserName(email, password)
    .pipe(
      map(userName => {
        if (userName) {
          // Simula il login di successo
          const fakeToken = 'fakeAuthToken';
          localStorage.setItem('token', fakeToken);
          localStorage.setItem(this.AUTH_KEY, 'true');
          localStorage.setItem(this.USER_KEY, userName);
          console.log('Dati di autenticazione salvati nel localStorage:', localStorage.getItem(this.AUTH_KEY));
          return true;
        } else {
          return false;
        }
      }),
      catchError(error => {
        console.error('Errore durante il login:', error);
        return of(false);
      })
    );
  }

  private fetchUserName(email: string, password: string): Observable<string> {
    return this.http.get<any[]>(`${environment.base_url}auth`).pipe(
      map(users => {
        const user = users.find(u => u.email === email && u.password === password);
        return user ? user.username : null;
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem(this.AUTH_KEY);
    localStorage.removeItem(this.USER_KEY);
  }

  checkLocalStorageData(key: string): boolean {
    return localStorage.getItem(key) !== null;
  }

  getLocalStorageData(key: string): IUser | null {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }

  setLocalStorageData(key: string, data: any): void {
    localStorage.setItem(key, JSON.stringify(data));
  }

  removeLocalStorageData(key: string): void {
    localStorage.removeItem(key);
  }
}



