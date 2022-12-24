import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoUnidadesDialogComponent } from './listado-unidades-dialog.component';

describe('ListadoUnidadesDialogComponent', () => {
  let component: ListadoUnidadesDialogComponent;
  let fixture: ComponentFixture<ListadoUnidadesDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListadoUnidadesDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoUnidadesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
