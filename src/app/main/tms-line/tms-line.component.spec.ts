import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TmsLineComponent } from './tms-line.component';

describe('TmsRouteComponent', () => {
  let component: TmsLineComponent;
  let fixture: ComponentFixture<TmsLineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TmsLineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TmsLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
