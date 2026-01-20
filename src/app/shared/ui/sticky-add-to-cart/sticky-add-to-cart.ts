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

  fmt(n: number) { return `$${n.toFixed(2)}`; }
}
