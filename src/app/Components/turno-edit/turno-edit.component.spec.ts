import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TurnoEditComponent } from './turno-edit.component';

describe('TurnoEditComponent', () => {
  let component: TurnoEditComponent;
  let fixture: ComponentFixture<TurnoEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TurnoEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TurnoEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
