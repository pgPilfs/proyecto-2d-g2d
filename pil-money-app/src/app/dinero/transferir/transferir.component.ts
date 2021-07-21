import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
@Component({
  selector: 'app-transferir',
  templateUrl: './transferir.component.html',
  styleUrls: ['./transferir.component.css'],
})
export class TransferirComponent implements OnInit {
  retirarMetodo: string = '';
  transferirDineroForm: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.transferirDineroForm = this.fb.group({
      monto:['',[Validators.required]],
      cbu:['',[Validators.required]]
    })
  }
}
