import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {
  mail= new FormControl('', [Validators.required, Validators.email]);
  name=new FormControl('', [Validators.required, Validators.minLength(4)]);
  mensaje=new FormControl('', [Validators.required, Validators.maxLength(500)]);
  constructor() { }

  ngOnInit(): void {
  }
get mailField(){
return this.mail;
}
get nameField(){
return this.name;
}
get mensajeFiel(){
  return this.mensaje;
}
}
