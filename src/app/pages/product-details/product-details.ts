import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';

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
import { PRODUCTS, Product as ProductDetails } from '../../shared/data/product.data';

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
  private cart = inject(CartService);
  private favoritesService = inject(FavoritesService);

  isLoadingProduct = signal<boolean>(true);
  isLoadingRecommendations = signal<boolean>(true);

  productId = computed(() => this.route.snapshot.paramMap.get('id') ?? '');

  cartCount = this.cart.count;

  // Check if current product is favorited
  liked = computed(() => this.favoritesService.isFavorite(this.productId()));
  
  qty = signal(1);
  activeTab = signal<TabKey>('description');

  colors = signal<VariantColor[]>([
    { id: 'c1', name: 'Orange', hex: '#FF7A00' },
    { id: 'c2', name: 'Yellow', hex: '#FFD400' },
    { id: 'c3', name: 'Black', hex: '#111827' },
  ]);
  activeColorId = signal('c1');

  activeColorName = computed(() => {
    const c = this.colors().find((x) => x.id === this.activeColorId());
    return c?.name ?? '';
  });

  product = computed<ProductDetails>(() => {
    const id = this.productId();
    return PRODUCTS.find((p) => p.id === id) ?? PRODUCTS[0];
  });

  recommendations = signal<MiniProduct[]>([
    { id: 'r1', title: 'Pro Mouse X', price: 59, imageUrl: 'https://picsum.photos/seed/rec1/600/600' },
    { id: 'r2', title: 'RGB Keyboard', price: 129, imageUrl: 'https://picsum.photos/seed/rec2/600/600' },
    { id: 'r3', title: 'Gaming Pad', price: 19, imageUrl: 'https://picsum.photos/seed/rec3/600/600' },
  ]);

  reviewsLabel = computed(() => `Reviews (${this.product().reviewsCount ?? 0})`);

  constructor() {
    setTimeout(() => this.isLoadingProduct.set(false), 1200);
    setTimeout(() => this.isLoadingRecommendations.set(false), 2200);
  }

  onToggleLike() {
    const p = this.product();
    
    this.favoritesService.toggleFavorite({
      id: p.id,
      title: p.title,
      price: p.price,
      oldPrice: p.oldPrice,
      imageUrl: p.images?.[0] ?? '',
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
    const color = this.activeColorName().trim();
    const subtitle = color ? `Color: ${color}` : '';

    this.cart.add(
      {
        id: p.id,
        title: p.title,
        subtitle,
        price: p.price,
        imageUrl: p.images?.[0] ?? '',
        badge: p.badge ?? '',
      },
      this.qty()
    );
  }
}