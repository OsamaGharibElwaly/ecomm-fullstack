import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pd-info',
  standalone: true,
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
    const c = this.currency ?? '$';
    if (c === '$') return `$${n.toFixed(2)}`;
    return `${n.toFixed(2)} ${c}`;
  }
}
