import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import { IUsuario } from 'src/app/shared/model/usuario.interface';

@Component({
  selector: 'app-formulario-usuario',
  templateUrl: './formulario-usuario.component.html',
  styleUrls: ['./formulario-usuario.component.scss']
})
export class FormularioUsuarioComponent implements OnInit {
  usuarios: IUsuario []=[];
  usuario!: IUsuario;

  isEditar!:boolean;

  errorCadastrar!:boolean;
  habilitarBotao:boolean = true;
  mensagemErro!: string;

   constructor(
      private router: Router,
      private service: UsuarioService
    ){}

  ngOnInit(): void {
    this.usuario = this.service.consultarUsuarioSelecionadoar();

    if(!this.usuario){
      this.usuario = new IUsuario();
      this.usuario.confirmarSenha = ''

      this.isEditar = false;
    }else{
      this.isEditar = true;
    }
  }

  aoAlterarFormulario(){
    if (
      this.usuario.nome === '' ||
      this.usuario.email === '' ||
      this.usuario.senha === '' ||
      this.usuario.confirmarSenha === ''
     ){
        this.habilitarBotao = true;
      }
      else{
        this.habilitarBotao = false;
      }
  }

  aoClicarVoltar(){
    this.router.navigate([''])
  }

  aoClicarCancelar(){
    let usuario!: IUsuario;
    this.service.salvarUsuarioSelecionado(usuario);

    this.router.navigate([''])
  }

  aoClicarCadastrar(): void {
    if (
      this.usuario.senha !== this.usuario.confirmarSenha
    ) {
      this.mensagemErro = 'As senhas não coincidem.';
      this.errorCadastrar = true;
    } else {
      const requisicao = {
        nome: this.usuario.nome,
        email: this.usuario.email,
        senha: this.usuario.senha
      } as IUsuario;

      this.service.cadastrar(requisicao).subscribe({
        next: (retorno) => {
          this.errorCadastrar = false;

          this.usuarios.push(retorno);
          this.usuario = new IUsuario();
          this.router.navigate(['/']);
          alert('Cliente cadastrado com sucesso!');
        },
        error: (err: any) => {
          this.errorCadastrar = true;
          this.mensagemErro = err.error.errors[0].defaultMessage;
        }
      });
    }
  }
  
  aoClicarEditar():void{
    if (
      this.usuario.senha !== this.usuario.confirmarSenha
    ) {
      this.mensagemErro = 'As senhas não coincidem.';
      this.errorCadastrar = true;
    } else {
      const requisicao = {
        id: this.usuario.id,
        nome: this.usuario.nome,
        email: this.usuario.email,
        senha: this.usuario.senha
      } as IUsuario;
          this.service.editar(requisicao).subscribe({
            next: (retorno) => {
              this.usuarios.push(retorno);
              let posicao = this.usuarios.findIndex((obj)=>{
                return obj.id == retorno.id;
              });

              this.usuarios[posicao] = retorno;
              let usuario!: IUsuario;
              this.service.salvarUsuarioSelecionado(usuario);  

              this.router.navigate([''])
            alert('Cliente editado com sucesso!')
            },
            error: (err: any) => {
              this.errorCadastrar = true;
              this.mensagemErro = err.error.errors[0].defaultMessage;
            }
          })
    }
  }
}


