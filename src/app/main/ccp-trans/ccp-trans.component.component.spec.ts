import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CcpTransComponent } from './ccp-trans.component';

describe('TransportationAnalysisComponent', () => {
  let component: CcpTransComponent;
  let fixture: ComponentFixture<CcpTransComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CcpTransComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CcpTransComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
