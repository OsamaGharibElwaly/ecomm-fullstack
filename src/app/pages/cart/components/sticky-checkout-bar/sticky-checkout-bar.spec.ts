import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StickyCheckoutBar } from './sticky-checkout-bar';

describe('StickyCheckoutBar', () => {
  let component: StickyCheckoutBar;
  let fixture: ComponentFixture<StickyCheckoutBar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StickyCheckoutBar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StickyCheckoutBar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
