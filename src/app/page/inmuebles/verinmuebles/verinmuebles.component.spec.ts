import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerinmueblesComponent } from './verinmuebles.component';

describe('VerinmueblesComponent', () => {
  let component: VerinmueblesComponent;
  let fixture: ComponentFixture<VerinmueblesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerinmueblesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VerinmueblesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
