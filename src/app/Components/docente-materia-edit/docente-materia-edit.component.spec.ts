import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocenteMateriaEditComponent } from './docente-materia-edit.component';

describe('DocenteMateriaEditComponent', () => {
  let component: DocenteMateriaEditComponent;
  let fixture: ComponentFixture<DocenteMateriaEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocenteMateriaEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DocenteMateriaEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
