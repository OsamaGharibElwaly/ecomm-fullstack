import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PageTopbarComponent } from '../../shared/ui/page-topbar/page-topbar';
import { CartItemCardComponent } from './components/cart-item-card/cart-item-card';
import { PromoCodeBoxComponent } from './components/promo-code-box/promo-code-box';
import { BoughtTogetherRowComponent } from './components/bought-together-row/bought-together-row';
import { OrderSummary } from './components/order-summary/order-summary';
import { StickyCheckoutBarComponent } from './components/sticky-checkout-bar/sticky-checkout-bar';

import { CartSummarySkeleton } from '../../components/skeleton/cart/cart-summary-skeleton/cart-summary-skeleton';
import { CartSuggestionsSkeleton } from '../../components/skeleton/cart/cart-suggestions-skeleton/cart-suggestions-skeleton';
import { CartItemsSkeleton } from '../../components/skeleton/cart/cart-items-skeleton/cart-items-skeleton';

import { CartFacade } from './cart.facade';

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    PageTopbarComponent,
    CartItemCardComponent,
    PromoCodeBoxComponent,
    BoughtTogetherRowComponent,
    OrderSummary,
    StickyCheckoutBarComponent,
    CartItemsSkeleton,
    CartSuggestionsSkeleton,
    CartSummarySkeleton,
  ],
  providers: [CartFacade],
  templateUrl: './cart.html',
})
export class CartPage implements OnInit {
  readonly f = inject(CartFacade);

  ngOnInit(): void {
    this.f.init();
  }
}
