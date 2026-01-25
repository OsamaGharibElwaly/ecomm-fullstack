import { Injectable, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';

import { ProductsApiService, apiProductToUi, type UiProduct } from '../../core/api/products-api.service';
import { CartService } from '../../shared/data/cart';
import { FavoritesService } from '../../shared/data/favorites';
import { AuthService } from '../../services/auth';
import { IMAGE_FALLBACK_URL } from '../../shared/constants/image-fallback';

type CategoryIcon = 'grid' | 'monitor' | 'hanger' | 'sofa' | 'dumbbell';

export interface Category {
  id: string;
  name: string;
  icon: CategoryIcon;
}

@Injectable()
export class HomeFacade {
  private router = inject(Router);
  private cart = inject(CartService);
  private auth = inject(AuthService);
  private favoritesService = inject(FavoritesService);
  private productsApi = inject(ProductsApiService);

  readonly IMAGE_FALLBACK_URL = IMAGE_FALLBACK_URL;

  isLoggedIn = toSignal(this.auth.authed$, { initialValue: this.auth.isLoggedIn() });
  get displayName(): string {
    return this.auth.getDisplayName();
  }

  imageErrorIds = signal<Set<string>>(new Set());
  isLoadingHero = signal(true);
  isLoadingCategories = signal(true);
  isLoadingProducts = signal(true);
  isLoadingMore = signal(false);
  hasMore = signal(true);
  currentPage = signal(1);
  cartCount = this.cart.count;
  favoriteCount = computed(() => this.favoritesService.favorites().length);
  search = signal('');
  activeCategoryId = signal('all');
  products = signal<UiProduct[]>([]);
  categories = signal<Category[]>([]);

  filteredProducts = computed<UiProduct[]>(() => {
    const query = this.search().trim().toLowerCase();
    if (!query) return this.products();
    return this.products().filter(
      (p) =>
        p.title.toLowerCase().includes(query) || (p.category || '').toLowerCase().includes(query),
    );
  });

  init(): void {
    setTimeout(() => this.isLoadingHero.set(false), 400);
    this.productsApi.getCategories().subscribe((cats) => {
      this.categories.set(
        cats.map((c) => ({ id: c.id, name: c.name, icon: this.getCategoryIcon(c.name) })),
      );
      this.isLoadingCategories.set(false);
    });
    this.loadProducts(1, false);
  }

  onSearch(value: string): void {
    this.search.set(value);
  }

  onCategoryChange(id: string): void {
    this.activeCategoryId.set(id);
    this.loadProducts(1, false);
  }

  loadMore(): void {
    if (this.isLoadingMore() || !this.hasMore()) return;
    this.isLoadingMore.set(true);
    this.loadProducts(this.currentPage() + 1, true);
  }

  onToggleLike(productId: string): void {
    const product = this.products().find((p) => p.id === productId);
    if (!product) return;
    this.favoritesService.toggleFavorite({
      id: product.id,
      title: product.title,
      price: product.price,
      oldPrice: product.oldPrice,
      imageUrl: product.imageUrl,
      badge: product.badge,
      rating: product.rating,
      reviewsCount: product.reviewsCount,
    });
  }

  isFavorite(productId: string): boolean {
    return this.favoritesService.isFavorite(productId);
  }

  onAddToCart(productId: string): void {
    const product = this.products().find((p) => p.id === productId);
    if (!product) return;
    this.cart.add(
      {
        id: product.id,
        title: product.title,
        subtitle: product.category ?? '',
        price: product.price,
        imageUrl: product.imageUrl ?? '',
        badge: product.badge ?? '',
      },
      1,
    );
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

  goToFavorites(): void {
    this.router.navigate(['/favorites']);
  }

  onProductClick(productId: string): void {
    this.router.navigate(['/product', productId]);
  }

  private getCategoryIcon(name: string): CategoryIcon {
    const n = name.toLowerCase();
    if (n.includes('clothing')) return 'hanger';
    if (n.includes('electronic') || n.includes('monitor') || n.includes('screen') || n.includes('display')) return 'monitor';
    if (n.includes('gaming') || n.includes('fitness') || n.includes('gym') || n.includes('audio')) return 'dumbbell';
    if (n.includes('furniture') || n.includes('sofa') || n.includes('chair') || n.includes('home')) return 'sofa';
    return 'grid';
  }

  private loadProducts(page: number, append: boolean): void {
    if (!append) {
      this.products.set([]);
      this.isLoadingProducts.set(true);
    }
    const category = this.activeCategoryId();
    this.productsApi
      .getProducts({
        page,
        limit: 12,
        category: category === 'all' ? undefined : category,
        sortBy: 'createdAt',
        order: 'desc',
      })
      .subscribe((res) => {
        const list = res.list.map(apiProductToUi);
        if (append) {
          this.products.update((prev) => [...prev, ...list]);
        } else {
          this.products.set(list);
        }
        this.currentPage.set(res.page);
        this.hasMore.set(res.page < res.totalPages);
        this.isLoadingProducts.set(false);
        this.isLoadingMore.set(false);
      });
  }
}
