import { Component, OnInit } from '@angular/core';
import { ConsultasService } from '../consultas.service';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.css'],
})
export class ConsultaComponent implements OnInit {
  saldo: number = 0;

  constructor(private consultasService: ConsultasService) {}

  ngOnInit(): void {
    this.consultasService.getCuentaActual(3).subscribe((res: any) => {
      this.saldo = res.saldo;
      console.log(res);
    });
  }
}
