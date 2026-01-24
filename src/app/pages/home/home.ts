import { Component, computed, inject, signal } from '@angular/core';
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
import { ProductsApiService, apiProductToUi, UiProduct } from '../../services/products-api';

type CategoryIcon = 'grid' | 'monitor' | 'hanger' | 'sofa' | 'dumbbell';

interface Category {
  id: string;
  name: string;
  icon: CategoryIcon;
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
  private productsApi = inject(ProductsApiService);

  // Separate loading states – each section loads independently
  isLoadingHero = signal<boolean>(true);
  isLoadingCategories = signal<boolean>(true);
  isLoadingProducts = signal<boolean>(true);
  isLoadingMore = signal<boolean>(false);
  hasMore = signal<boolean>(true);
  currentPage = signal<number>(1);

  // Signals
  cartCount = this.cart.count;
  favoriteCount = computed(() => this.favoritesService.favorites().length);
  search = signal<string>('');
  activeCategoryId = signal<string>('all');

  products = signal<UiProduct[]>([]);
  categories = signal<Category[]>([]);

  // Client-side search over currently loaded products (category filter is applied by API)
  filteredProducts = computed<UiProduct[]>(() => {
    const query = this.search().trim().toLowerCase();
    if (!query) return this.products();
    return this.products().filter(p =>
      p.title.toLowerCase().includes(query) ||
      (p.category || '').toLowerCase().includes(query)
    );
  });

  ngOnInit() {
    // Hero: keep short mock delay for UX
    setTimeout(() => this.isLoadingHero.set(false), 400);
    // Categories from API
    this.productsApi.getCategories().subscribe(cats => {
      this.categories.set(cats.map(c => ({
        id: c.id,
        name: c.name,
        icon: this.getCategoryIcon(c.name)
      })));
      this.isLoadingCategories.set(false);
    });
    // First page of products with pagination (limit 12 for performance)
    this.loadProducts(1, false);
  }

  // ─────────────────────────────────────────────
  // Event handlers
  // ─────────────────────────────────────────────

  onSearch(value: string) {
    this.search.set(value);
  }

  onCategoryChange(id: string) {
    this.activeCategoryId.set(id);
    this.loadProducts(1, false);
  }

  loadMore() {
    if (this.isLoadingMore() || !this.hasMore()) return;
    this.isLoadingMore.set(true);
    this.loadProducts(this.currentPage() + 1, true);
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
    if (n.includes('clothing')) return 'hanger';
    if (n.includes('electronic') || n.includes('monitor') || n.includes('screen') || n.includes('display')) return 'monitor';
    if (n.includes('gaming') || n.includes('fitness') || n.includes('gym') || n.includes('audio')) return 'dumbbell';
    if (n.includes('furniture') || n.includes('sofa') || n.includes('chair') || n.includes('home')) return 'sofa';
    return 'grid';
  }

  private loadProducts(page: number, append: boolean) {
    if (!append) {
      this.products.set([]);
      this.isLoadingProducts.set(true);
    }
    const category = this.activeCategoryId();
    this.productsApi.getProducts({
      page,
      limit: 12,
      category: category === 'all' ? undefined : category,
      sortBy: 'createdAt',
      order: 'desc'
    }).subscribe(res => {
      const list = res.list.map(apiProductToUi);
      if (append) {
        this.products.update(prev => [...prev, ...list]);
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