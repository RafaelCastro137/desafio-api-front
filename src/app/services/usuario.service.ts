import { Injectable } from '@angular/core';
import { IUsuario } from '../shared/model/usuario.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private url: string = 'http://localhost:8080'

  usuario!: IUsuario;

  constructor(
    private http: HttpClient
  ) { }

  listarUsuarios(): Observable<IUsuario[]> {
    return this.http.get<IUsuario[]>(this.url);
  }

  cadastrar(obj: IUsuario): Observable<IUsuario> {
    return this.http.post<IUsuario>(this.url, obj);
  }

  editar(obj: IUsuario): Observable<IUsuario> {
    return this.http.put<IUsuario>(this.url, obj);
  }

  remover(codigo: number): Observable<null> {
    return this.http.delete<null>(this.url + '/' + codigo);
  }

  salvarUsuarioSelecionado(obj: IUsuario){
    this.usuario= obj;
  }

  consultarUsuarioSelecionadoar(): IUsuario{
    return this.usuario ;
  }
}
