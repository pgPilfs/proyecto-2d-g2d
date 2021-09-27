import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DineroService } from '../dinero.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-retirar',
  templateUrl: './retirar.component.html',
  styleUrls: ['./retirar.component.css'],
})
export class RetirarComponent implements OnInit {
  retiroDinero!: FormGroup;
  constructor(private fb: FormBuilder, private dineroService: DineroService) {}

  ngOnInit(): void {
    this.retiroDinero = this.fb.group({
      monto: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[0-9]*$'),
        ]),
      ],
    });
    this.retiroDinero.valueChanges.subscribe(console.log);
  }

  async submitRetiroDinero() {
    let bodyMovimiento = {
      fecha_hora: new Date(),
      monto: parseFloat(this.retiroDinero.value.monto),
      tipo_movimiento: 'Retiro cajero',
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
        parseFloat(cuenta.saldo) -
        parseFloat(this.retiroDinero.get('monto')?.value),
    };

    const updateSaldoCuenta = await this.dineroService
      .updateCuenta(2, bodyCuenta)
      .toPromise();

    console.log(updateSaldoCuenta);
    if (res) {
      Swal.fire({
        icon: 'success',
        title: 'Listo!',
        text: 'Retiro de dinero realizado',
        confirmButtonText: 'Aceptar',
      });
    }
  }
}
