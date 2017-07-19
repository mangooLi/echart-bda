import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAnalysisComponent } from './user-analysis.component';

describe('UserAnalysisComponent', () => {
  let component: UserAnalysisComponent;
  let fixture: ComponentFixture<UserAnalysisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserAnalysisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
