import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HotRoutePriceComponent } from './hot-route-price.component';

describe('HotRoutePriceComponent', () => {
  let component: HotRoutePriceComponent;
  let fixture: ComponentFixture<HotRoutePriceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HotRoutePriceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HotRoutePriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
