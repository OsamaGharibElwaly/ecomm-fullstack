import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-rating-stars',
  standalone: true,
  templateUrl: './rating-stars.html',
  styleUrl: './rating-stars.css',
})
export class RatingStars {
  @Input() rating = 0;

  /** Number of full stars (1–5). */
  get fullStars(): number {
    const r = Number(this.rating);
    if (!Number.isFinite(r) || r <= 0) return 0;
    return Math.min(5, Math.floor(r));
  }

  /** True when the next star should be half (e.g. 4.5). */
  get hasHalfStar(): boolean {
    const r = Number(this.rating);
    if (!Number.isFinite(r) || r >= 5) return false;
    const frac = r - Math.floor(r);
    return frac >= 0.25 && frac < 0.75;
  }

  /** Number of empty stars after full + optional half. */
  get emptyStars(): number {
    return 5 - this.fullStars - (this.hasHalfStar ? 1 : 0);
  }
}
