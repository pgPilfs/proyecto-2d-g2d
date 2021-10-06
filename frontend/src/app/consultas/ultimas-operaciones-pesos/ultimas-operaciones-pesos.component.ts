import { Component, OnInit } from '@angular/core';
import { ConsultasService } from '../consultas.service';

@Component({
  selector: 'app-ultimas-operaciones-pesos',
  templateUrl: './ultimas-operaciones-pesos.component.html',
  styleUrls: ['./ultimas-operaciones-pesos.component.css'],
})
export class UltimasOperacionesPesosComponent implements OnInit {
  movimientos: any[] = [];

  constructor(private consultasService: ConsultasService) {}

  // Ejemplo como si el usuarios con id 2 estaria logueado
  // Con authenticacion seria getMovimientosUsuario(idUsuarioLogueado)
  ngOnInit(): void {
    let userJson = localStorage.getItem('auth');
    let user = {
      Id: 0,
    };
    if (userJson) {
      user = JSON.parse(userJson);
    }
    this.consultasService.getCuentaActual(user.Id).subscribe((res: any) => {
      this.movimientos = res.movimientos;
      console.log(res);
    });
  }
}
