import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GruposPostComponent } from './grupos-post.component';

describe('GruposPostComponent', () => {
  let component: GruposPostComponent;
  let fixture: ComponentFixture<GruposPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GruposPostComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GruposPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
