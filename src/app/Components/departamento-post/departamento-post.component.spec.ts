import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartamentoPostComponent } from './departamento-post.component';

describe('DepartamentoPostComponent', () => {
  let component: DepartamentoPostComponent;
  let fixture: ComponentFixture<DepartamentoPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DepartamentoPostComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DepartamentoPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
