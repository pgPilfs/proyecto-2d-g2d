import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UltimasOperacionesPesosComponent } from './ultimas-operaciones-pesos.component';

describe('UltimasOperacionesPesosComponent', () => {
  let component: UltimasOperacionesPesosComponent;
  let fixture: ComponentFixture<UltimasOperacionesPesosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UltimasOperacionesPesosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UltimasOperacionesPesosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
