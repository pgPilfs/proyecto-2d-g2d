import { Component, OnInit } from '@angular/core';
import { DineroService } from '../../dinero.service';

@Component({
  selector: 'app-transferencia-ingreso',
  templateUrl: './transferencia-ingreso.component.html',
  styleUrls: ['./transferencia-ingreso.component.css'],
})
export class TransferenciaIngresoComponent implements OnInit {
  cvu: number = 0;
  constructor(private dineroService: DineroService) {}

  ngOnInit(): void {
    this.dineroService.getCuentaActual(3).subscribe((res: any) => {
      this.cvu = res.cvu;
      console.log(res);
    });
  }
}
