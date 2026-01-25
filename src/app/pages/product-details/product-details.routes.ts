import { Routes } from '@angular/router';

export const PRODUCT_DETAILS_ROUTES: Routes = [
  {
    path: ':id',
    loadComponent: () => import('./product-details').then((m) => m.ProductDetailsPage),
  },
];
