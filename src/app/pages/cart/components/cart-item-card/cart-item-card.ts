import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

import { QtyStepperComponent } from '../../../../shared/ui/qty-stepper/qty-stepper';

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
  imports: [CommonModule, QtyStepperComponent],
  templateUrl: './cart-item-card.html',
})
export class CartItemCardComponent {
  @Input({ required: true }) item!: CartItemVM;

  @Output() remove = new EventEmitter<string>();
  @Output() qtyChange = new EventEmitter<number>();

  onRemove() {
    this.remove.emit(this.item.id);
  }

  onQtyChange(qty: number) {
    this.qtyChange.emit(qty);
  }
}
