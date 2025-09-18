import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { Cart, CartItem } from '../../models/cart.model';
import { Product } from '../../models/product.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss']
})
export class CartPageComponent implements OnInit {
  cart: Cart = { items: [], total: 0 };

  constructor(
    private cartService: CartService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.cartService.cart$.subscribe(cart => {
      this.cart = cart;
    });
  }

  removeFromCart(productId: number): void {
    this.cartService.removeFromCart(productId);
  }

  updateQuantity(item: CartItem, quantity: number | Event): void {
    // Handle both direct number input and event from template
    const newQuantity = typeof quantity === 'number' 
      ? quantity 
      : (quantity.target as HTMLInputElement).valueAsNumber;

    if (isNaN(newQuantity) || newQuantity < 1) {
      this.removeFromCart(item.product.id);
      return;
    }
    
    this.cartService.updateQuantity(item.product.id, newQuantity);
  }

  increaseQuantity(item: CartItem): void {
    this.updateQuantity(item, item.quantity + 1);
  }

  decreaseQuantity(item: CartItem): void {
    this.updateQuantity(item, item.quantity - 1);
  }

  clearCart(): void {
    if (confirm('¿Estás seguro de que quieres vaciar el carrito?')) {
      this.cartService.clearCart();
    }
  }

  getProductPrice(product: Product): number {
    return product.discount 
      ? product.price * (1 - product.discount / 100) 
      : product.price;
  }

  getTotalItems(): number {
    return this.cart.items.reduce((total, item) => total + item.quantity, 0);
  }

  checkout(): void {
    if (this.cart.items.length > 0) {
      this.router.navigate(['/checkout']);
    }
  }


  getItemTotal(item: CartItem): number {
    return this.getProductPrice(item.product) * item.quantity;
  }
}