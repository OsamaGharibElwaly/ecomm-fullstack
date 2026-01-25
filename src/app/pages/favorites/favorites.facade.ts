import { Injectable, inject, signal, computed } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';

import { CartService } from '../../shared/data/cart';
import { FavoritesService, type FavoriteItem } from '../../shared/data/favorites';
import { AuthService } from '../../services/auth';
import { IMAGE_FALLBACK_URL } from '../../shared/constants/image-fallback';

@Injectable()
export class FavoritesFacade {
  private router = inject(Router);
  private cart = inject(CartService);
  private favoritesService = inject(FavoritesService);
  private auth = inject(AuthService);

  readonly IMAGE_FALLBACK_URL = IMAGE_FALLBACK_URL;

  isLoggedIn = toSignal(this.auth.authed$, { initialValue: this.auth.isLoggedIn() });
  get displayName(): string {
    return this.auth.getDisplayName();
  }

  cartCount = this.cart.count;
  imageErrorIds = signal<Set<string>>(new Set());
  isLoading = signal(true);
  favorites = this.favoritesService.favorites;
  favoriteCount = computed(() => this.favorites().length);

  init(): void {
    setTimeout(() => this.isLoading.set(false), 800);
  }

  goToHome(): void {
    this.router.navigate(['/']);
  }

  goToProduct(productId: string): void {
    this.router.navigate(['/product', productId]);
  }

  removeFavorite(event: Event, productId: string): void {
    event.stopPropagation();
    this.favoritesService.removeFavorite(productId);
  }

  quickAddToCart(event: Event, item: FavoriteItem): void {
    event.stopPropagation();
    this.cart.add(
      { id: item.id, title: item.title, subtitle: '', price: item.price, imageUrl: item.imageUrl, badge: item.badge ?? '' },
      1,
    );
  }

  clearAllFavorites(): void {
    if (confirm('Are you sure you want to remove all favorites?')) {
      this.favoritesService.clearAll();
    }
  }

  onImgError(productId: string): void {
    this.imageErrorIds.update((s) => {
      if (s.has(productId)) return s;
      const n = new Set(s);
      n.add(productId);
      return n;
    });
  }

  hasImageError(productId: string): boolean {
    return this.imageErrorIds().has(productId);
  }

  getRelativeTime(date: Date): string {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);
    if (diffMins < 1) return 'just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`;
    return `${Math.floor(diffDays / 30)}mo ago`;
  }
}
