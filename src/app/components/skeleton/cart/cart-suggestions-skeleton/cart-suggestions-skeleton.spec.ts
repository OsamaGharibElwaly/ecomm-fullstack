import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartSuggestionsSkeleton } from './cart-suggestions-skeleton';

describe('CartSuggestionsSkeleton', () => {
  let component: CartSuggestionsSkeleton;
  let fixture: ComponentFixture<CartSuggestionsSkeleton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartSuggestionsSkeleton]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartSuggestionsSkeleton);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
