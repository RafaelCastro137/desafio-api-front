import { TestBed } from '@angular/core/testing';

import { UsuarioService } from './usuario.service';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { IUsuario } from '../shared/model/usuario.interface';

describe('UsuarioService', () => {
  let service: UsuarioService;
  let httpMock: jasmine.SpyObj<HttpClient>

  beforeEach(() => {

    httpMock = jasmine.createSpyObj('HttpClient', [
        'put',
        'get',
        'post',
        'delete'
    ]) as jasmine.SpyObj<HttpClient>;
  });

  it('#remover deve executar com sucesso', (done: DoneFn) => {
    const usuario: IUsuario = {
        id: 1,
        nome: 'Rafael'
    } as IUsuario;

    const resposta$: Observable<null> = of(null);
    httpMock.delete.and.returnValue(resposta$);
    service = new UsuarioService(httpMock);
    service.remover(usuario.id).subscribe({
      next: (resposta) => {
        expect(resposta).toBeNull();
      },
      complete: () => done()
    });
  });
 
  it('#remover deve retornar erro', (done: DoneFn) => {
    const usuario: IUsuario = {} as IUsuario;

    httpMock.delete.and.returnValue(throwError(() => new Error('erro esperado')));
    service = new UsuarioService(httpMock);
    service.remover(usuario.id).subscribe({
      next: () => fail('deveria lançar exceção'),
      error: (error) => {
        expect(error).toBeTruthy();
        done();
      },
      complete: () => fail('deveria lançar exceção')
    });
  });

  it('#cadastrar deve executar com sucesso', (done: DoneFn) => {
    const usuario: IUsuario = { nome: 'Rafael' } as IUsuario;
    const resposta$: Observable<IUsuario> = of({
        nome: 'Rafael'
    } as IUsuario);
    httpMock.post.and.returnValue(resposta$);
    service = new UsuarioService(httpMock);
    service.cadastrar(usuario).subscribe({
      next: (usuario) => {
        expect(usuario.nome).toBe('Rafael');
      },
      complete: () => done()
    });
  });

  it('#cadastrar deve retornar erro', (done: DoneFn) => {
    const usuario: IUsuario = {} as IUsuario;
    httpMock.post.and.returnValue(throwError(() => new Error('erro esperado')));
    service = new UsuarioService(httpMock);
    service.cadastrar(usuario).subscribe({
      next: () => fail('deveria lançar exceção'),
      error: (error) => {
        expect(error).toBeTruthy();
        done();
      },
      complete: () => fail('deveria lançar exceção')
    });
  });

  it('#editar deve executar com sucesso', (done: DoneFn) => {
    const usuario: IUsuario = { nome: 'Rafael' } as IUsuario;
    const resposta$: Observable<IUsuario> = of({
        nome: 'Rafael'
    } as IUsuario);
    httpMock.put.and.returnValue(resposta$);
    service = new UsuarioService(httpMock);
    service.editar(usuario).subscribe({
      next: (usuario) => {
        expect(usuario.nome).toBe('Rafael');
      },
      complete: () => done()
    });
  });
  
  it('#editar deve retornar erro', (done: DoneFn) => {
    const usuario: IUsuario = {} as IUsuario;
    httpMock.put.and.returnValue(throwError(() => new Error('erro esperado')));
    service = new UsuarioService(httpMock);
    service.editar(usuario).subscribe({
      next: () => fail('deveria lançar exceção'),
      error: (error) => {
        expect(error).toBeTruthy();
        done();
      },
      complete: () => fail('deveria lançar exceção')
    });
  });
  
  it('#listarUsuarios deve executar com sucesso', (done: DoneFn) => {
      const usuario: IUsuario = { nome: 'Rafael' } as IUsuario;
      const listaUsuarios = [{nome: 'Rafael'} as IUsuario]
      const resposta$: Observable<IUsuario[]> = of(listaUsuarios);
      httpMock.get.and.returnValue(resposta$);
      service = new UsuarioService(httpMock);
      service.listarUsuarios().subscribe({
          next: (usuarios) => {
              expect(usuarios).toBe(listaUsuarios);
            },
            complete: () => done()
        });
    });
    
    it('#listarUsuarios deve retornar erro', (done: DoneFn) => {
      httpMock.get.and.returnValue(throwError(() => new Error('erro esperado')));
      service = new UsuarioService(httpMock);
      service.listarUsuarios().subscribe({
        next: () => fail('deveria lançar exceção'),
        error: (error) => {
          expect(error).toBeTruthy();
          done();
        },
        complete: () => fail('deveria lançar exceção')
      });
    });

    it('#salvarFiltrosMacroEstrategia deve salvar filtro da MacroEstrategia', () => {
        service = new UsuarioService(httpMock);
    const usuario = {
      id: 1
    } as IUsuario;
    service.salvarUsuarioSelecionado(usuario);
    expect(service.usuario).toBe(usuario);
  });
 
  it('#consultarMacroEstrategia deve consultar a MacroEstrategia', () => {
    service = new UsuarioService(httpMock);
    const id = 1;
    service.usuario = {
      id: id
    } as IUsuario;
    const usuario = service.consultarUsuarioSelecionadoar();
    expect(usuario.id).toBe(id);
  });
});
