import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-section-header',
  imports: [RouterModule],
  standalone: true,
  templateUrl: './section-header.html',
  styleUrl: './section-header.css',
})
export class SectionHeaderComponent {
  @Input({ required: true }) title!: string;
  @Input() actionText?: string;
  @Input() actionLink?: string;
  @Input() icon?: 'filter';
}
