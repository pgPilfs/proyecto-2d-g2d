import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  Validators,
} from '@angular/forms';
import { DineroService } from '../dinero.service';
import Swal from 'sweetalert2';
import { mergeMap } from 'rxjs/operators';
// import moment from 'moment';

@Component({
  selector: 'app-transferir',
  templateUrl: './transferir.component.html',
  styleUrls: ['./transferir.component.css'],
})
export class TransferirComponent implements OnInit {
  transferirDineroForm: FormGroup = new FormGroup({});
  cuentaTransferida: any;
  cuentaAMostrar: any = { usuarios: [{ nombre_completo: '-' }], saldo: 0 };

  constructor(private fb: FormBuilder, private dineroService: DineroService) {}

  ngOnInit(): void {
    this.transferirDineroForm = this.fb.group({
      monto: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[0-9]*$'),
        ]),
      ],
      cvu: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(23),
        ]),
      ],
    });
    //this.transferirDineroForm.valueChanges.subscribe(console.log);
  }

  submitTransferencia() {
    if (!this.transferirDineroForm.valid) {
      this.transferirDineroForm.markAllAsTouched();
    } else {
      this.dineroService.getAllCuentas().subscribe((res: any) => {
        res.forEach((cuenta: any) => {
          if (cuenta.cvu === this.transferirDineroForm.get('cvu')?.value) {
            this.cuentaTransferida = cuenta;
          }
        });

        if (this.cuentaTransferida?.cvu) {
          this.updateCuenta();
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No existe una cuenta vinculada al CVU dado',
            confirmButtonText: 'Aceptar',
          });
        }
      });
    }
  }
  updateCuenta() {
    const cuentaNew = {
      ...this.cuentaTransferida,
      saldo:
        parseFloat(this.cuentaTransferida.saldo) +
        parseFloat(this.transferirDineroForm.get('monto')?.value),
    };
    console.log(cuentaNew);
    this.dineroService
      .updateCuenta(this.cuentaTransferida.id!, cuentaNew)
      .subscribe((res) => {
        if (res === null) {
          this.getCuenta(this.cuentaTransferida.cvu!);
          this.registrarTransferencia();
          Swal.fire({
            icon: 'success',
            title: 'Completado',
            text: 'Transferencia realizada con éxito',
            confirmButtonText: 'Aceptar',
          });
        }
      });
  }

  getCuenta(cvu: any) {
    this.dineroService.getAllCuentas().subscribe((res: any) => {
      res.forEach((cuenta: any) => {
        if (cuenta.cvu === cvu) {
          this.cuentaAMostrar = cuenta;
        }
      });
    });
  }

  registrarTransferencia() {
    let body = {
      fecha_hora: new Date(),
      monto: parseFloat(this.transferirDineroForm.get('monto')?.value),
      id_cuenta_envia: 3,
      id_cuenta_recibe: this.cuentaTransferida.id,
    };
    this.cuentaTransferida = {};
    this.dineroService.registrarTransferencia(body).subscribe((res) => {
      console.log(res);
      this.registrarMovimiento();
    });
  }

  registrarMovimiento() {
    let body = {
      fecha_hora: new Date(),
      monto: parseFloat(this.transferirDineroForm.get('monto')?.value) * -1,
      tipo_movimiento: 'Transferencia',
      id_cuenta: 3,
    };

    this.dineroService.registrarMovimiento(body).subscribe((res) => {
      console.log(res);
      this.cuentaTransferida = {};
    });
  }
}
