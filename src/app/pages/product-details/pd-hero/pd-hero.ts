import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pd-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pd-hero.html',
})
export class PdHeroComponent {
  @Input() badge?: string;
  @Input({ required: true }) images!: string[];
  /** Hex of selected color variant; when set, shows a tint overlay and a color chip on the image. */
  @Input() selectedColorHex?: string | null;

  active = 0;

  get currentImage(): string {
    return this.images[this.active] || this.images[0];
  }

  setActive(i: number) {
    this.active = i;
  }
}
