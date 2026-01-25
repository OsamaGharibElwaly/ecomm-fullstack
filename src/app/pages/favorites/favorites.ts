import { Component, inject, OnInit } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';

import { PageTopbarComponent } from '../../shared/ui/page-topbar/page-topbar';
import { FavoritesFacade } from './favorites.facade';

@Component({
  selector: 'app-favorites-page',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, PageTopbarComponent],
  providers: [FavoritesFacade],
  templateUrl: './favorites.html',
})
export class FavoritesPage implements OnInit {
  readonly f = inject(FavoritesFacade);

  ngOnInit(): void {
    this.f.init();
  }
}
