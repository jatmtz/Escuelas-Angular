import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocenteMateriaPostComponent } from './docente-materia-post.component';

describe('DocenteMateriaPostComponent', () => {
  let component: DocenteMateriaPostComponent;
  let fixture: ComponentFixture<DocenteMateriaPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocenteMateriaPostComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DocenteMateriaPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
