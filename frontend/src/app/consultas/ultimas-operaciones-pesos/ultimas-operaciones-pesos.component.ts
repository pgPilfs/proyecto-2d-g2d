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

  ngOnInit(): void {
    this.consultasService.getAllMovimientos().subscribe((res: any) => {
      this.movimientos = res;
      console.log(this.movimientos);
    });
  }
}
