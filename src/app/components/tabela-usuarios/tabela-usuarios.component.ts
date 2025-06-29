import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import { IUsuario } from 'src/app/shared/model/usuario.interface';

@Component({
  selector: 'app-tabela-usuarios',
  templateUrl: './tabela-usuarios.component.html',
  styleUrls: ['./tabela-usuarios.component.scss']
})
export class TabelaUsuariosComponent implements OnInit {

  @Input()
  usuarios: IUsuario[]= [];
  confirmado: boolean = false;
  mostrarModal: boolean = false;

   constructor(
      private router: Router,
      private service: UsuarioService
    ){}


    ngOnInit(): void {
     this.listarUsuarios();
    }
  
    listarUsuarios():void{
      this.service.listarUsuarios().subscribe((usuarios)=>{
        this.usuarios = usuarios;
      })
    }
    
    aoClicarCadastrar(rota: string){
      this.router.navigate([rota]);
    }
    
    aoClicarEditar(usuario: IUsuario){
      this.service.salvarUsuarioSelecionado(usuario);
      this.router.navigate(['cadastrar-usuarios']);
    }
        
    confirmarExclusao(usuario: IUsuario, confirmacao: boolean){
      this.mostrarModal = true;
      if(!confirmacao){
        this.mostrarModal = true;
      } else{
        this.mostrarModal = false;
        this.aoClicarExcluir(usuario);
      }
  }

    aoClicarExcluir(usuario: IUsuario){
        this.service.remover(usuario.id).subscribe(() => {
          const posicao = this.usuarios.findIndex(obj => obj.id === usuario.id);
          this.usuarios.splice(posicao, 1);
          this.listarUsuarios();
          alert('Cliente removido com sucesso!');
        });
    }
}
