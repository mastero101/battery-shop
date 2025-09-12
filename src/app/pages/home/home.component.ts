import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  // Carousel configuration
  carouselItems = [
    {
      title: 'Ofertas Especiales',
      description: 'Hasta 15% de descuento en baterías seleccionadas',
      buttonText: 'Ver Ofertas',
      link: '/products',
      class: 'bg-primary',
      active: true
    },
    {
      title: 'Nueva Colección',
      description: 'Baterías ecológicas de última generación',
      buttonText: 'Explorar',
      link: '/products',
      class: 'bg-success',
      active: false
    },
    {
      title: 'Envío Gratis',
      description: 'En compras superiores a $100',
      buttonText: 'Comprar Ahora',
      link: '/products',
      class: 'bg-info',
      active: false
    }
  ];
  
  private carouselInterval: any;
  featuredProducts: Product[] = [];
  categories: { name: string, icon: string, query: any }[] = [
    { 
      name: 'Baterías LiFePO4', 
      icon: 'battery-charging',
      query: { chemistry: 'LiFePO4' }
    },
    { 
      name: 'Baterías 18650', 
      icon: 'battery-full',
      query: { format: '18650' }
    },
    { 
      name: 'Baterías 26650', 
      icon: 'battery',
      query: { format: '26650' }
    },
    { 
      name: 'Baterías de Sodio', 
      icon: 'battery-charging',
      query: { chemistry: 'Na-Ion' }
    },
    { 
      name: 'BMS', 
      icon: 'motherboard',
      query: { format: 'BMS' }
    }
  ];

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private router: Router
  ) {
    this.startCarousel();
  }

  ngOnInit(): void {
    this.loadFeaturedProducts();
  }

  // Carousel methods
  selectSlide(index: number): void {
    this.carouselItems.forEach((item, i) => {
      item.active = i === index;
    });
  }

  nextSlide(): void {
    const currentIndex = this.carouselItems.findIndex(item => item.active);
    const nextIndex = (currentIndex + 1) % this.carouselItems.length;
    this.selectSlide(nextIndex);
  }

  prevSlide(): void {
    const currentIndex = this.carouselItems.findIndex(item => item.active);
    const prevIndex = (currentIndex - 1 + this.carouselItems.length) % this.carouselItems.length;
    this.selectSlide(prevIndex);
  }

  private startCarousel(): void {
    this.carouselInterval = setInterval(() => {
      this.nextSlide();
    }, 5000);
  }

  ngOnDestroy(): void {
    if (this.carouselInterval) {
      clearInterval(this.carouselInterval);
    }
  }

  loadFeaturedProducts(): void {
    this.productService.getFeaturedProducts().subscribe(products => {
      this.featuredProducts = products;
    });
  }

  addToCart(event: Event, product: Product): void {
    event.stopPropagation();
    this.cartService.addToCart(product);
  }

  viewProductDetails(product: Product, event: Event): void {
    event.preventDefault();
    this.router.navigate(['/product', product.id]);
  }
}