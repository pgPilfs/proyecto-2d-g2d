import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DineroService {
  constructor(private http: HttpClient) {}

  getCuentaPorId(id: Number) {
    return this.http.get(`https://localhost:44346/api/cuentas/${id}`);
  }

  getAllCuentas() {
    return this.http.get(`https://localhost:44346/api/cuentas`);
  }

  updateCuenta(id: number, body: any) {
    return this.http.put(`https://localhost:44346/api/cuentas/${id}`, body);
  }

  registrarMovimiento(body: any) {
    return this.http.post(`https://localhost:44346/api/movimientos`, body);
  }

  registrarTransferencia(body: any) {
    return this.http.post(`https://localhost:44346/api/transferencias`, body);
  }
}
