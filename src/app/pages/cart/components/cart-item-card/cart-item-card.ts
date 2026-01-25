import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

import { QtyStepperComponent } from '../../../../shared/ui/qty-stepper/qty-stepper';
import { IMAGE_FALLBACK_URL } from '../../../../shared/constants/image-fallback';

export type CartItemVM = {
  id: string;
  title: string;
  subtitle: string;
  price: number;
  qty: number;
  imageUrl: string;
  badge?: string;
};

@Component({
  selector: 'app-cart-item-card',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, QtyStepperComponent],
  templateUrl: './cart-item-card.html',
})
export class CartItemCardComponent {
  protected readonly IMAGE_FALLBACK_URL = IMAGE_FALLBACK_URL;

  @Input({ required: true }) item!: CartItemVM;

  @Output() remove = new EventEmitter<string>();
  @Output() qtyChange = new EventEmitter<number>();

  imageError = false;

  onRemove(): void {
    this.remove.emit(this.item.id);
  }

  onQtyChange(qty: number): void {
    this.qtyChange.emit(qty);
  }

  onImgError(): void {
    this.imageError = true;
  }
}
