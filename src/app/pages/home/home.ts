import { Component, computed, inject, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { AppHeaderComponent } from '../../shared/ui/app-header/app-header';
import { BottomNavComponent } from '../../shared/ui/bottom-nav/bottom-nav';
import { SearchBarComponent } from '../../shared/ui/search-bar/search-bar';
import { HeroBannerComponent } from '../../shared/ui/hero-banner/hero-banner';
import { SectionHeaderComponent } from '../../shared/ui/section-header/section-header';
import { CategoryChipsComponent } from '../../shared/ui/category-chips/category-chips';
import { ProductCard } from '../../shared/ui/product-card/product-card';

// Skeleton components (from /components/skeleton/home/)
import { HomeHeroSkeleton } from '../../components/skeleton/home/home-hero-skeleton/home-hero-skeleton';
import { HomeCategoriesSkeleton } from '../../components/skeleton/home/home-categories-skeleton/home-categories-skeleton';
import { HomeFeaturedProductsSkeleton } from '../../components/skeleton/home/home-featured-products-skeleton/home-featured-products-skeleton';

import { CartService } from '../../shared/data/cart';
import { FavoritesService } from '../../shared/data/favorites';
import { PRODUCTS, Product as DataProduct } from '../../shared/data/product.data';

type CategoryIcon = 'grid' | 'monitor' | 'hanger' | 'sofa' | 'dumbbell';

interface Category {
  id: string;
  name: string;
  icon: CategoryIcon;
}

interface UiProduct extends DataProduct {
  category: string;
  imageUrl: string;
}

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,

    AppHeaderComponent,
    BottomNavComponent,
    SearchBarComponent,
    HeroBannerComponent,
    SectionHeaderComponent,
    CategoryChipsComponent,
    ProductCard,

    // Skeleton components
    HomeHeroSkeleton,
    HomeCategoriesSkeleton,
    HomeFeaturedProductsSkeleton,
  ],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class HomePage {
  private router = inject(Router);
  private cart = inject(CartService);
  private favoritesService = inject(FavoritesService);

  // Separate loading states – each section loads independently
  isLoadingHero = signal<boolean>(true);
  isLoadingCategories = signal<boolean>(true);
  isLoadingProducts = signal<boolean>(true);

  // Signals
  cartCount = this.cart.count;
  favoriteCount = computed(() => this.favoritesService.favorites().length);
  search = signal<string>('');
  activeCategoryId = signal<string>('all');

  // Products (initialized from static data)
  products = signal<UiProduct[]>(
    PRODUCTS.map(p => ({
      ...p,
      category: p.category ?? 'General',
      imageUrl: p.images?.[0] ?? `https://picsum.photos/seed/${p.id || 'prod'}/300/400`
    }))
  );

  // Computed categories
  categories = computed<Category[]>(() => {
    const map = new Map<string, Category>();
    map.set('all', { id: 'all', name: 'All', icon: 'grid' });

    for (const p of this.products()) {
      const name = p.category || 'General';
      const id = name.toLowerCase().replace(/\s+/g, '-');

      if (!map.has(id)) {
        map.set(id, {
          id,
          name,
          icon: this.getCategoryIcon(name)
        });
      }
    }
    return Array.from(map.values());
  });

  // Filtered products
  filteredProducts = computed<UiProduct[]>(() => {
    const query = this.search().trim().toLowerCase();
    const category = this.activeCategoryId();

    return this.products().filter(p => {
      const catName = (p.category || 'General').toLowerCase();
      const matchesCategory = category === 'all' || catName === category;
      const matchesSearch = !query ||
        p.title.toLowerCase().includes(query) ||
        catName.includes(query);

      return matchesCategory && matchesSearch;
    });
  });

  constructor() {
    // Optional: log initial state
    console.log('HomePage initialized – products:', this.products().length);

    // Optional: auto-log filtered products when they change
    effect(() => {
      console.log('Filtered products updated:', this.filteredProducts().length);
    });
  }

  ngOnInit() {
    // Simulate staggered loading (replace with real API calls later)
    this.simulateDataFetch();
  }

  // ─────────────────────────────────────────────
  // Event handlers
  // ─────────────────────────────────────────────

  onSearch(value: string) {
    this.search.set(value);
  }

  onCategoryChange(id: string) {
    this.activeCategoryId.set(id);
  }

  onToggleLike(productId: string) {
    const product = this.products().find(p => p.id === productId);
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

  onAddToCart(productId: string) {
    const product = this.products().find(p => p.id === productId);
    if (!product) return;

    this.cart.add(
      {
        id: product.id,
        title: product.title,
        subtitle: product.category ?? '',
        price: product.price,
        imageUrl: product.imageUrl ?? '',
        badge: product.badge ?? ''
      },
      1
    );
  }

  onImgError(event: Event) {
    const img = event.target as HTMLImageElement;
    if (img) {
      img.src = 'https://picsum.photos/seed/fallback/300/400';
    }
  }

  goToFavorites() {
    this.router.navigate(['/favorites']);
  }

  onProductClick(productId: string) {
    this.router.navigate(['/product', productId]);
  }

  // ─────────────────────────────────────────────
  // Helpers
  // ─────────────────────────────────────────────

  private getCategoryIcon(name: string): CategoryIcon {
    const n = name.toLowerCase();
    if (n.includes('monitor') || n.includes('screen') || n.includes('display')) return 'monitor';
    if (n.includes('fashion') || n.includes('clothing') || n.includes('bags')) return 'hanger';
    if (n.includes('furniture') || n.includes('sofa') || n.includes('chair') || n.includes('home')) return 'sofa';
    if (n.includes('fitness') || n.includes('gym') || n.includes('audio')) return 'dumbbell';
    return 'grid';
  }

  private simulateDataFetch() {
    // Simulate staggered loading (realistic: hero first, then categories, then products)
    setTimeout(() => this.isLoadingHero.set(false), 800);       // Hero loads fastest
    setTimeout(() => this.isLoadingCategories.set(false), 1200); // Categories next
    setTimeout(() => this.isLoadingProducts.set(false), 1800);   // Products last (biggest)
  }
}