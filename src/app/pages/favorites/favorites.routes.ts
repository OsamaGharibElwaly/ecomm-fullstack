import { Routes } from '@angular/router';

export const FAVORITES_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./favorites').then((m) => m.FavoritesPage),
  },
];
