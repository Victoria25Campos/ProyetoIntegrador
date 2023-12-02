import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlatoClienteComponent } from './plato-cliente.component';

describe('PlatoClienteComponent', () => {
  let component: PlatoClienteComponent;
  let fixture: ComponentFixture<PlatoClienteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlatoClienteComponent]
    });
    fixture = TestBed.createComponent(PlatoClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
