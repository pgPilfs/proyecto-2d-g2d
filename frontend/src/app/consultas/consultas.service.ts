import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ConsultasService {
  constructor(private http: HttpClient) {}

  getCuentaActual(id: Number) {
    return this.http.get(`https://localhost:44346/api/cuentas/${id}`);
  }
}
