import { Injectable, signal } from '@angular/core';

export interface FavoriteItem {
  id: string;
  title: string;
  price: number;
  oldPrice?: number;
  imageUrl: string;
  badge?: string;
  rating?: number;
  reviewsCount?: number;
  addedAt: Date;
}

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  private readonly STORAGE_KEY = 'app_favorites';
  
  favorites = signal<FavoriteItem[]>(this.loadFromStorage());

  /**
   * Toggle a product as favorite
   * Returns true if added, false if removed
   */
  toggleFavorite(item: Omit<FavoriteItem, 'addedAt'>): boolean {
    const current = this.favorites();
    const existingIndex = current.findIndex(f => f.id === item.id);

    if (existingIndex >= 0) {
      // Remove from favorites
      const updated = [...current];
      updated.splice(existingIndex, 1);
      this.favorites.set(updated);
      this.saveToStorage(updated);
      return false;
    } else {
      // Add to favorites
      const newFavorite: FavoriteItem = {
        ...item,
        addedAt: new Date(),
      };
      const updated = [newFavorite, ...current];
      this.favorites.set(updated);
      this.saveToStorage(updated);
      return true;
    }
  }

  /**
   * Check if a product is favorited
   */
  isFavorite(productId: string): boolean {
    return this.favorites().some(f => f.id === productId);
  }

  /**
   * Remove a favorite by ID
   */
  removeFavorite(productId: string): void {
    const updated = this.favorites().filter(f => f.id !== productId);
    this.favorites.set(updated);
    this.saveToStorage(updated);
  }

  /**
   * Clear all favorites
   */
  clearAll(): void {
    this.favorites.set([]);
    this.saveToStorage([]);
  }

  /**
   * Get favorite count
   */
  get count(): number {
    return this.favorites().length;
  }

  private loadFromStorage(): FavoriteItem[] {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (!stored) return [];
      
      const parsed = JSON.parse(stored);
      // Convert date strings back to Date objects
      return parsed.map((item: any) => ({
        ...item,
        addedAt: new Date(item.addedAt),
      }));
    } catch {
      return [];
    }
  }

  private saveToStorage(items: FavoriteItem[]): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(items));
    } catch (error) {
      console.error('Failed to save favorites:', error);
    }
  }
}