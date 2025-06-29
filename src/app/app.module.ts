import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PrincipalComponent } from './pages/principal/principal.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { TabelaUsuariosComponent } from './components/tabela-usuarios/tabela-usuarios.component';
import { FormularioUsuarioComponent } from './components/formulario-usuario/formulario-usuario.component';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    PrincipalComponent,
    TabelaUsuariosComponent,
    FormularioUsuarioComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    TableModule,
    DialogModule,
    ButtonModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
