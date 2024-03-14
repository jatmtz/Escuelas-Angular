import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarreraEditComponent } from './carrera-edit.component';

describe('CarreraEditComponent', () => {
  let component: CarreraEditComponent;
  let fixture: ComponentFixture<CarreraEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarreraEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CarreraEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
