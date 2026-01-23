import { Routes } from '@angular/router';

export const routes: Routes = [
  // Home page route
  {
    path: '',
    loadComponent: () =>
      import('./pages/home/home').then((m) => m.HomePage),
  },

  // Product details route with dynamic parameter 'id'
  {
    path: 'product/:id',
    loadComponent: () =>
      import('./pages/product-details/product-details').then((m) => m.ProductDetailsPage),
  },

  // Cart page route
  {
    path: 'cart',
    loadComponent: () =>
      import('./pages/cart/cart').then((m) => m.CartPage),
  },

  // Login page route
  {
    path: 'auth/login',
    loadComponent: () =>
      import('./pages/login/login').then((m) => m.LoginComponent),
  },
  {
    path: 'favorites', 
    loadComponent: () => 
      import('./pages/favorites/favorites').then(m => m.FavoritesPage),
  },

  // 404 Not Found page route
  {
    path: '**',
    loadComponent: () =>
      import('./pages/not-found/not-found').then((m) => m.NotFoundPage),
  },
];
