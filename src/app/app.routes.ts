import { Routes } from '@angular/router';
import { authGuard } from './guards/auth-guard';
import { NOT_FOUND_ROUTES } from './pages/not-found/not-found.routes';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/home/home.routes').then((m) => m.HOME_ROUTES),
  },
  {
    path: 'product',
    loadChildren: () =>
      import('./pages/product-details/product-details.routes').then((m) => m.PRODUCT_DETAILS_ROUTES),
  },
  {
    path: 'cart',
    loadChildren: () => import('./pages/cart/cart.routes').then((m) => m.CART_ROUTES),
  },
  {
    path: 'account',
    canActivate: [authGuard],
    loadChildren: () => import('./pages/account/account.routes').then((m) => m.ACCOUNT_ROUTES),
  },
  {
    path: 'auth',
    loadChildren: () => import('./pages/auth/auth.routes').then((m) => m.AUTH_ROUTES),
  },
  {
    path: 'favorites',
    loadChildren: () => import('./pages/favorites/favorites.routes').then((m) => m.FAVORITES_ROUTES),
  },
  {
    path: 'error',
    loadChildren: () => import('./pages/error/error.routes').then((m) => m.ERROR_ROUTES),
  },
  ...NOT_FOUND_ROUTES,
];
