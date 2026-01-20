import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PageTopbarComponent } from '../../shared/ui/page-topbar/page-topbar';
import { CartItemCardComponent } from './components/cart-item-card/cart-item-card';
import { PromoCodeBoxComponent } from './components/promo-code-box/promo-code-box';
import { BoughtTogetherRowComponent, SuggestionVM } from './components/bought-together-row/bought-together-row';
import { OrderSummary } from './components/order-summary/order-summary';
import { StickyCheckoutBarComponent } from './components/sticky-checkout-bar/sticky-checkout-bar';

import { CartService } from '../../shared/data/cart';
import { CartSummarySkeleton } from '../../components/skeleton/cart/cart-summary-skeleton/cart-summary-skeleton';
import { CartSuggestionsSkeleton } from '../../components/skeleton/cart/cart-suggestions-skeleton/cart-suggestions-skeleton';
import { CartItemsSkeleton } from '../../components/skeleton/cart/cart-items-skeleton/cart-items-skeleton';

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
  templateUrl: './cart.html',
})
export class CartPage {
  private cartService = inject(CartService);

  isLoading = signal(true);

  cart = this.cartService.items;
  itemsSelected = this.cartService.count;
  subtotal = this.cartService.subtotal;

  promoCode = signal('');
  promoApplied = signal(false);

  suggestions = signal<SuggestionVM[]>([
    {
      id: 's1',
      title: 'Wrist Watch',
      price: 149,
      imageUrl:
        'https://images.unsplash.com/photo-1523275335684-37898b6baf30',
    },
    {
      id: 's2',
      title: 'Aviator Shades',
      price: 45,
      imageUrl:
        'https://images.unsplash.com/photo-1511499767150-a48a237f0083',
    },
    {
      id: 's3',
      title: 'Leather Wallet',
      price: 32,
      imageUrl:
        'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3',
    },
  ]);

  discount = computed(() =>
    this.promoApplied() ? Math.round(this.subtotal() * 0.1) : 0
  );

  total = computed(() =>
    Math.max(0, this.subtotal() - this.discount())
  );

  shippingLabel = computed(() => 'Free');

  constructor() {
    setTimeout(() => {
      this.isLoading.set(false);
    }, 1800);
  }

  onQtyChange(id: string, qty: number) {
    this.cartService.setQty(id, qty);
  }

  onRemove(id: string) {
    this.cartService.remove(id);
  }

  onPromoChange(code: string) {
    this.promoCode.set(code);
    if (!code) this.promoApplied.set(false);
  }

  onApplyPromo() {
    this.promoApplied.set(!!this.promoCode().trim());
  }

  onCheckout() {
    console.log('checkout', {
      total: this.total(),
      items: this.cart(),
    });
  }
}
