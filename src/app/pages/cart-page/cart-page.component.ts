import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { Cart, CartItem } from '../../models/cart.model';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss']
})
export class CartPageComponent implements OnInit {
  cart: Cart = { items: [], total: 0 };

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartService.cart$.subscribe(cart => {
      this.cart = cart;
    });
  }

  removeFromCart(productId: number): void {
    this.cartService.removeFromCart(productId);
  }

  updateQuantity(item: CartItem, quantity: number): void {
    if (quantity < 1) {
      this.removeFromCart(item.product.id);
      return;
    }
    
    this.cartService.updateQuantity(item.product.id, quantity);
  }

  increaseQuantity(item: CartItem): void {
    this.updateQuantity(item, item.quantity + 1);
  }

  decreaseQuantity(item: CartItem): void {
    this.updateQuantity(item, item.quantity - 1);
  }

  clearCart(): void {
    this.cartService.clearCart();
  }

  getProductPrice(product: Product): number {
    if (product.discount) {
      return product.price * (1 - product.discount / 100);
    }
    return product.price;
  }

  getItemTotal(item: CartItem): number {
    return this.getProductPrice(item.product) * item.quantity;
  }
}