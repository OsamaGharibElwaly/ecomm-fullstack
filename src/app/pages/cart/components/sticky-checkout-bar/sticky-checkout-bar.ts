import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-sticky-checkout-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sticky-checkout-bar.html',
})
export class StickyCheckoutBarComponent {
  @Input() total = 0;
  @Output() checkout = new EventEmitter<void>();

  onCheckout() {
    this.checkout.emit();
  }
}
