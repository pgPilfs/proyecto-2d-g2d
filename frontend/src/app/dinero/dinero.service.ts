import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DineroService {
  userJson = localStorage.getItem('auth');
  user = {
    Token: '',
  };
  constructor(private http: HttpClient) {
    if (this.userJson) {
      this.user = JSON.parse(this.userJson);
    }
  }

  getCuentaPorId(id: Number) {
    const headers = new HttpHeaders().set('Authorization', this.user.Token);
    return this.http.get(`https://localhost:44346/api/cuentas/${id}`, {
      headers,
    });
  }

  getAllCuentas() {
    const headers = new HttpHeaders().set('Authorization', this.user.Token);
    return this.http.get(`https://localhost:44346/api/cuentas`, { headers });
  }

  updateCuenta(id: number, body: any) {
    const headers = new HttpHeaders().set('Authorization', this.user.Token);
    return this.http.put(`https://localhost:44346/api/cuentas/${id}`, body, {
      headers,
    });
  }

  registrarMovimiento(body: any) {
    const headers = new HttpHeaders().set('Authorization', this.user.Token);
    return this.http.post(`https://localhost:44346/api/movimientos`, body, {
      headers,
    });
  }

  registrarTransferencia(body: any) {
    const headers = new HttpHeaders().set('Authorization', this.user.Token);
    return this.http.post(`https://localhost:44346/api/transferencias`, body, {
      headers,
    });
  }
}
