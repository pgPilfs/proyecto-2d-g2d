import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modificar',
  templateUrl: './modificar.component.html',
  styleUrls: ['./modificar.component.css'],
})
export class ModificarComponent implements OnInit {
  modificarForm!: FormGroup;
  passwordForm!: FormGroup;
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
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
        ]),
      ],
      sexo: ['', Validators.compose([Validators.required])],
      fechaDeNacimiento: ['', Validators.compose([Validators.required])],
    });
    this.passwordForm = this.formBuilder.group({
      nuevaPassword: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(12),
        ]),
      ],
    });
    this.modificarForm.valueChanges.subscribe(console.log);
    this.passwordForm.valueChanges.subscribe(console.log);
  }

  submitDatosForm() {
    if (this.modificarForm.valid) {
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
