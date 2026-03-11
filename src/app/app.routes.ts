import { ProductDetails } from './features/pages/product-details/product-details';
import { Routes } from '@angular/router';
import { AuthLayout } from './core/layout/auth-layout/auth-layout';
import path from 'path';

export const routes: Routes = [
  {
    path: 'auth',
    component: AuthLayout,
    children: [
      {
        path: '',
        loadComponent: () => import('./core/pages/register/register').then((c) => c.Register),
        title: 'Register',
      },
      {
        path: 'login',
        loadComponent: () => import('./core/pages/login/login').then((c) => c.Login),
        title: 'Login',
      },
      {
        path: 'forget-password',
        loadComponent: () =>
          import('./core/pages/forget-password/forget-password').then((c) => c.ForgetPassword),
        title: 'Forget Password',
      },
    ],
  },

  {
    path: '',
    loadComponent: () => import('./core/pages/login/login').then((c) => c.Login),
    title: 'Login',
  },
  {
    path: 'home',
    loadComponent: () => import('./features/pages/home/home').then((c) => c.Home),
    title: 'home',
  },
  {
    path: 'brands',
    loadComponent: () => import('./features/pages/brands/brands').then((c) => c.Brands),
    title: 'Brands',
  },
  {
    path: 'categories',
    loadComponent: () => import('./features/pages/categories/categories').then((c) => c.Categories),
    title: 'Categories',
  },
  {
    path: 'products',
    loadComponent: () => import('./features/pages/products/products').then((c) => c.Products),
    title: 'products',
  },
  {
    path: 'cart',
    loadComponent: () => import('./features/pages/cart/cart').then((c) => c.Cart),
    title: 'Cart',
  },
  {
    path: 'productDetails',
    loadComponent: () =>
      import('./features/pages/product-details/product-details').then((c) => c.ProductDetails),
    title: 'Product Details',
  },
  {
    path: '**',
    loadComponent: () =>
      import('./core/pages/not-found/not-found').then((c) => c.NotFound),
    title: 'Error',
  },
];
