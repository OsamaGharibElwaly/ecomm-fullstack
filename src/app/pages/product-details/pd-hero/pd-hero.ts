import { Component, Input } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { IMAGE_FALLBACK_URL } from '../../../shared/constants/image-fallback';

@Component({
  selector: 'app-pd-hero',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './pd-hero.html',
})
export class PdHeroComponent {
  protected readonly IMAGE_FALLBACK_URL = IMAGE_FALLBACK_URL;

  @Input() badge?: string;
  @Input({ required: true }) images!: string[];
  /** Hex of selected color variant; when set, shows a tint overlay and a color chip on the image. */
  @Input() selectedColorHex?: string | null;
  /** Product title for accessible alt text */
  @Input() productTitle?: string;

  active = 0;
  imageError = false;

  get currentImage(): string {
    return this.images[this.active] || this.images[0] || IMAGE_FALLBACK_URL;
  }

  setActive(i: number): void {
    this.active = i;
    this.imageError = false;
  }

  onImgError(): void {
    this.imageError = true;
  }
}
