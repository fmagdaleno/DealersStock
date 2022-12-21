import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrasladosDialogComponent } from './traslados-dialog.component';

describe('TrasladosDialogComponent', () => {
  let component: TrasladosDialogComponent;
  let fixture: ComponentFixture<TrasladosDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrasladosDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrasladosDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
