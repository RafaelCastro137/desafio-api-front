import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioService } from 'src/app/services/usuario.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { IUsuario } from 'src/app/shared/model/usuario.interface';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { TabelaUsuariosComponent } from './tabela-usuarios.component';

describe('TabelaUsuariosComponent', () => {
  let component: TabelaUsuariosComponent;
  let fixture: ComponentFixture<TabelaUsuariosComponent>;
  
  let service: jasmine.SpyObj<UsuarioService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(() => {
    service = jasmine.createSpyObj('UsuarioService', [
      'listarUsuarios',
      'salvarUsuarioSelecionado',
      'remover'
    ]) as jasmine.SpyObj<UsuarioService>;
    
    service.listarUsuarios.and.returnValue(of([{} as IUsuario]));
    service.salvarUsuarioSelecionado.and.returnValue();
    service.remover.and.returnValue(of());

    router = jasmine.createSpyObj('Router', [
      'navigate'
      ]) as jasmine.SpyObj<Router>;
    router.navigate.and.returnValue(
      new Promise<boolean> ((resolve) => resolve(true))
    );

    TestBed.configureTestingModule({
      declarations: [TabelaUsuariosComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
        { provide: UsuarioService, useValue: service },
        { provide: Router, useValue: router }
      ]
    });

  });
  
  it('should create', () => {
    fixture = TestBed.createComponent(TabelaUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });


  it('aoClicarCadastrar deve navegar para tela cadastrar', () => {
      fixture = TestBed.createComponent (TabelaUsuariosComponent)
      component = fixture.componentInstance;
      fixture.detectChanges();
      const destino = [''];
      component.aoClicarCadastrar('');
      expect(router.navigate).toHaveBeenCalledWith(destino);
  });

  it('aoClicarEditar deve salvarUsuarioSelecionado e navegar para tela cadastrar', () => {
      fixture = TestBed.createComponent (TabelaUsuariosComponent)
      component = fixture.componentInstance;
      fixture.detectChanges();
      const destino = ['cadastrar-usuarios'];
      let usuario = {} as IUsuario;
      component.aoClicarEditar(usuario);
      expect(router.navigate).toHaveBeenCalledWith(destino);
  });

  it('confirmarExclusao deve confirmar Exclusao e não mostrar modal', () => {
      fixture = TestBed.createComponent (TabelaUsuariosComponent)
      component = fixture.componentInstance;
      fixture.detectChanges();
      let usuario = {} as IUsuario;
      component.confirmarExclusao(usuario, true);
      expect(component.mostrarModal ).toBe(false);
  });

  it('confirmarExclusao deve confirmar Exclusao e mostrar modal', () => {
      fixture = TestBed.createComponent (TabelaUsuariosComponent)
      component = fixture.componentInstance;
      fixture.detectChanges();
      let usuario = {} as IUsuario;
      component.confirmarExclusao(usuario, false);
      expect(component.mostrarModal ).toBe(true);
  });

  it('aoClicarExcluir dever excluir quando confirmação for true', () => {
    const fixture = TestBed.createComponent(TabelaUsuariosComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();
    
    const confirm = true;
    const usuario = { id: 1, nome: 'Rafael' } as IUsuario;
    component.confirmado = confirm;
    component.usuarios = [usuario];

    component.aoClicarExcluir(usuario);
    expect(component.usuarios[0].id).toBe(1);
    expect(service.remover).toHaveBeenCalled();
  }); 
});
