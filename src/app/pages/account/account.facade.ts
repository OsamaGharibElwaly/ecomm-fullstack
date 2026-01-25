import { Injectable, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth';
import { AccountApiService, type AccountUser } from '../../core/api/account-api.service';
import { CartService } from '../../shared/data/cart';
import { FavoritesService } from '../../shared/data/favorites';

@Injectable()
export class AccountFacade {
  private router = inject(Router);
  private auth = inject(AuthService);
  private accountApi = inject(AccountApiService);
  private cart = inject(CartService);
  private favorites = inject(FavoritesService);

  isLoggedIn = toSignal(this.auth.authed$, { initialValue: this.auth.isLoggedIn() });
  get displayName(): string {
    return this.auth.getDisplayName();
  }

  user = signal<AccountUser | null>(null);
  isLoading = signal(true);
  cartCount = this.cart.count;
  cartSubtotal = this.cart.subtotal;
  favoriteCount = computed(() => this.favorites.favorites().length);

  init(): void {
    this.accountApi.getMe().subscribe((u) => {
      this.user.set(u);
      this.isLoading.set(false);
    });
  }

  memberSince(): string {
    const u = this.user();
    const raw = u?.createdAt;
    if (!raw || typeof raw !== 'string') return '—';
    try {
      const d = new Date(raw);
      if (isNaN(d.getTime())) return '—';
      return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    } catch {
      return '—';
    }
  }

  goToFavorites(): void {
    this.router.navigate(['/favorites']);
  }

  goToCart(): void {
    this.router.navigate(['/cart']);
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/']);
  }

  initials(): string {
    const n = this.displayName || (this.user()?.email ?? '');
    if (!n) return '?';
    const parts = n.trim().split(/\s+/);
    if (parts.length >= 2) return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    return n.slice(0, 2).toUpperCase();
  }
}
