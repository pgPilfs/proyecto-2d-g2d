import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../auth/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({});

  constructor(
    private auth: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.compose([Validators.required])],
      password: ['', Validators.required],
    });
    this.loginForm.valueChanges.subscribe(console.log);
  }
  async submitLogin() {
    const loginBody = {
      username: this.loginForm.value.username,
      password: this.loginForm.value.password,
    };
    console.log(loginBody);
    try {
      const res = await this.auth.login(loginBody).toPromise();
      console.log(res);
      localStorage.setItem('auth', JSON.stringify(res));
      Swal.fire({
        icon: 'success',
        title: 'TODO OK ACA VIEJA',
        text: 'HUBO ALGO PAPA',
      }).then((res) => {
        this.router.navigate(['/consulta']);
      });
    } catch (err) {
      console.log(err);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Usuarios y/o contraseña incorrecta',
      });
    }
  }
}

export class LoginRequest {
  username: string = '';
  password: string = '';
  token?: string;
}
