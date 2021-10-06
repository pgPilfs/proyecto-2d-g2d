import { Component, OnInit } from '@angular/core';
import { DineroService } from '../../dinero.service';

@Component({
  selector: 'app-transferencia-ingreso',
  templateUrl: './transferencia-ingreso.component.html',
  styleUrls: ['./transferencia-ingreso.component.css'],
})
export class TransferenciaIngresoComponent implements OnInit {
  cvu: number = 0;
  userJson = localStorage.getItem('auth');
  user = {
    Id: 0,
  };
  constructor(private dineroService: DineroService) {
    if (this.userJson) {
      this.user = JSON.parse(this.userJson);
    }
  }

  ngOnInit(): void {
    this.dineroService.getCuentaPorId(this.user.Id).subscribe((res: any) => {
      this.cvu = res.cvu;
      console.log(res);
    });
  }
}
