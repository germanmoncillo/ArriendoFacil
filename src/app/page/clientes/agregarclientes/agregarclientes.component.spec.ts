import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarclientesComponent } from './agregarclientes.component';

describe('AgregarclientesComponent', () => {
  let component: AgregarclientesComponent;
  let fixture: ComponentFixture<AgregarclientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgregarclientesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AgregarclientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
