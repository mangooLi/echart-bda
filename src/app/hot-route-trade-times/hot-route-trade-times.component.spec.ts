import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HotRouteTradeTimesComponent } from './hot-route-trade-times.component';

describe('HotRouteTradeTimesComponent', () => {
  let component: HotRouteTradeTimesComponent;
  let fixture: ComponentFixture<HotRouteTradeTimesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HotRouteTradeTimesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HotRouteTradeTimesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
