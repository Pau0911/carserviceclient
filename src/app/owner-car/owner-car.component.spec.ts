import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerCarComponent } from './owner-car.component';

describe('OwnerCarComponent', () => {
  let component: OwnerCarComponent;
  let fixture: ComponentFixture<OwnerCarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OwnerCarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnerCarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
