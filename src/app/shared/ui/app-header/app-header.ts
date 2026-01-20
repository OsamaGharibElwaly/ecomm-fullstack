import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './app-header.html',
})
export class AppHeaderComponent {
  @Input() cartCount = 0;
  @Input() favoriteCount = 0;  // ← ADD THIS LINE
  @Output() favoritesClick = new EventEmitter<void>();
}
