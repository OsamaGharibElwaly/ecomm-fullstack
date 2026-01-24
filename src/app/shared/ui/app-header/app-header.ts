import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthNavComponent } from '../auth-nav/auth-nav';

@Component({
  selector: 'app-app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, AuthNavComponent],
  templateUrl: './app-header.html',
})
export class AppHeaderComponent {
  @Input() cartCount = 0;
  @Input() favoriteCount = 0;
  @Output() favoritesClick = new EventEmitter<void>();
}
