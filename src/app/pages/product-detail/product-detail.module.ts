import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProductDetailComponent } from './product-detail.component';

const routes = [
  { 
    path: '', 
    component: ProductDetailComponent,
    data: { scrollToTop: true }
  }
];

@NgModule({
  imports: [
    ProductDetailComponent,
    RouterModule.forChild(routes)
  ]
})
export class ProductDetailModule { }
