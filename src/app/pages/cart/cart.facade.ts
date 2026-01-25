import { Injectable, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { CartService } from '../../shared/data/cart';
import { AuthService } from '../../services/auth';
import type { SuggestionVM } from './components/bought-together-row/bought-together-row';

@Injectable()
export class CartFacade {
  private cartService = inject(CartService);
  private auth = inject(AuthService);

  isLoggedIn = toSignal(this.auth.authed$, { initialValue: this.auth.isLoggedIn() });
  get displayName(): string {
    return this.auth.getDisplayName();
  }

  isLoading = signal(true);
  cart = this.cartService.items;
  itemsSelected = this.cartService.count;
  subtotal = this.cartService.subtotal;
  promoCode = signal('');
  promoApplied = signal(false);

  suggestions = signal<SuggestionVM[]>([
    { id: 's1', title: 'Wrist Watch', price: 149, imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30' },
    { id: 's2', title: 'Aviator Shades', price: 45, imageUrl: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083' },
    { id: 's3', title: 'Leather Wallet', price: 32, imageUrl: 'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3' },
  ]);

  discount = computed(() => (this.promoApplied() ? Math.round(this.subtotal() * 0.1) : 0));
  total = computed(() => Math.max(0, this.subtotal() - this.discount()));
  shippingLabel = computed(() => 'Free');

  init(): void {
    setTimeout(() => this.isLoading.set(false), 1800);
  }

  onQtyChange(id: string, qty: number): void {
    this.cartService.setQty(id, qty);
  }

  onRemove(id: string): void {
    this.cartService.remove(id);
  }

  onPromoChange(code: string): void {
    this.promoCode.set(code);
    if (!code) this.promoApplied.set(false);
  }

  onApplyPromo(): void {
    this.promoApplied.set(!!this.promoCode().trim());
  }

  onCheckout(): void {
    console.log('checkout', { total: this.total(), items: this.cart() });
  }
}
