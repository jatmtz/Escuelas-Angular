import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdificioPostComponent } from './edificio-post.component';

describe('EdificioPostComponent', () => {
  let component: EdificioPostComponent;
  let fixture: ComponentFixture<EdificioPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EdificioPostComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EdificioPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
