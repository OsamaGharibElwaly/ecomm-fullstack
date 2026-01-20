import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-order-summary',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-summary.html',
})
export class OrderSummary {
  @Input() subtotal = 0;
  @Input() discount = 0;
  @Input() shippingLabel = 'Free';
  @Input() total = 0;
}
