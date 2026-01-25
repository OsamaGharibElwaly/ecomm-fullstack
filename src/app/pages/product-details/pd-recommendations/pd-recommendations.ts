import { Component, Input, signal } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IMAGE_FALLBACK_URL } from '../../../shared/constants/image-fallback';

export type MiniProduct = { id: string; title: string; price: number; imageUrl: string };

@Component({
  selector: 'app-recommendation-row',
  standalone: true,
  imports: [RouterModule, NgOptimizedImage],
  templateUrl: './pd-recommendations.html',
})
export class RecommendationRowComponent {
  protected readonly IMAGE_FALLBACK_URL = IMAGE_FALLBACK_URL;

  @Input({ required: true }) items!: MiniProduct[];

  private imageErrorIds = signal<Set<string>>(new Set());

  onImgError(id: string): void {
    this.imageErrorIds.update((s) => {
      if (s.has(id)) return s;
      const n = new Set(s);
      n.add(id);
      return n;
    });
  }

  hasImageError(id: string): boolean {
    return this.imageErrorIds().has(id);
  }

  fmt(n: number): string {
    const v = (n != null && typeof n === 'number') ? n : 0;
    return `$${Number(v).toFixed(2)}`;
  }
}
