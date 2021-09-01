import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GirarComponent } from './girar.component';

describe('GirarComponent', () => {
  let component: GirarComponent;
  let fixture: ComponentFixture<GirarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GirarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GirarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
