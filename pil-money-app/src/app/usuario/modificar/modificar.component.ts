import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-modificar',
  templateUrl: './modificar.component.html',
  styleUrls: ['./modificar.component.css'],
})
export class ModificarComponent implements OnInit {

  modificarForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) {}
  
  ngOnInit(): void {
    this.modificarForm = this.formBuilder.group({
      nombreCompleto: ['', Validators.compose([Validators.minLength(3), Validators.required])],
      email: ['', Validators.compose([Validators.email, Validators.required])],
      dni: ['', Validators.compose([Validators.minLength(7), Validators.maxLength(8), Validators.required])],
      sexo: ['', Validators.compose([Validators.required])]
    });
  }
}
