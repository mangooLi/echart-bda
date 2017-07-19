import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TmsCarComponent } from './tms-car.component';

describe('TmsCarComponent', () => {
  let component: TmsCarComponent;
  let fixture: ComponentFixture<TmsCarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TmsCarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TmsCarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
