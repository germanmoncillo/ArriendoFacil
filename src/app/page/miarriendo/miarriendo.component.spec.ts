import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiarriendoComponent } from './miarriendo.component';

describe('MiarriendoComponent', () => {
  let component: MiarriendoComponent;
  let fixture: ComponentFixture<MiarriendoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MiarriendoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MiarriendoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
