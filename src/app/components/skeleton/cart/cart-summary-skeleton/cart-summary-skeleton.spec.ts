import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartSummarySkeleton } from './cart-summary-skeleton';

describe('CartSummarySkeleton', () => {
  let component: CartSummarySkeleton;
  let fixture: ComponentFixture<CartSummarySkeleton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartSummarySkeleton]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartSummarySkeleton);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
