import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioUsuarioComponent } from './formulario-usuario.component';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { IUsuario } from 'src/app/shared/model/usuario.interface';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

describe('FormularioUsuarioComponent', () => {
  let component: FormularioUsuarioComponent;
  let fixture: ComponentFixture<FormularioUsuarioComponent>;
  
  let service: jasmine.SpyObj<UsuarioService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(() => {
    service = jasmine.createSpyObj('UsuarioService', [
      'editar',
      'cadastrar',
      'consultarUsuarioSelecionadoar',
      'salvarUsuarioSelecionado'
    ]) as jasmine.SpyObj<UsuarioService>;

    let mockUsuario: IUsuario = {
      nome: 'rafael',
      email: 'rafael@gmail.com',
      senha: '123456',
      confirmarSenha: '123457'
    } as IUsuario;
    
    service.editar.and.returnValue(of({}as IUsuario));
    service.cadastrar.and.returnValue(of({}as IUsuario));
    service.consultarUsuarioSelecionadoar.and.returnValue((mockUsuario));

    router = jasmine.createSpyObj('Router', [
      'navigate'
      ]) as jasmine.SpyObj<Router>;
    router.navigate.and.returnValue(
      new Promise<boolean> ((resolve) => resolve(true))
    );

    TestBed.configureTestingModule({
      declarations: [FormularioUsuarioComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
        { provide: UsuarioService, useValue: service },
        { provide: Router, useValue: router }
      ]
    });
  });
  
  it('deve criar o componente', () => {
    fixture = TestBed.createComponent(FormularioUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
  
  it('deve criar o componente sem usuario salvo no servico', () => {
    let usuario!: IUsuario
    service.consultarUsuarioSelecionadoar.and.returnValue((usuario));
    fixture = TestBed.createComponent(FormularioUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component.habilitarBotao).toBe(true);
  });

  it('aoAlterarFormulario verificar se campos formulario esta válido', () => {
    fixture = TestBed.createComponent(FormularioUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.aoAlterarFormulario();
    expect(component.habilitarBotao).toBe(false);
  });

  it('aoAlterarFormulario verificar se campos formulario esta válido com dados incorretos', () => {
    let usuario = { nome: ''} as IUsuario;
    fixture = TestBed.createComponent(FormularioUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.usuario = usuario;
    component.aoAlterarFormulario();
    expect(component.habilitarBotao).toBe(true);
  });

  it('aoClicarVoltar deve voltar ', () => {
    fixture = TestBed.createComponent(FormularioUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.aoClicarVoltar();
    expect(router.navigate).toHaveBeenCalled();
  });

  it('aoClicarCancelar deve cancelar o cadastro e voltar a pagina', () => {
      fixture = TestBed.createComponent (FormularioUsuarioComponent)
      component = fixture.componentInstance;
      fixture.detectChanges();
      const destino = [''];
      component.aoClicarCancelar();
      expect(router.navigate).toHaveBeenCalledWith(destino);
  });
    

  it('aoClicarCadastrar deve cadastrar', () => {
    let usuario = { confirmarSenha: ''} as IUsuario;
    fixture = TestBed.createComponent(FormularioUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.usuario = usuario;  
    component.aoClicarCadastrar();

    expect(component.usuario.confirmarSenha).toBe('');
  });

  it('aoClicarCadastrar deve cadastrar', () => {
    let usuario = { nome: ''} as IUsuario;
    fixture = TestBed.createComponent(FormularioUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.usuario = usuario;
    component.aoClicarCadastrar();
    expect(service.cadastrar).toHaveBeenCalled();
  });

  it('aoClicarEditar deve editar o usuario no else', () => {
    let usuario = { confirmarSenha: ''} as IUsuario;
    fixture = TestBed.createComponent(FormularioUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.aoClicarEditar();
    component.usuario = usuario;
    expect(component.usuario).toBe(usuario);
  });

  it('aoClicarEditar deve editar o usuario', () => {
    let usuario = { nome: ''} as IUsuario;
    fixture = TestBed.createComponent(FormularioUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.usuario = usuario;
    component.aoClicarEditar();
    expect(component.usuario).toBe(usuario);
  });  
});
