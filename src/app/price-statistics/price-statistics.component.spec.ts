import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceStatisticsComponent } from './price-statistics.component';

describe('PriceStatisticsComponent', () => {
  let component: PriceStatisticsComponent;
  let fixture: ComponentFixture<PriceStatisticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PriceStatisticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PriceStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
