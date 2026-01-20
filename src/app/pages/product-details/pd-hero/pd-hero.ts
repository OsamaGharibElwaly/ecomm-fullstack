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

  active = 0;

  setActive(i: number) {
    this.active = i;
  }
}
