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
  selector: 'app-efectivo-ingreso',
  templateUrl: './efectivo-ingreso.component.html',
  styleUrls: ['./efectivo-ingreso.component.css'],
})
export class EfectivoIngresoComponent implements OnInit {
  ingresoEfectivo: FormGroup = new FormGroup({});
  constructor(
    private fb: FormBuilder,
    private dineroService: DineroService,
    private router: Router
  ) {}
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
    let userJson = localStorage.getItem('auth');
    let user = {
      Id: 0,
    };
    if (userJson) {
      user = JSON.parse(userJson);
    }

    let bodyMovimiento = {
      fecha_hora: new Date(),
      monto: parseFloat(this.ingresoEfectivo.value.monto),
      tipo_movimiento: this.ingresoEfectivo.value.pago,
      id_cuenta: user.Id,
    };
    console.log('BODY MOVIMIENTO', bodyMovimiento);

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
        parseFloat(this.ingresoEfectivo.get('monto')?.value),
    };

    const updateSaldoCuentaEnvia = await this.dineroService
      .updateCuenta(user.Id, bodyCuenta)
      .toPromise();

    console.log(updateSaldoCuentaEnvia);

    if (res) {
      Swal.fire({
        icon: 'success',
        title: 'Listo!',
        text: 'Carga en efectivo realizada',
        confirmButtonText: 'Aceptar',
      }).then(()=>{
        this.router.navigate(['/consulta']);
      });
    }
  }
}
