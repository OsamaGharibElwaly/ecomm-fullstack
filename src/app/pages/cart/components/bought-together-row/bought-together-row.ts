import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

export type SuggestionVM = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
};

@Component({
  selector: 'app-bought-together-row',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bought-together-row.html',
})
export class BoughtTogetherRowComponent {
  @Input({ required: true }) items!: SuggestionVM[];
}
