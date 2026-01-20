import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartItemsSkeleton } from './cart-items-skeleton';

describe('CartItemsSkeleton', () => {
  let component: CartItemsSkeleton;
  let fixture: ComponentFixture<CartItemsSkeleton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartItemsSkeleton]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartItemsSkeleton);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
