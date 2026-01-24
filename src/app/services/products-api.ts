import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of, catchError, map } from 'rxjs';
import { environment } from '../../environments/environment';

/** Raw product shape from backend (https://shopend.vercel.app) */
export interface ApiProduct {
  id: number;
  name: string;
  description: string;
  brand: string;
  price: number;
  currency: string;
  formatted: string;
  originalPrice: number | null;
  discountPercent: number | null;
  category: string;
  colors: string[];
  images: string[];
  rating: number;
  reviewCount: number;
  inStock: boolean;
  stockCount: number;
  asin?: string;
  productUrl?: string;
  isPrime: boolean;
  isBestSeller: boolean;
  deliveryInfo?: string;
  createdAt: string;
  updatedAt: string;
}

/** Paginated products response: array or { data/products, total, page, totalPages } */
export interface ProductsListResponse {
  list: ApiProduct[];
  total: number;
  page: number;
  totalPages: number;
}

/** Category from API or fallback */
export interface ApiCategory {
  id: string;
  name: string;
  count?: number;
}

/** UI shape for product-card and home (id as string, reviewsCount, etc.) */
export interface UiProduct {
  id: string;
  title: string;
  category: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviewsCount: number;
  badge?: 'NEW' | 'SALE';
  imageUrl: string;
  currency?: string;
}

/** UI shape for product-details page (images, colors, specs, etc.) */
export interface ProductDetailsUi {
  id: string;
  title: string;
  description: string;
  images: string[];
  price: number;
  oldPrice?: number;
  rating: number;
  reviewsCount: number;
  badge?: string;
  specifications: string[];
  colors: { id: string; name: string; hex: string }[];
  category: string;
  currency?: string;
}

const COLOR_NAME_TO_HEX: Record<string, string> = {
  black: '#111827', white: '#FFFFFF', gray: '#6B7280', grey: '#6B7280',
  red: '#EF4444', orange: '#FF7A00', yellow: '#FFD400', blue: '#3B82F6',
  green: '#22C55E', pink: '#EC4899', purple: '#8B5CF6', brown: '#92400E',
};
function colorNameToHex(name: string): string {
  return COLOR_NAME_TO_HEX[String(name).toLowerCase()] ?? '#6B7280';
}

@Injectable({ providedIn: 'root' })
export class ProductsApiService {
  private http = inject(HttpClient);
  private base = environment.apiUrl;

  /**
   * Get products with pagination and optional filters.
   * Uses page & limit for performance (avoids loading 100+ at once).
   */
  getProducts(params: {
    page: number;
    limit: number;
    category?: string;
    sortBy?: string;
    order?: 'asc' | 'desc';
    minPrice?: number;
    maxPrice?: number;
  }): Observable<ProductsListResponse> {
    let httpParams = new HttpParams()
      .set('page', String(params.page))
      .set('limit', String(params.limit));
    if (params.category && params.category !== 'all')
      httpParams = httpParams.set('category', params.category);
    if (params.sortBy) httpParams = httpParams.set('sortBy', params.sortBy);
    if (params.order) httpParams = httpParams.set('order', params.order);
    if (params.minPrice != null) httpParams = httpParams.set('minPrice', String(params.minPrice));
    if (params.maxPrice != null) httpParams = httpParams.set('maxPrice', String(params.maxPrice));

    type ProductsResp = ApiProduct[] | { data?: ApiProduct[]; products?: ApiProduct[]; total?: number; page?: number; totalPages?: number };
    return this.http.get<ProductsResp>(`${this.base}/api/products`, { params: httpParams }).pipe(
      map((res: ProductsResp) => {
        if (Array.isArray(res)) {
          return { list: res, total: res.length, page: 1, totalPages: 1 };
        }
        const list = res.data ?? res.products ?? [];
        const total = res.total ?? list.length;
        const page = res.page ?? 1;
        const limit = params.limit;
        const totalPages = res.totalPages ?? (limit > 0 ? Math.ceil(total / limit) : 1);
        return { list, total, page, totalPages };
      }),
      catchError(() => of({ list: [], total: 0, page: 1, totalPages: 0 }))
    );
  }

  /**
   * Get a single product by id. Returns null on 404 or error.
   */
  getProductById(id: string | number): Observable<ApiProduct | null> {
    return this.http.get<ApiProduct>(`${this.base}/api/products/${id}`).pipe(
      catchError(() => of(null))
    );
  }

  /**
   * Get categories from /api/products/categories.
   * Fallback to All, CLOTHING, ELECTRONICS, GAMING on error or empty.
   */
  getCategories(): Observable<ApiCategory[]> {
    return this.http.get<{ name: string; count?: number }[] | ApiCategory[]>(`${this.base}/api/products/categories`).pipe(
      map((raw) => {
        if (!Array.isArray(raw) || raw.length === 0) return this.fallbackCategories();
        return [
          { id: 'all', name: 'All' },
          ...raw.map((c) => ({
            id: (c as any).id ?? String((c as any).name || c).toUpperCase(),
            name: (c as any).name || String(c),
            count: (c as any).count
          }))
        ];
      }),
      catchError(() => of(this.fallbackCategories()))
    );
  }

  private fallbackCategories(): ApiCategory[] {
    return [
      { id: 'all', name: 'All' },
      { id: 'CLOTHING', name: 'Clothing' },
      { id: 'ELECTRONICS', name: 'Electronics' },
      { id: 'GAMING', name: 'Gaming' }
    ];
  }
}

/** Map API product to UI shape used by product-card and home (favorites/cart). */
export function apiProductToUi(p: ApiProduct): UiProduct {
  return {
    id: String(p.id),
    title: p.name || '',
    category: p.category || 'General',
    price: p.price,
    oldPrice: p.originalPrice ?? undefined,
    rating: p.rating ?? 0,
    reviewsCount: p.reviewCount ?? 0,
    badge: (p.discountPercent != null && p.discountPercent > 0) ? 'SALE' : undefined,
    imageUrl: p.images?.[0] ?? `https://picsum.photos/seed/${p.id}/300/400`,
    currency: p.currency || undefined
  };
}

/** Map API product to product-details page UI (images, colors, etc.). */
export function apiProductToDetails(p: ApiProduct): ProductDetailsUi {
  const images = p.images?.length ? p.images : [`https://picsum.photos/seed/${p.id}/600/600`];
  const colors = (p.colors ?? []).map((name, i) => ({
    id: `c${i}`,
    name: String(name),
    hex: colorNameToHex(String(name))
  }));
  return {
    id: String(p.id),
    title: p.name || '',
    description: p.description || '',
    images,
    price: p.price,
    oldPrice: p.originalPrice ?? undefined,
    rating: p.rating ?? 0,
    reviewsCount: p.reviewCount ?? 0,
    badge: (p.discountPercent != null && p.discountPercent > 0) ? 'SALE' : undefined,
    specifications: [], // API has no specs
    colors,
    category: p.category || 'General',
    currency: p.currency || undefined
  };
}
