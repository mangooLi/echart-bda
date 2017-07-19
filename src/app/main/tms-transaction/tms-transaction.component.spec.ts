import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TmsTransactionComponent } from './tms-transaction.component';

describe('MainTradeComponent', () => {
  let component: TmsTransactionComponent;
  let fixture: ComponentFixture<TmsTransactionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TmsTransactionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TmsTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
