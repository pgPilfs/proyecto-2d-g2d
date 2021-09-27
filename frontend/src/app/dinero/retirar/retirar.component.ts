import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-retirar',
  templateUrl: './retirar.component.html',
  styleUrls: ['./retirar.component.css'],
})
export class RetirarComponent implements OnInit {
  retirarMetodo: string = '';
  retirarDineroForm!: FormGroup;
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.retirarDineroForm = this.fb.group({
      monto: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[0-9]*$'),
        ]),
      ],
      cbu: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(20),
          Validators.maxLength(23),
        ]),
      ], //puede ingresar alias cbu o cvu
    });
    this.retirarDineroForm.valueChanges.subscribe(console.log);
  }

  submitRetirar() {
    console.log(this.retirarDineroForm.valid);
    if (!this.retirarDineroForm.valid) {
      this.retirarDineroForm.markAllAsTouched();
    }
  }

  seleccionarMetodoParaRetirar(opcion: number) {
    switch (opcion) {
      case 1:
        this.retirarMetodo = 'transferencia';
        break;
      default:
        break;
    }
  }
}
