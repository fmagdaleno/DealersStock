import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnidadesEntregadasComponent } from './unidades-entregadas.component';

describe('UnidadesEntregadasComponent', () => {
  let component: UnidadesEntregadasComponent;
  let fixture: ComponentFixture<UnidadesEntregadasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnidadesEntregadasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnidadesEntregadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
