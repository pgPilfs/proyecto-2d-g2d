import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  async validarToken(): Promise<boolean> {
    let userJson = localStorage.getItem('auth');
    let user = {
      Token: '',
    };
    if (userJson) {
      user = JSON.parse(userJson);
    }
    let headers = new HttpHeaders().set('Authorization', user.Token);
    try {
      const response = await this.http
        .get(this.url + '/movimientos', { headers })
        .toPromise();
      if (response) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      return false;
    }
  }
}

export class LoginRequest {
  username: string = '';
  token?: string;
}
