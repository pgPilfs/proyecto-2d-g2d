import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  url = 'https://localhost:44346/api/usuarios';
  constructor(private http: HttpClient) {}
  getUsuario(id: number) {
    return this.http.get(this.url + '/' + id.toString());
  }
  saveUsuario(usuario: usuarios): Observable<usuarios> {
    return this.http.post<usuarios>(this.url, usuario);
  }
  updateUsuario(id: number, updateUsuario: usuarios): Observable<usuarios> {
    return this.http.put<usuarios>(
      this.url + '/' + id.toString(),
      updateUsuario
    );
  }

  crearCuenta() {
    return this.http.post('https://localhost:44346/api/cuentas', {});
  }
}

export class usuarios {
  id?: number;
  nombre_completo: string = '';
  dni: string = '';
  sexo: string = '';
  fecha_nac: string = '';
  password: string = '';
  email: string = '';
  id_cuenta?: number;
}
