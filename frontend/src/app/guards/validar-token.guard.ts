import { Injectable } from '@angular/core';
import { CanActivate, CanLoad } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ValidarTokenGuard implements CanActivate, CanLoad {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> | boolean | Promise<boolean> {
    console.log('canActivate');
    return this.auth.validarToken();
  }
  canLoad(): Observable<boolean> | boolean | Promise<boolean> {
    console.log('canLoad');
    return this.auth.validarToken();
  }
}
