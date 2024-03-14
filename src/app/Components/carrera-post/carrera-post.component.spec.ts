import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarreraPostComponent } from './carrera-post.component';

describe('CarreraPostComponent', () => {
  let component: CarreraPostComponent;
  let fixture: ComponentFixture<CarreraPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarreraPostComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CarreraPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
