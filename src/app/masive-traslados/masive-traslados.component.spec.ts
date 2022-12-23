import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasiveTrasladosComponent } from './masive-traslados.component';

describe('MasiveTrasladosComponent', () => {
  let component: MasiveTrasladosComponent;
  let fixture: ComponentFixture<MasiveTrasladosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MasiveTrasladosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MasiveTrasladosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
