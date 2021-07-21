import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { IngresarComponent } from './dinero/ingresar/ingresar.component';
import { RetirarComponent } from './dinero/retirar/retirar.component';
import { GirarComponent } from './dinero/girar/girar.component';
import { TransferirComponent } from './dinero/transferir/transferir.component';
import { LoginComponent } from './pages/login/login.component';
import { FooterComponent } from './layout/footer/footer.component';
import { HeaderComponent } from './layout/header/header.component';
import { ConsultaComponent } from './consultas/consulta/consulta.component';
import { CrearComponent } from './usuario/crear/crear.component';
import { ModificarComponent } from './usuario/modificar/modificar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UltimasOperacionesPesosComponent } from './consultas/ultimas-operaciones-pesos/ultimas-operaciones-pesos.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    IngresarComponent,
    RetirarComponent,
    GirarComponent,
    TransferirComponent,
    LoginComponent,
    FooterComponent,
    HeaderComponent,
    ConsultaComponent,
    CrearComponent,
    ModificarComponent,
<<<<<<< HEAD
    UltimasOperacionesPesosComponent
=======
>>>>>>> Maxi
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
<<<<<<< HEAD
    ReactiveFormsModule
=======
    FormsModule,
    ReactiveFormsModule,

>>>>>>> Maxi
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
