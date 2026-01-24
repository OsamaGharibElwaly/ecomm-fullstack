import { Component, computed, inject, signal, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, ActivatedRoute, NavigationEnd } from '@angular/router';

import { PageTopbarComponent } from '../../shared/ui/page-topbar/page-topbar';
import { PdHeroComponent } from './pd-hero/pd-hero';
import { PdInfoComponent } from './pd-info/pd-info';
import { ColorVariantsComponent, VariantColor } from '../../shared/ui/color-variants/color-variants';
import { QtyStepperComponent } from '../../shared/ui/qty-stepper/qty-stepper';
import { TabsComponent, TabKey } from '../../shared/ui/tabs/tabs';
import { RecommendationRowComponent, MiniProduct } from './pd-recommendations/pd-recommendations';
import { StickyAddToCartComponent } from '../../shared/ui/sticky-add-to-cart/sticky-add-to-cart';

import { ProductDetailsQtyStepperSkeleton } from '../../components/skeleton/product-details/product-details-qty-stepper-skeleton/product-details-qty-stepper-skeleton';
import { ProductDetailsTabsSkeleton } from '../../components/skeleton/product-details/product-details-tabs-skeleton/product-details-tabs-skeleton';
import { ProductDetailsRecommendationsSkeleton } from '../../components/skeleton/product-details/product-details-recommendations-skeleton/product-details-recommendations-skeleton';
import { ProductDetailsStickyCartSkeleton } from '../../components/skeleton/product-details/product-details-sticky-cart-skeleton/product-details-sticky-cart-skeleton';

import { CartService } from '../../shared/data/cart';
import { FavoritesService } from '../../shared/data/favorites';
import { ProductsApiService, apiProductToDetails, ProductDetailsUi } from '../../services/products-api';
import { switchMap, of, map, filter, merge, distinctUntilChanged, startWith } from 'rxjs';

@Component({
  selector: 'app-product-details-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,

    PageTopbarComponent,
    PdHeroComponent,
    PdInfoComponent,
    ColorVariantsComponent,
    QtyStepperComponent,
    TabsComponent,
    RecommendationRowComponent,
    StickyAddToCartComponent,

    ProductDetailsQtyStepperSkeleton,
    ProductDetailsTabsSkeleton,
    ProductDetailsRecommendationsSkeleton,
    ProductDetailsStickyCartSkeleton,
  ],
  templateUrl: './product-details.html',
})
export class ProductDetailsPage {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);
  private cart = inject(CartService);
  private favoritesService = inject(FavoritesService);
  private productsApi = inject(ProductsApiService);

  isLoadingProduct = signal(true);
  isLoadingRecommendations = signal(true);

  /** Reactive id from route; updates when navigating between /product/186 and /product/185. */
  private routeId$ = merge(
    this.route.paramMap.pipe(map((m) => m.get('id') ?? '')),
    this.router.events.pipe(
      filter((e): e is NavigationEnd => e instanceof NavigationEnd),
      map(() => this.route.snapshot.paramMap.get('id') ?? '')
    )
  ).pipe(
    startWith(this.route.snapshot.paramMap.get('id') ?? ''),
    distinctUntilChanged()
  );

  productId = signal<string>('');

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

  recommendations = signal<MiniProduct[]>([]);

  reviewsLabel = computed(() => `Reviews (${this.p().reviewsCount})`);

  /** Placeholder when product is loading so templates can bind without null. */
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

  /** Safe product for template: product or placeholder while loading. */
  p = computed(() => this.product() ?? this.placeholder);

  constructor() {
    this.routeId$.pipe(
      switchMap((id) => {
        this.productId.set(id);
        this.isLoadingProduct.set(true);
        this.isLoadingRecommendations.set(true);
        this.product.set(null);
        this.recommendations.set([]);
        if (!id) return of(null);
        return this.productsApi.getProductById(id);
      }),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe((api) => {
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

      this.productsApi.getProducts({ page: 1, limit: 10, category: details.category }).subscribe((res) => {
        const list = res.list
          .filter((x) => String(x.id) !== details.id)
          .slice(0, 6)
          .map((x) => ({
            id: String(x.id),
            title: x.name || '',
            price: x.price,
            imageUrl: x.images?.[0] ?? `https://picsum.photos/seed/${x.id}/300/400`,
          }));
        this.recommendations.set(list);
        this.isLoadingRecommendations.set(false);
      });
    });
  }

  onToggleLike() {
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

  onColorChange(id: string) {
    this.activeColorId.set(id);
  }

  onQtyChange(n: number) {
    this.qty.set(Math.max(1, n));
  }

  onTabChange(tab: TabKey) {
    this.activeTab.set(tab);
  }

  addToCart() {
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
      this.qty()
    );
  }
}
