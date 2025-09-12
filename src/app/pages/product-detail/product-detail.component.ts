import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  product: Product | undefined;
  relatedProducts: Product[] = [];
  selectedImage: string = '';

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
    
    // Handle route parameter changes
    this.route.paramMap.subscribe(params => {
      const productId = params.get('id');
      if (productId) {
        this.loadProduct(Number(productId));
      }
    });
  }

  loadProduct(id: number): void {
    this.productService.getProductById(id).subscribe(product => {
      if (product) {
        this.product = product;
        this.selectedImage = product.image;
        this.loadRelatedProducts(product);
      }
    });
  }

  loadRelatedProducts(product: Product): void {
    this.productService.getProducts().subscribe(products => {
      // Filtrar productos relacionados por química y formato
      this.relatedProducts = products
        .filter(p => 
          p.id !== product.id && 
          (p.chemistry === product.chemistry || p.format === product.format)
        )
        .slice(0, 4); // Limitar a 4 productos relacionados
    });
  }

  addToCart(event: Event, product: Product): void {
    event.preventDefault();
    event.stopPropagation();
    this.cartService.addToCart(product);
    
    // Optional: Show a success message or notification
    // You can implement a toast service or use a library like ngx-toastr
  }

  getProductPrice(): number {
    if (this.product) {
      if (this.product.discount) {
        return this.product.price * (1 - this.product.discount / 100);
      }
      return this.product.price;
    }
    return 0;
  }

  getCapacityDisplay(): string {
    if (!this.product) return '';
    return this.product.capacity >= 1000 
      ? `${this.product.capacity / 1000}Ah` 
      : `${this.product.capacity}mAh`;
  }

  selectImage(image: string): void {
    this.selectedImage = image;
  }
}