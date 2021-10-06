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
    let userJson = localStorage.getItem('auth');
    let user = {
      Id: 0,
    };
    if (userJson) {
      user = JSON.parse(userJson);
    }
    this.consultasService.getCuentaActual(user.Id).subscribe((res: any) => {
      this.saldo = res.saldo;
      console.log(res);
    });
  }
}
