import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarinmueblesComponent } from './agregarinmuebles.component';

describe('AgregarinmueblesComponent', () => {
  let component: AgregarinmueblesComponent;
  let fixture: ComponentFixture<AgregarinmueblesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgregarinmueblesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AgregarinmueblesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
