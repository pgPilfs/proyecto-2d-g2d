import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  url = 'https://localhost:44346/api';
  constructor(private http: HttpClient) {}
  login(loginBody: LoginRequest) {
    return this.http.post(this.url + '/login/auth', loginBody);
  }

  validarToken(): Observable<boolean> {
    let userJson = localStorage.getItem('auth');
    let user = {
      Token: '',
    };
    if (userJson) {
      user = JSON.parse(userJson);
    }
    let headers = new HttpHeaders().set('Authorization', user.Token);

    return this.http.get(this.url + '/movimientos', { headers }).pipe(
      map((res: any) => {
        return true;
      }),
      catchError((err) => {
        return of(false);
      })
    );
  }
}

export class LoginRequest {
  username: string = '';
  token?: string;
}
