import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DineroService } from '../dinero.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-transferir',
  templateUrl: './transferir.component.html',
  styleUrls: ['./transferir.component.css'],
})
export class TransferirComponent implements OnInit {
  transferirDineroForm: FormGroup = new FormGroup({});
  cuentaTransferida: any;
  cuentaAMostrar: any = { usuarios: [{ nombre_completo: '-' }], saldo: 0 };

  constructor(
    private fb: FormBuilder,
    private dineroService: DineroService,
    private router: Router
  ) {}

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
    let userJson = localStorage.getItem('auth');
    let user = {
      Id: 0,
    };
    if (userJson) {
      user = JSON.parse(userJson);
    }

    if (!this.transferirDineroForm.valid) {
      this.transferirDineroForm.markAllAsTouched();
    } else {
      // Buscar cuenta con el CVU dado
      const allCuentas: any = await this.dineroService
        .getAllCuentas()
        .toPromise();

      allCuentas.forEach((cuenta: any) => {
        if (cuenta.cvu === this.transferirDineroForm.get('cvu')?.value) {
          this.cuentaTransferida = cuenta;
        }
      });
      console.log(this.cuentaTransferida);

      // Si existe realizar las actualizaciones en cuenta, movimientos y transferencias
      if (this.cuentaTransferida?.cvu) {
        const cuentaNew = {
          ...this.cuentaTransferida,
          saldo:
            parseFloat(this.cuentaTransferida.saldo) +
            parseFloat(this.transferirDineroForm.get('monto')?.value),
        };
        console.log(cuentaNew);

        //Actualizar saldo en la cuenta que recibe
        const updateSaldoCuentaRecibe = await this.dineroService
          .updateCuenta(this.cuentaTransferida.id!, cuentaNew)
          .toPromise();

        console.log(updateSaldoCuentaRecibe);

        //Buscar cuenta que envia y actualizar saldo
        const cuentaEnvia: any = await this.dineroService
          .getCuentaPorId(user.Id)
          .toPromise();

        console.log(cuentaEnvia.saldo);

        const bodyCuentaEnvia = {
          ...cuentaEnvia,
          saldo:
            parseFloat(cuentaEnvia.saldo) -
            parseFloat(this.transferirDineroForm.get('monto')?.value),
        };
        console.log(bodyCuentaEnvia);

        const updateSaldoCuentaEnvia = await this.dineroService
          .updateCuenta(user.Id, bodyCuentaEnvia)
          .toPromise();
        console.log(updateSaldoCuentaEnvia);

        //Buscar cuenta recibe ya con el saldo actualizado
        const allCuentasNuevo: any = await this.dineroService
          .getAllCuentas()
          .toPromise();

        allCuentasNuevo.forEach((cuenta: any) => {
          if (cuenta.cvu === this.cuentaTransferida.cvu!) {
            this.cuentaAMostrar = cuenta;
            console.log(cuenta.saldo);
          }
        });

        // Registrar transferencia
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

        // Registrar movimiento para la cuenta que envia
        let bodyMovimientoEnvia = {
          fecha_hora: new Date(),
          monto: parseFloat(this.transferirDineroForm.get('monto')?.value) * -1,
          tipo_movimiento: 'Transferencia',
          id_cuenta: user.Id,
        };

        const movimientoEnviaRegistrado = await this.dineroService
          .registrarMovimiento(bodyMovimientoEnvia)
          .toPromise();

        console.log(movimientoEnviaRegistrado);

        // Registrar movimiento para la cuenta que recibe
        let bodyMovimientoRecibe = {
          fecha_hora: new Date(),
          monto: parseFloat(this.transferirDineroForm.get('monto')?.value),
          tipo_movimiento: 'Transferencia',
          id_cuenta: this.cuentaTransferida.id,
        };

        const movimientoRecibeRegistrado = await this.dineroService
          .registrarMovimiento(bodyMovimientoRecibe)
          .toPromise();
        console.log(movimientoRecibeRegistrado);

        this.cuentaTransferida = {};

        Swal.fire({
          icon: 'success',
          title: 'Registrado',
          text: 'Transferencia realizada correctamente',
          confirmButtonText: 'Aceptar',
        }).then(() => {
          this.router.navigate(['/consulta']);
        });
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
