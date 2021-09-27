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

  // Ejemplo como si el usuarios con id 3 estaria logueado
  // Con authenticacion seria getMovimientosUsuario(idUsuarioLogueado)
  ngOnInit(): void {
    this.consultasService.getCuentaActual(3).subscribe((res: any) => {
      this.movimientos = res.movimientos;
      console.log(res);
    });
  }
}
