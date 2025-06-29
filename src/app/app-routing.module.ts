import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrincipalComponent } from './pages/principal/principal.component';
import { TabelaUsuariosComponent } from './components/tabela-usuarios/tabela-usuarios.component';
import { FormularioUsuarioComponent } from './components/formulario-usuario/formulario-usuario.component';

const routes: Routes = [
  { path: '', redirectTo: 'principal', pathMatch: 'full' }, // Rota padrão
  { path: 'principal', component: PrincipalComponent },
  { path: 'listar-usuarios', component: TabelaUsuariosComponent },
  { path: 'cadastrar-usuarios', component: FormularioUsuarioComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
