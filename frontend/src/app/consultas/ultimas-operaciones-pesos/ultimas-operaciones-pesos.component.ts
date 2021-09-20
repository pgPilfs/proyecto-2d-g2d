import { Component, OnInit } from '@angular/core';
import { ConsultasService } from '../consultas.service';
import * as moment from 'moment';

@Component({
  selector: 'app-ultimas-operaciones-pesos',
  templateUrl: './ultimas-operaciones-pesos.component.html',
  styleUrls: ['./ultimas-operaciones-pesos.component.css']
})
export class UltimasOperacionesPesosComponent implements OnInit {

  get listadoMovimientos(){
    return this.consultasService.listadoMovimientos;
  }

  getFormat(fecha: any){
    return moment(fecha).format('DD/MM/YYYY hh:mm')
  }

  constructor( private  consultasService: ConsultasService) { }

  ngOnInit(): void {
    this.consultasService.buscarListadoMovimientos();
  }

}
