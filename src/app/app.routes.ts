import { Routes } from '@angular/router';
import { guestGuard } from './guards/guest-guard';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home').then((m) => m.HomePage),
  },
  {
    path: 'product/:id',
    loadComponent: () => import('./pages/product-details/product-details').then((m) => m.ProductDetailsPage),
  },
  {
    path: 'cart',
    loadComponent: () => import('./pages/cart/cart').then((m) => m.CartPage),
  },
  {
    path: 'account',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/account/account').then((m) => m.AccountPage),
  },
  {
    path: 'auth/login',
    canActivate: [guestGuard],
    loadComponent: () => import('./pages/login/login').then((m) => m.LoginComponent),
  },
  {
    path: 'auth/register',
    canActivate: [guestGuard],
    loadComponent: () => import('./pages/register/register').then((m) => m.RegisterPage),
  },
  {
    path: 'favorites',
    loadComponent: () => import('./pages/favorites/favorites').then((m) => m.FavoritesPage),
  },
  { path: '404', loadComponent: () => import('./pages/not-found/not-found').then((m) => m.NotFoundPage) },
  { path: '**', loadComponent: () => import('./pages/not-found/not-found').then((m) => m.NotFoundPage) },
];
