import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  url = 'https://localhost:44346/api/usuarios';
  userJson = localStorage.getItem('auth');
  user = {
    Token: '',
  };
  constructor(private http: HttpClient) {
    if (this.userJson) {
      this.user = JSON.parse(this.userJson);
    }
  }

  getUsuario(id: number) {
    const headers = new HttpHeaders().set('Authorization', this.user.Token);
    return this.http.get(this.url + '/' + id.toString(), { headers });
  }
  saveUsuario(usuario: usuarios): Observable<usuarios> {
    return this.http.post<usuarios>(this.url, usuario);
  }
  updateUsuario(id: number, updateUsuario: usuarios): Observable<usuarios> {
    const headers = new HttpHeaders().set('Authorization', this.user.Token);
    return this.http.put<usuarios>(
      this.url + '/' + id.toString(),
      updateUsuario,
      { headers }
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

export class LoginRequest {
  username: string = '';
  password: string = '';
  token?: string;
}
