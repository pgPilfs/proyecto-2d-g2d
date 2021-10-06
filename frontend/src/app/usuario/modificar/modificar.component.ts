import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { UsuarioService, usuarios } from '../usuario.service';
import * as moment from 'moment';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-modificar',
  templateUrl: './modificar.component.html',
  styleUrls: ['./modificar.component.css'],
})
export class ModificarComponent implements OnInit {
  modificarForm!: FormGroup;
  passwordForm!: FormGroup;
  usuario: usuarios = new usuarios();
  usuarioResponse: any;
  id!: any;

  constructor(
    private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    let userJson = localStorage.getItem('auth');
    let user = {
      Id: 0,
    };
    if (userJson) {
      user = JSON.parse(userJson);
    }
    this.usuarioService.getUsuario(user.Id).subscribe(
      (res: any) => {
        this.usuarioResponse = res;
        console.log('respuesta un usuario', res);
        this.modificarForm.controls.nombreCompleto.patchValue(
          res.nombre_completo
        );
        this.modificarForm.controls.dni.patchValue(res.dni);
        this.modificarForm.controls.email.patchValue(res.email);
        this.modificarForm.controls.fechaDeNacimiento.patchValue(
          moment(res.fecha_nac).format('YYYY-MM-DD')
        );
        this.modificarForm.controls.sexo.patchValue(res.sexo);
      },
      (err) => console.log(err)
    );

    this.modificarForm = this.formBuilder.group({
      nombreCompleto: [
        '',
        Validators.compose([Validators.minLength(3), Validators.required]),
      ],
      email: ['', Validators.compose([Validators.email, Validators.required])],
      dni: [
        '',
        Validators.compose([
          Validators.minLength(6),
          Validators.required,
          Validators.pattern('^[0-9]*$'),
        ]),
      ],
      sexo: ['Masculino', Validators.compose([Validators.required])],
      fechaDeNacimiento: ['', Validators.compose([Validators.required])],
    });
    this.passwordForm = this.formBuilder.group({
      nuevaPassword: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(12),
        ]),
      ],
    });
    this.modificarForm.valueChanges.subscribe(console.log);
    this.passwordForm.valueChanges.subscribe(console.log);
  }

  submitDatosForm(usuario: usuarios) {
    if (this.modificarForm.valid) {
      const newUser = {
        ...this.usuarioResponse,
        dni: this.usuario.dni,
        email: this.usuario.email,
        fecha_nac: this.usuario.fecha_nac,
        nombre_completo: this.usuario.nombre_completo,
        sexo: this.usuario.sexo,
      };

      console.log('Usuario antes de updatear', newUser);

      this.usuarioService.updateUsuario(1, newUser).subscribe(
        (res) => {
          console.log(res);
        },
        (error) => console.log(error)
      );
      Swal.fire({
        icon: 'success',
        title: 'Modificar',
        text: 'Datos modificados con éxito',
        confirmButtonText: 'Aceptar',
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            icon: 'info',
            title: 'Datos Modificados',
            html: `
            <ul style="list-style: none;">
            <li><strong>Nombre completo:</strong> ${this.modificarForm.value.nombreCompleto}</li>
            <li><strong>Email:</strong> ${this.modificarForm.value.email}</li>
            <li><strong>Fecha de nacimiento:</strong> ${this.modificarForm.value.fechaDeNacimiento}</li>
            <li><strong>DNI:</strong> ${this.modificarForm.value.dni}</li>
            <li><strong>Sexo:</strong> ${this.modificarForm.value.sexo}</li>
            </ul>`,
            confirmButtonText: 'Aceptar',
          });
        }
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Modificar',
        text: 'Algunos campos son inválidos',
        confirmButtonText: 'Aceptar',
      });
      this.modificarForm.markAllAsTouched();
    }
  }

  submitPasswordForm() {
    if (this.passwordForm.valid) {
      const newUser = {
        ...this.usuarioResponse,
        password: this.usuario.password,
      };
      this.usuarioService.updateUsuario(parseInt(this.id), newUser).subscribe(
        (res) => {
          console.log(res);
        },
        (error) => console.log(error)
      );
      Swal.fire({
        icon: 'success',
        title: 'Modificar contraseña',
        text: 'La contraseña ha sido modificada con éxito',
        confirmButtonText: 'Aceptar',
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            icon: 'info',
            title: 'Nueva contraseña:',
            text: this.passwordForm.value.nuevaPassword,
            confirmButtonText: 'Aceptar',
          });
        }
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Modificar contraseña',
        text: 'La contraseña ingresada es invalida',
        confirmButtonText: 'Aceptar',
      });
      this.passwordForm.markAllAsTouched();
    }
  }
}
