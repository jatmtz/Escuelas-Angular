import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdificioEditComponent } from './edificio-edit.component';

describe('EdificioEditComponent', () => {
  let component: EdificioEditComponent;
  let fixture: ComponentFixture<EdificioEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EdificioEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EdificioEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
