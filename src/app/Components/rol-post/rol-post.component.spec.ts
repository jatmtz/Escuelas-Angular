import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RolPostComponent } from './rol-post.component';

describe('RolPostComponent', () => {
  let component: RolPostComponent;
  let fixture: ComponentFixture<RolPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RolPostComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RolPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
