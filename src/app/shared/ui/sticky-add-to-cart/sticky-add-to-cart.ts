import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-sticky-add-to-cart',
  standalone: true,
  templateUrl: './sticky-add-to-cart.html',
})
export class StickyAddToCartComponent {
  @Input({ required: true }) price!: number;
  @Input() qty = 1;
  @Output() add = new EventEmitter<void>();

  fmt(n: number) {
    const v = (n != null && typeof n === 'number') ? n : 0;
    return `$${v.toFixed(2)}`;
  }
}
