import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { DineroService } from '../../dinero.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tarjeta-ingreso',
  templateUrl: './tarjeta-ingreso.component.html',
  styleUrls: ['./tarjeta-ingreso.component.css'],
})
export class TarjetaIngresoComponent implements OnInit {
  ingresoTarjeta: FormGroup = new FormGroup({});
  constructor(
    private fb: FormBuilder,
    private dineroService: DineroService,
    private router: Router
  ) {}

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
    let userJson = localStorage.getItem('auth');
    let user = {
      Id: 0,
    };
    if (userJson) {
      user = JSON.parse(userJson);
    }
    let bodyMovimiento = {
      fecha_hora: new Date(),
      monto: parseFloat(this.ingresoTarjeta.value.monto),
      tipo_movimiento: 'Tarjeta-Debito',
      id_cuenta: user.Id,
    };
    console.log(bodyMovimiento);

    const res = await this.dineroService
      .registrarMovimiento(bodyMovimiento)
      .toPromise();

    const cuenta: any = await this.dineroService
      .getCuentaPorId(user.Id)
      .toPromise();

    const bodyCuenta = {
      ...cuenta,
      saldo:
        parseFloat(cuenta.saldo) +
        parseFloat(this.ingresoTarjeta.get('monto')?.value),
    };

    const updateSaldoCuentaEnvia = await this.dineroService
      .updateCuenta(user.Id, bodyCuenta)
      .toPromise();

    console.log(updateSaldoCuentaEnvia);
    if (res) {
      Swal.fire({
        icon: 'success',
        title: 'Listo!',
        text: 'Carga por debito realizada',
        confirmButtonText: 'Aceptar',
      }).then(() => {
        this.router.navigate(['/consulta']);
      });
    }
  }
}
