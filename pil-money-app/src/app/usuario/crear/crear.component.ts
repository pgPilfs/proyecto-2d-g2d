import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.css'],
})
export class CrearComponent implements OnInit {

  crearForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) {}
  
  ngOnInit(): void {
    this.crearForm = this.formBuilder.group({
      nombreCompleto: ['', Validators.compose([Validators.minLength(3), Validators.required])],
      email: ['', Validators.compose([Validators.email, Validators.required])],
      dni: ['', Validators.compose([Validators.minLength(7), Validators.maxLength(8), Validators.required])],
      sexo: ['', Validators.compose([Validators.required])],
      fechaDeNacimiento: ['', Validators.compose([Validators.required])],
      nuevaPassword:[Validators.compose([Validators.minLength(8), Validators.maxLength(12), Validators.required])],
    });
    this.crearForm.valueChanges.subscribe(console.log)
  }
}