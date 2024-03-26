import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgrearusuariosComponent } from './agrearusuarios.component';

describe('AgrearusuariosComponent', () => {
  let component: AgrearusuariosComponent;
  let fixture: ComponentFixture<AgrearusuariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgrearusuariosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AgrearusuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
