import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-hero-banner',
  standalone: true,
  imports: [],
  templateUrl: './hero-banner.html',
  styleUrl: './hero-banner.css',
})
export class HeroBannerComponent {
  @Input({ required: true }) imageUrl!: string;
  @Input() badgeText = 'LIMITED OFFER';
  @Input({ required: true }) title!: string;
  @Input() subtitle = '';
  @Input() ctaText = 'Shop Now';
}
