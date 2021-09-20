import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConsultasService {

  public listadoMovimientos : any[] = [];

  constructor(private http: HttpClient) { }

  async buscarListadoMovimientos () {
    this.http.get('https://localhost:44346/api/movimientos').subscribe((res: any) =>{
         console.log(res); 
         this.listadoMovimientos = res;
    });
  }  
  
}
