import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  Validators,
} from '@angular/forms';
@Component({
  selector: 'app-ingresar',
  templateUrl: './ingresar.component.html',
  styleUrls: ['./ingresar.component.css'],
})
export class IngresarComponent implements OnInit {
  paymentMethod: string = '';
  ingresarDineroForm: FormGroup = new FormGroup({});
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
this.ingresarDineroForm = this.fb.group({
  metodoDePago: ['', [Validators.required]],
  monto: ['',[Validators.required, Validators.pattern("^[0-9]*$")]]
})
  }
  seleccionarMetodoDePago(opcion: number) {
    switch (opcion) {
      case 1:
        this.paymentMethod = 'transferencia';
        break;
      case 2:
        this.paymentMethod = 'efectivo';
        break;
      case 3:
        this.paymentMethod = 'tarjeta';
        break;
      default:
        break;
    }
  }
}
