import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TmsCargoComponent } from './tms-cargo.component';

describe('TmsCargoComponent', () => {
  let component: TmsCargoComponent;
  let fixture: ComponentFixture<TmsCargoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TmsCargoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TmsCargoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
