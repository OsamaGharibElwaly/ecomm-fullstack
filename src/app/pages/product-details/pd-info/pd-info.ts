import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RatingStars } from '../../../shared/ui/rating-stars/rating-stars';

@Component({
  selector: 'app-pd-info',
  standalone: true,
  imports: [RatingStars],
  templateUrl: './pd-info.html',
})
export class PdInfoComponent {
  @Input({ required: true }) title!: string;
  @Input({ required: true }) price!: number;
  @Input() oldPrice?: number;
  @Input({ required: true }) rating!: number;
  @Input({ required: true }) reviewsCount!: number;
  @Input() currency?: string;

  @Input() liked = false;
  @Output() toggleLike = new EventEmitter<void>();

  format(n: number) {
    const v = (n != null && typeof n === 'number') ? n : 0;
    const c = this.currency ?? '$';
    if (c === '$') return `$${v.toFixed(2)}`;
    return `${v.toFixed(2)} ${c}`;
  }
}
