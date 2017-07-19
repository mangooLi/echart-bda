import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TradeStatisticsComponent } from './trade-statistics.component';

describe('TradeStatisticsComponent', () => {
  let component: TradeStatisticsComponent;
  let fixture: ComponentFixture<TradeStatisticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TradeStatisticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TradeStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
