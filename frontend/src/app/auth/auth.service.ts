import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  url = 'https://localhost:44346/api';

  constructor(private http: HttpClient) {}
  login(loginBody: LoginRequest) {
    return this.http.post(this.url + '/login/auth', loginBody);
  }
}

export class LoginRequest {
  username: string = '';
  token?: string;
}
