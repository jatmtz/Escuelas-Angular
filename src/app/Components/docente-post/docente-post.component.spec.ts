import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocentePostComponent } from './docente-post.component';

describe('DocentePostComponent', () => {
  let component: DocentePostComponent;
  let fixture: ComponentFixture<DocentePostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocentePostComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DocentePostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
