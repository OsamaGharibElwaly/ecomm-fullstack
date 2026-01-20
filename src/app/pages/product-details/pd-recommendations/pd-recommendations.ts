import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

export type MiniProduct = { id: string; title: string; price: number; imageUrl: string };

@Component({
  selector: 'app-recommendation-row',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './pd-recommendations.html',
})
export class RecommendationRowComponent {
  @Input({ required: true }) items!: MiniProduct[];
  fmt(n: number) { return `$${n.toFixed(2)}`; }
}
