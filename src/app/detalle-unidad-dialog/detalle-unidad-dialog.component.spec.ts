import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleUnidadDialogComponent } from './detalle-unidad-dialog.component';

describe('DetalleUnidadDialogComponent', () => {
  let component: DetalleUnidadDialogComponent;
  let fixture: ComponentFixture<DetalleUnidadDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalleUnidadDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleUnidadDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
