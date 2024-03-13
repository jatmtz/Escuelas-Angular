import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EscuelaPostComponent } from './escuela-post.component';

describe('EscuelaPostComponent', () => {
  let component: EscuelaPostComponent;
  let fixture: ComponentFixture<EscuelaPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EscuelaPostComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EscuelaPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
