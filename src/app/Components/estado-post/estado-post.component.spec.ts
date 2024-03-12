import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadoPostComponent } from './estado-post.component';

describe('EstadoPostComponent', () => {
  let component: EstadoPostComponent;
  let fixture: ComponentFixture<EstadoPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EstadoPostComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EstadoPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
