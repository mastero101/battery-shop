import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { OrderService } from '../../services/order.service';
import { FavoritesService } from '../../services/favorites.service';
import { ProductService } from '../../services/product.service';
import { User } from '../../models/user.model';
import { Order } from '../../models/order.model';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule
  ],
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  activeTab = 'profile';
  user: User | null = null;
  orders: Order[] = [];
  favoriteProducts: Product[] = [];
  isLoading = true;

  constructor(
    private authService: AuthService,
    private orderService: OrderService,
    private favoritesService: FavoritesService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.user = this.authService.currentUserValue;
    
    if (this.user) {
      this.loadUserData();
    }
    
    // Subscribe to user changes
    this.authService.currentUser$.subscribe(user => {
      this.user = user;
      if (user) {
        this.loadUserData();
      } else {
        this.orders = [];
        this.favoriteProducts = [];
      }
    });
  }

  private loadUserData(): void {
    if (!this.user) return;
    
    this.isLoading = true;
    
    // Load orders
    this.orderService.getOrders().subscribe(orders => {
      this.orders = orders;
      this.isLoading = false;
    });
    
    // Load favorites
    this.favoritesService.getFavorites().subscribe(favoriteIds => {
      if (favoriteIds.length > 0) {
        this.productService.getProducts().subscribe(products => {
          this.favoriteProducts = products.filter(p => favoriteIds.includes(p.id));
        });
      } else {
        this.favoriteProducts = [];
      }
    });
  }

  removeFromFavorites(productId: number): void {
    this.favoritesService.toggleFavorite(productId);
  }

  getOrderStatusClass(status: string): string {
    switch (status) {
      case 'delivered':
        return 'text-success';
      case 'cancelled':
        return 'text-danger';
      case 'processing':
      case 'shipped':
        return 'text-warning';
      default:
        return 'text-secondary';
    }
  }

  logout(): void {
    this.authService.logout();
  }
}
