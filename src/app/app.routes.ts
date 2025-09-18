import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { CartComponent } from './pages/cart/cart.component';
import { LoginComponent } from './pages/login/login.component';
import { authGuard } from '@app/guards/auth.guard';

export const routes: Routes = [
  { 
    path: '', 
    component: HomeComponent, 
    pathMatch: 'full',
    data: { scrollToTop: true }
  },
  { 
    path: 'products', 
    component: ProductListComponent,
    data: { scrollToTop: true }
  },
  { 
    path: 'products/:id', 
    loadChildren: () => import('./pages/product-detail/product-detail.module').then(m => m.ProductDetailModule),
    data: { scrollToTop: true }
  },
  { 
    path: 'cart', 
    component: CartComponent,
    data: { scrollToTop: true }
  },
  { 
    path: 'account', 
    canActivate: [authGuard],
    loadChildren: () => import('./pages/user-profile/user-profile.module').then(m => m.UserProfileModule),
    data: { scrollToTop: true, title: 'Mi Cuenta' }
  },
  { 
    path: 'login', 
    component: LoginComponent,
    data: { scrollToTop: true, title: 'Iniciar sesión' }
  },
  { 
    path: 'register', 
    redirectTo: '/login', 
    pathMatch: 'full',
    data: { scrollToTop: true }
  },
  { 
    path: 'forgot-password', 
    redirectTo: '/login', 
    pathMatch: 'full',
    data: { scrollToTop: true }
  },
  { 
    path: '**', 
    redirectTo: '',
    data: { scrollToTop: true }
  }
];