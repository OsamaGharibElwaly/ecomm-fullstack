import { Injectable, computed, inject, signal, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { switchMap, of, map, filter, merge, distinctUntilChanged, startWith } from 'rxjs';

import { ProductsApiService, apiProductToDetails, type ProductDetailsUi } from '../../core/api/products-api.service';
import { CartService } from '../../shared/data/cart';
import { FavoritesService } from '../../shared/data/favorites';
import type { VariantColor } from '../../shared/ui/color-variants/color-variants';
import type { TabKey } from '../../shared/ui/tabs/tabs';
import type { MiniProduct } from './pd-recommendations/pd-recommendations';

@Injectable()
export class ProductDetailsFacade {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);
  private cart = inject(CartService);
  private favoritesService = inject(FavoritesService);
  private productsApi = inject(ProductsApiService);

  isLoadingProduct = signal(true);
  isLoadingRecommendations = signal(true);
  productId = signal('');
  cartCount = this.cart.count;
  liked = computed(() => this.favoritesService.isFavorite(this.productId()));
  qty = signal(1);
  activeTab = signal<TabKey>('description');
  product = signal<ProductDetailsUi | null>(null);
  colors = signal<VariantColor[]>([]);
  activeColorId = signal('');
  activeColorName = computed(() => {
    const c = this.colors().find((x) => x.id === this.activeColorId());
    return c?.name ?? '';
  });
  activeColorHex = computed(() => {
    const c = this.colors().find((x) => x.id === this.activeColorId());
    return c?.hex ?? null;
  });
  recommendations = signal<MiniProduct[]>([]);
  reviewsLabel = computed(() => `Reviews (${this.p().reviewsCount})`);

  readonly placeholder: ProductDetailsUi = {
    id: '',
    title: 'Loading…',
    description: '',
    images: ['https://picsum.photos/seed/loading/600/600'],
    price: 0,
    rating: 0,
    reviewsCount: 0,
    specifications: [],
    colors: [],
    category: '',
  };

  p = computed(() => this.product() ?? this.placeholder);

  constructor() {
    const routeId$ = merge(
      this.route.paramMap.pipe(map((m) => m.get('id') ?? '')),
      this.router.events.pipe(
        filter((e): e is NavigationEnd => e instanceof NavigationEnd),
        map(() => this.route.snapshot.paramMap.get('id') ?? ''),
      ),
    ).pipe(
      startWith(this.route.snapshot.paramMap.get('id') ?? ''),
      distinctUntilChanged(),
    );

    routeId$
      .pipe(
        switchMap((id) => {
          this.productId.set(id);
          this.isLoadingProduct.set(true);
          this.isLoadingRecommendations.set(true);
          this.product.set(null);
          this.recommendations.set([]);
          if (!id) return of(null);
          return this.productsApi.getProductById(id);
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((api) => {
        if (api === null) {
          if (this.productId()) this.router.navigate(['/404']);
          this.isLoadingProduct.set(false);
          this.isLoadingRecommendations.set(false);
          return;
        }
        const details = apiProductToDetails(api);
        this.product.set(details);
        this.colors.set(details.colors as VariantColor[]);
        this.activeColorId.set(details.colors[0]?.id ?? '');
        this.isLoadingProduct.set(false);

        const cat = ['CLOTHING', 'ELECTRONICS', 'GAMING'].includes(details.category)
          ? details.category
          : undefined;
        this.productsApi.getProducts({ page: 1, limit: 10, category: cat }).subscribe((res) => {
          const list = res.list
            .filter((x) => String(x.id) !== details.id)
            .slice(0, 6)
            .map((x) => ({
              id: String(x.id),
              title: x.name || '',
              price: Number(x?.price) || 0,
              imageUrl: x.images?.[0] ?? `https://picsum.photos/seed/${x.id}/300/400`,
            }));
          this.recommendations.set(list);
          this.isLoadingRecommendations.set(false);
        });
      });
  }

  onToggleLike(): void {
    const p = this.product();
    if (!p) return;
    this.favoritesService.toggleFavorite({
      id: p.id,
      title: p.title,
      price: p.price,
      oldPrice: p.oldPrice,
      imageUrl: p.images[0] ?? '',
      badge: p.badge,
      rating: p.rating,
      reviewsCount: p.reviewsCount,
    });
  }

  onColorChange(id: string): void {
    this.activeColorId.set(id);
  }

  onQtyChange(n: number): void {
    this.qty.set(Math.max(1, n));
  }

  onTabChange(tab: TabKey): void {
    this.activeTab.set(tab);
  }

  addToCart(): void {
    const p = this.product();
    if (!p) return;
    const color = this.activeColorName().trim();
    const subtitle = color ? `Color: ${color}` : '';
    this.cart.add(
      {
        id: p.id,
        title: p.title,
        subtitle,
        price: p.price,
        imageUrl: p.images[0] ?? '',
        badge: p.badge ?? '',
      },
      this.qty(),
    );
  }
}
