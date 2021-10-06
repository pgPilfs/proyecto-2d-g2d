import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ConsultasService {
  constructor(private http: HttpClient) {}

  getCuentaActual(id: Number) {
    let userJson = localStorage.getItem('auth');
    let user = {
      Token: '',
    };
    if (userJson) {
      user = JSON.parse(userJson);
    }
    console.log(user);

    const headers = new HttpHeaders().set('Authorization', user.Token);
    return this.http.get(`https://localhost:44346/api/cuentas/${id}`, {
      headers,
    });
  }
}
