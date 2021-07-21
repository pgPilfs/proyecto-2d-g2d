import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
@Component({
  selector: 'app-retirar',
  templateUrl: './retirar.component.html',
  styleUrls: ['./retirar.component.css'],
})
export class RetirarComponent implements OnInit {
  retirarMetodo: string = '';
  retirarDineroForm: FormGroup = new FormGroup({});
  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.retirarDineroForm = this.fb.group({
      monto:['',[Validators.required]],
      cbu:['',[Validators.required, Validators.minLength(20),Validators.maxLength(23)]]
      
    })
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
