import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlumnoPostComponent } from './alumno-post.component';

describe('AlumnoPostComponent', () => {
  let component: AlumnoPostComponent;
  let fixture: ComponentFixture<AlumnoPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlumnoPostComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AlumnoPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
