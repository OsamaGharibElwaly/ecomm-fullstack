import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RatingStars } from '../rating-stars/rating-stars';
import { IMAGE_FALLBACK_URL, IMAGE_PLACEHOLDER_URL } from '../../constants/image-fallback';

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
  imports: [RouterModule, RatingStars, NgOptimizedImage],
  templateUrl: './product-card.html',
})
export class ProductCard {
  protected readonly IMAGE_FALLBACK_URL = IMAGE_FALLBACK_URL;
  protected readonly IMAGE_PLACEHOLDER_URL = IMAGE_PLACEHOLDER_URL;

  @Input({ required: true }) product!: Product;
  @Input() isFavorite = false;
  @Input() priority = false;
  @Output() toggleLike = new EventEmitter<string>();
  @Output() addToCart = new EventEmitter<string>();

  imageError = false;

  onImgError(): void {
    this.imageError = true;
  }


  formatPrice(n: number) {
    const v = (n != null && typeof n === 'number') ? n : 0;
    const c = this.product.currency ?? '$';
    if (c === '$') return `$${v.toFixed(2)}`;
    return `${v.toFixed(2)} ${c}`;
  }
  onToggleLike(event: Event) {
    event.stopPropagation();
    this.toggleLike.emit();
  }
}
