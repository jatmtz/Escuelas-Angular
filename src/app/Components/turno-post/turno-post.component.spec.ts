import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TurnoPostComponent } from './turno-post.component';

describe('TurnoPostComponent', () => {
  let component: TurnoPostComponent;
  let fixture: ComponentFixture<TurnoPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TurnoPostComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TurnoPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
