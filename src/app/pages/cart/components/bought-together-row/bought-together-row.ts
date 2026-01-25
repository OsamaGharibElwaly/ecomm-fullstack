import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, Input, signal } from '@angular/core';
import { IMAGE_FALLBACK_URL } from '../../../../shared/constants/image-fallback';

export type SuggestionVM = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
};

@Component({
  selector: 'app-bought-together-row',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './bought-together-row.html',
})
export class BoughtTogetherRowComponent {
  protected readonly IMAGE_FALLBACK_URL = IMAGE_FALLBACK_URL;

  @Input({ required: true }) items!: SuggestionVM[];

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
}
