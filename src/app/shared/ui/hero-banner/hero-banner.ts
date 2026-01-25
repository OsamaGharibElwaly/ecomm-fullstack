import { Component, Input } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { IMAGE_FALLBACK_URL, IMAGE_PLACEHOLDER_URL } from '../../constants/image-fallback';

@Component({
  selector: 'app-hero-banner',
  standalone: true,
  imports: [NgOptimizedImage],
  templateUrl: './hero-banner.html',
  styleUrl: './hero-banner.css',
})
export class HeroBannerComponent {
  protected readonly IMAGE_FALLBACK_URL = IMAGE_FALLBACK_URL;
  protected readonly IMAGE_PLACEHOLDER_URL = IMAGE_PLACEHOLDER_URL;

  @Input({ required: true }) imageUrl!: string;
  @Input() badgeText = 'LIMITED OFFER';
  @Input({ required: true }) title!: string;
  @Input() subtitle = '';
  @Input() ctaText = 'Shop Now';

  imageError = false;

  onImgError(): void {
    this.imageError = true;
  }
}
