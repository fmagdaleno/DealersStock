import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicarRedComponent } from './publicar-red.component';

describe('PublicarRedComponent', () => {
  let component: PublicarRedComponent;
  let fixture: ComponentFixture<PublicarRedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublicarRedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicarRedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
