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

  async submitTransferencia() {
    if (!this.transferirDineroForm.valid) {
      this.transferirDineroForm.markAllAsTouched();
    } else {
      const allCuentas: any = await this.dineroService
        .getAllCuentas()
        .toPromise();

      allCuentas.forEach((cuenta: any) => {
        if (cuenta.cvu === this.transferirDineroForm.get('cvu')?.value) {
          this.cuentaTransferida = cuenta;
        }
      });
      console.log(this.cuentaTransferida);
      if (this.cuentaTransferida?.cvu) {
        const cuentaNew = {
          id: this.cuentaTransferida.id,
          transferencias: this.cuentaTransferida.transferencias,
          transferencias1: this.cuentaTransferida.transferencias1,
          usuarios: this.cuentaTransferida.usuarios,
          tipo_cuenta: this.cuentaTransferida.tipo_cuenta,
          movimientos: this.cuentaTransferida.movimientos,
          fecha_alta: this.cuentaTransferida.fecha_alta,
          id_tipo_cuenta: this.cuentaTransferida.id_tipo_cuenta,
          cvu: this.cuentaTransferida.cvu,
          estado: this.cuentaTransferida.estado,
          saldo:
            parseFloat(this.cuentaTransferida.saldo) +
            parseFloat(this.transferirDineroForm.get('monto')?.value),
        };
        console.log(cuentaNew);

        const updateSaldo = await this.dineroService
          .updateCuenta(this.cuentaTransferida.id!, cuentaNew)
          .toPromise();

        console.log(updateSaldo);

        const allCuentasNuevo: any = await this.dineroService
          .getAllCuentas()
          .toPromise();

        allCuentasNuevo.forEach((cuenta: any) => {
          if (cuenta.cvu === this.cuentaTransferida.cvu!) {
            this.cuentaAMostrar = cuenta;
            console.log(cuenta.saldo);
          }
        });

        let bodyTransferencia = {
          fecha_hora: new Date(),
          monto: parseFloat(this.transferirDineroForm.get('monto')?.value),
          id_cuenta_envia: 2,
          id_cuenta_recibe: this.cuentaTransferida.id,
        };

        const transferenciaRegistrada = await this.dineroService
          .registrarTransferencia(bodyTransferencia)
          .toPromise();
        console.log(transferenciaRegistrada);

        let bodyMovimiento = {
          fecha_hora: new Date(),
          monto: parseFloat(this.transferirDineroForm.get('monto')?.value) * -1,
          tipo_movimiento: 'Transferencia',
          id_cuenta: 2,
        };

        const movimientoRegistrado = await this.dineroService
          .registrarMovimiento(bodyMovimiento)
          .toPromise();

        console.log(movimientoRegistrado);
        this.cuentaTransferida = {};
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No existe una cuenta vinculada al CVU dado',
          confirmButtonText: 'Aceptar',
        });
      }
    }
  }
}
