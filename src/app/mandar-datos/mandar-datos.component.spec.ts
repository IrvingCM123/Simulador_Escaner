import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MandarDatosComponent } from './mandar-datos.component';

describe('MandarDatosComponent', () => {
  let component: MandarDatosComponent;
  let fixture: ComponentFixture<MandarDatosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MandarDatosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MandarDatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
