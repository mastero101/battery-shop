import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Cart, CartItem } from '../models/cart.model';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: Cart = { items: [], total: 0 };
  private cartSubject = new BehaviorSubject<Cart>(this.cart);
  
  cart$ = this.cartSubject.asObservable();

  constructor() { }

  addToCart(product: Product, quantity: number = 1): void {
    const existingItem = this.cart.items.find(item => item.product.id === product.id);
    
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.cart.items.push({ product, quantity });
    }
    
    this.updateCart();
  }

  removeFromCart(productId: number): void {
    this.cart.items = this.cart.items.filter(item => item.product.id !== productId);
    this.updateCart();
  }

  updateQuantity(productId: number, quantity: number): void {
    const item = this.cart.items.find(item => item.product.id === productId);
    if (item) {
      item.quantity = quantity;
      if (item.quantity <= 0) {
        this.removeFromCart(productId);
      } else {
        this.updateCart();
      }
    }
  }

  clearCart(): void {
    this.cart.items = [];
    this.updateCart();
  }

  private updateCart(): void {
    this.cart.total = this.cart.items.reduce((total, item) => {
      const price = item.product.discount 
        ? item.product.price * (1 - item.product.discount / 100)
        : item.product.price;
      return total + (price * item.quantity);
    }, 0);
    
    this.cartSubject.next({...this.cart});
  }

  getCart(): Observable<Cart> {
    return this.cartSubject.asObservable();
  }
}