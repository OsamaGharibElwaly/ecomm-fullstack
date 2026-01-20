import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StickyAddToCart } from './sticky-add-to-cart';

describe('StickyAddToCart', () => {
  let component: StickyAddToCart;
  let fixture: ComponentFixture<StickyAddToCart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StickyAddToCart]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StickyAddToCart);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
