import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GruposEditComponent } from './grupos-edit.component';

describe('GruposEditComponent', () => {
  let component: GruposEditComponent;
  let fixture: ComponentFixture<GruposEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GruposEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GruposEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
