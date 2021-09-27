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
  selector: 'app-tarjeta-ingreso',
  templateUrl: './tarjeta-ingreso.component.html',
  styleUrls: ['./tarjeta-ingreso.component.css'],
})
export class TarjetaIngresoComponent implements OnInit {
  ingresoTarjeta: FormGroup = new FormGroup({});
  constructor(private fb: FormBuilder, private dineroService: DineroService) {}

  ngOnInit(): void {
    this.ingresoTarjeta = this.fb.group({
      monto: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[0-9]*$'),
        ]),
      ],
    });
    this.ingresoTarjeta.valueChanges.subscribe(console.log);
  }

  async submitIngresoTarjeta() {
    let bodyMovimiento = {
      fecha_hora: new Date(),
      monto: parseFloat(this.ingresoTarjeta.value.monto),
      tipo_movimiento: 'Tarjeta-Debito',
      id_cuenta: 2,
    };
    console.log(bodyMovimiento);

    const res = await this.dineroService
      .registrarMovimiento(bodyMovimiento)
      .toPromise();

    const cuenta: any = await this.dineroService.getCuentaPorId(2).toPromise();

    const bodyCuenta = {
      ...cuenta,
      saldo:
        parseFloat(cuenta.saldo) +
        parseFloat(this.ingresoTarjeta.get('monto')?.value),
    };

    const updateSaldoCuentaEnvia = await this.dineroService
      .updateCuenta(2, bodyCuenta)
      .toPromise();

    console.log(updateSaldoCuentaEnvia);
    if (res) {
      Swal.fire({
        icon: 'success',
        title: 'Listo!',
        text: 'Carga por debito realizada',
        confirmButtonText: 'Aceptar',
      });
    }
  }
}
