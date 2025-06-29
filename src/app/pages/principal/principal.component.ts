import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import { IUsuario } from 'src/app/shared/model/usuario.interface';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss']
})
export class PrincipalComponent {
  usuarios: IUsuario[]=[];
  telaCadastrar = false;
  telaListar = false;

  constructor(
    private router: Router
  ){}

  aoClicarCadastrarUsuario(){
    this.router.navigate(['cadastrar-usuarios'])
  }
}
