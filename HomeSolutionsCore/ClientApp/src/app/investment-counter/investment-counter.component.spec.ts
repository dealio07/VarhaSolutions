import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestmentCounterComponent } from './investment-counter.component';

describe('InvestmentCounterComponent', () => {
  let component: InvestmentCounterComponent;
  let fixture: ComponentFixture<InvestmentCounterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvestmentCounterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvestmentCounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
