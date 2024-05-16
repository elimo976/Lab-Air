import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  authenticate (email: string, password: string): Observable<boolean> {
    return this.http.post<boolean>(`${environment.base_url}auth`, {email, password});
  }
}
