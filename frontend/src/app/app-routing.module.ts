import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ConsultaComponent } from './consultas/consulta/consulta.component';
import { GirarComponent } from './dinero/girar/girar.component';
import { IngresarComponent } from './dinero/ingresar/ingresar.component';
import { RetirarComponent } from './dinero/retirar/retirar.component';
import { TransferirComponent } from './dinero/transferir/transferir.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { LoginComponent } from './pages/login/login.component';
import { CrearComponent } from './usuario/crear/crear.component';
import { ModificarComponent } from './usuario/modificar/modificar.component';
import { UltimasOperacionesPesosComponent } from './consultas/ultimas-operaciones-pesos/ultimas-operaciones-pesos.component';

const routes: Routes = [
  // HOME PAGE
  { path: '', component: LandingPageComponent },

  //OPERACIONES DE DINERO
  {
    path: 'dinero',
    children: [
      { path: 'ingresar', component: IngresarComponent },
      { path: 'retirar', component: RetirarComponent },
      { path: 'transferir', component: TransferirComponent },
      { path: 'girar', component: GirarComponent },
    ],
  },

  //Consulta
  {
    path: 'consulta',
    children: [
      { path: '', component: ConsultaComponent },
      { path: 'operaciones', component: UltimasOperacionesPesosComponent },
    ],
  },

  //login, modificar, crear USUARIOS
  { path: 'login', component: LoginComponent },
  { path: 'registrar', component: CrearComponent },
  { path: 'modificar', component: ModificarComponent },

  { path: '**', component: LandingPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

/*
,
    children: [
    { path: 'ingresar', component: IngresarComponent },
    { path: 'retirar', component: RetirarComponent },
    { path: 'transferir', component: TransferirComponent },
    { path: 'girar', component: GirarComponent }],
*/
