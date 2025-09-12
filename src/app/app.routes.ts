import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProductListPageComponent } from './pages/product-list/product-list.component';
import { CartPageComponent } from './pages/cart-page/cart-page.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';

export const routes: Routes = [
  { 
    path: '', 
    component: HomeComponent,
    data: { scrollToTop: true }
  },
  { 
    path: 'products', 
    component: ProductListPageComponent,
    data: { scrollToTop: true }
  },
  { 
    path: 'product/:id', 
    component: ProductDetailComponent,
    data: { scrollToTop: true }
  },
  { 
    path: 'cart', 
    component: CartPageComponent,
    data: { scrollToTop: true }
  },
  { 
    path: '**', 
    redirectTo: '',
    data: { scrollToTop: true }
  }
];