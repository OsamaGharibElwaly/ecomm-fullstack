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

  @Input() liked = false;
  @Output() toggleLike = new EventEmitter<void>();

  format(n: number) {
    return `$${n.toFixed(2)}`;
  }
}
