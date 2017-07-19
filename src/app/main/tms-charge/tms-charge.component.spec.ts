import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TmsChargeComponent } from './tms-charge.component';

describe('TmsChargeComponent', () => {
  let component: TmsChargeComponent;
  let fixture: ComponentFixture<TmsChargeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TmsChargeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TmsChargeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
