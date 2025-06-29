import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrincipalComponent } from './principal.component';
import { Router } from '@angular/router';
import { TabelaUsuariosComponent } from 'src/app/components/tabela-usuarios/tabela-usuarios.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

describe('PrincipalComponent', () => {
  let component: PrincipalComponent;
  let fixture: ComponentFixture<PrincipalComponent>;

  let router: jasmine.SpyObj<Router>;

  beforeEach(() => {
    router = jasmine.createSpyObj('Router', [
      'navigate'
      ]) as jasmine.SpyObj<Router>;
    router.navigate.and.returnValue(
      new Promise<boolean> ((resolve) => resolve(true))
    );

    TestBed.configureTestingModule({
      declarations: [PrincipalComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
              { provide: Router, useValue: router }
            ]
    });
  });
  
  it('should create', () => {
    fixture = TestBed.createComponent(PrincipalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
  
  it('aoClicarCadastrarUsuario deve navegar para "cadastrar-usuarios"', () => {
    fixture = TestBed.createComponent(PrincipalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.aoClicarCadastrarUsuario();
    expect(component.telaListar).toBe(false);
  });
});
