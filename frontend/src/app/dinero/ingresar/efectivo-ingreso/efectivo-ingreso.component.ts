import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { DineroService } from '../../dinero.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-efectivo-ingreso',
  templateUrl: './efectivo-ingreso.component.html',
  styleUrls: ['./efectivo-ingreso.component.css'],
})
export class EfectivoIngresoComponent implements OnInit {
  ingresoEfectivo: FormGroup = new FormGroup({});
  constructor(private fb: FormBuilder, private dineroService: DineroService) {}
  radioPago: FormControl = new FormControl();

  ngOnInit(): void {
    this.ingresoEfectivo = this.fb.group({
      monto: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[0-9]*$'),
        ]),
      ],
      pago: [this.radioPago, Validators.required],
    });
    this.ingresoEfectivo.valueChanges.subscribe(console.log);
  }

  async submitIngresoEfectivo() {
    let bodyMovimiento = {
      fecha_hora: new Date(),
      monto: parseFloat(this.ingresoEfectivo.value.monto),
      tipo_movimiento: this.ingresoEfectivo.value.pago,
      id_cuenta: 2,
    };
    console.log("BODY MOVIMIENTO",bodyMovimiento);

    const res = await this.dineroService
      .registrarMovimiento(bodyMovimiento)
      .toPromise();

    const cuenta: any = await this.dineroService.getCuentaPorId(2).toPromise();

    const bodyCuenta = {
      ...cuenta,
      saldo:
        parseFloat(cuenta.saldo) +
        parseFloat(this.ingresoEfectivo.get('monto')?.value),
    };

    const updateSaldoCuentaEnvia = await this.dineroService
      .updateCuenta(2, bodyCuenta)
      .toPromise();

    console.log(updateSaldoCuentaEnvia);

    if (res) {
      Swal.fire({
        icon: 'success',
        title: 'Listo!',
        text: 'Carga en efectivo realizada',
        confirmButtonText: 'Aceptar',
      });
    }
  }
}
