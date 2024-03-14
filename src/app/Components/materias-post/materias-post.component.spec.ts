import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MateriasPostComponent } from './materias-post.component';

describe('MateriasPostComponent', () => {
  let component: MateriasPostComponent;
  let fixture: ComponentFixture<MateriasPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MateriasPostComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MateriasPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
