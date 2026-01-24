import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';

type Product = {
  id: string;
  title: string;
  category: string;
  price: number;
  oldPrice?: number;
  rating: number;
  badge?: 'NEW' | 'SALE';
  imageUrl: string;
  liked?: boolean;
  currency?: string;
};

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './product-card.html',
})
export class ProductCard {
  onImgError(event: Event) {
  const img = event.target as HTMLImageElement | null;
  if (!img) return;
  img.src = `https://picsum.photos/seed/fallback-${this.product.id}/600/400`;
}
  @Input({ required: true }) product!: Product;
  @Input() isFavorite = false;  // ← ADD THIS LINE
  @Output() toggleLike = new EventEmitter<string>();  // ← UPDATE THIS (if you already have it)
  @Output() addToCart = new EventEmitter<string>();


  formatPrice(n: number) {
    const c = this.product.currency ?? '$';
    if (c === '$') return `$${n.toFixed(2)}`;
    return `${n.toFixed(2)} ${c}`;
  }
  onToggleLike(event: Event) {
    event.stopPropagation();
    this.toggleLike.emit();
  }
}
