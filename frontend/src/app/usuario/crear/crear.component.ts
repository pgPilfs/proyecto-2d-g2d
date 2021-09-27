import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { UsuarioService, usuarios} from '../usuario.service';

@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.css'],
})
export class CrearComponent implements OnInit {

  crearForm!: FormGroup;
  usuario: usuarios = new usuarios();

  constructor(private formBuilder: FormBuilder, private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.crearForm = this.formBuilder.group({
      nombreCompleto: ['', Validators.compose([Validators.minLength(3), Validators.required])],
      email: ['', Validators.compose([Validators.email, Validators.required])],
      dni: ['', Validators.compose([Validators.minLength(7), Validators.maxLength(8), Validators.required])],
      sexo: ['', Validators.compose([Validators.required])],
      fechaDeNacimiento: ['', Validators.compose([Validators.required])],
      contraseña:['', Validators.compose([Validators.minLength(8), Validators.maxLength(12), Validators.required])],
      confirmarContraseña:['', Validators.compose([Validators.minLength(8), Validators.maxLength(12), Validators.required])],
    });
    this.crearForm.valueChanges.subscribe(console.log)
  }

  enviarForm(usuario: usuarios) {
    if (this.crearForm.valid) {
      console.log(usuario);
      this.usuarioService.saveUsuario(usuario).subscribe(
       res =>{ console.log(res);},
       err => { console.log(err); }

      )
      Swal.fire({
        icon: 'success',
        title: 'Registrar',
        text: 'Usuario registrado con éxito',
        confirmButtonText: 'Aceptar',
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            icon: 'info',
            title: 'Datos guardados',
            html: `
            <ul style="list-style: none;">
            <li><strong>Nombre completo:</strong> ${this.crearForm.value.nombreCompleto}</li>
            <li><strong>Email:</strong> ${this.crearForm.value.email}</li>
            <li><strong>Fecha de nacimiento:</strong> ${this.crearForm.value.fechaDeNacimiento}</li>
            <li><strong>DNI:</strong> ${this.crearForm.value.dni}</li>
            <li><strong>Sexo:</strong> ${this.crearForm.value.sexo}</li>
            </ul>`,
            confirmButtonText: 'Aceptar',
          });
        }
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Registrar Usuario',
        text: 'Algunos campos son inválidos',
        confirmButtonText: 'Aceptar',
      });
      this.crearForm.markAllAsTouched();
    }
  }
}
