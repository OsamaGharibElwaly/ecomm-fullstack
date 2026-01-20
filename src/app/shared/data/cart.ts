import { Injectable, computed, effect, signal, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export type CartItem = {
  id: string;
  title: string;
  subtitle: string;
  price: number;
  qty: number;
  imageUrl: string;
  badge?: string;
};

const STORAGE_KEY = 'app_cart_v1';

@Injectable({ providedIn: 'root' })
export class CartService {
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  private _items = signal<CartItem[]>([]);
  items = this._items.asReadonly();

  count = computed(() => this._items().reduce((acc, x) => acc + x.qty, 0));
  subtotal = computed(() => this._items().reduce((acc, x) => acc + x.price * x.qty, 0));

  constructor() {
    if (this.isBrowser) {
      this._items.set(this.loadFromStorage());

      effect(() => {
        this.saveToStorage(this._items());
      });
    }
  }

  add(item: Omit<CartItem, 'qty'>, qty = 1) {
    const addQty = Math.max(1, qty);
    const safeItem: Omit<CartItem, 'qty'> = {
      ...item,
      subtitle: item.subtitle ?? '',
    };

    this._items.update((curr) => {
      const idx = curr.findIndex((x) => x.id === safeItem.id);
      if (idx >= 0) {
        const copy = [...curr];
        copy[idx] = { ...copy[idx], qty: copy[idx].qty + addQty };
        return copy;
      }
      return [...curr, { ...safeItem, qty: addQty }];
    });
  }

  setQty(id: string, qty: number) {
    this._items.update((curr) =>
      curr.map((x) => (x.id === id ? { ...x, qty: Math.max(1, qty) } : x))
    );
  }

  remove(id: string) {
    this._items.update((curr) => curr.filter((x) => x.id !== id));
  }

  clear() {
    this._items.set([]);
    if (this.isBrowser) {
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch {}
    }
  }

  private loadFromStorage(): CartItem[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) return [];

      return parsed.map((x: any) => ({
        id: String(x?.id ?? ''),
        title: String(x?.title ?? ''),
        subtitle: String(x?.subtitle ?? ''),
        price: Number(x?.price ?? 0),
        qty: Math.max(1, Number(x?.qty ?? 1)),
        imageUrl: String(x?.imageUrl ?? ''),
        badge: x?.badge ? String(x.badge) : '',
      }));
    } catch {
      return [];
    }
  }

  private saveToStorage(items: CartItem[]) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {}
  }
}
