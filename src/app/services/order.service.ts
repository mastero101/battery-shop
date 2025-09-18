import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Order, OrderItem } from '../models/order.model';
import { Product } from '../models/product.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private orders: Order[] = [];
  private ordersSubject = new BehaviorSubject<Order[]>([]);

  constructor(private authService: AuthService) {
    this.loadOrders();
  }

  private loadOrders(): void {
    const storedOrders = localStorage.getItem('userOrders');
    if (storedOrders) {
      this.orders = JSON.parse(storedOrders);
      this.ordersSubject.next([...this.orders]);
    }
  }

  private saveOrders(): void {
    localStorage.setItem('userOrders', JSON.stringify(this.orders));
    this.ordersSubject.next([...this.orders]);
  }

  getOrders(): Observable<Order[]> {
    const user = this.authService.currentUserValue;
    if (user) {
      const userOrders = this.orders.filter(order => order.userId === user.id);
      return of(userOrders);
    }
    return of([]);
  }

  getOrderById(orderId: string): Observable<Order | undefined> {
    const order = this.orders.find(o => o.id === orderId);
    return of(order);
  }

  createOrder(
    items: { product: Product; quantity: number }[],
    shippingAddress: any,
    paymentMethod: string
  ): Observable<Order> {
    const user = this.authService.currentUserValue;
    if (!user) {
      throw new Error('User not authenticated');
    }

    const orderItems: OrderItem[] = items.map(item => ({
      product: item.product,
      quantity: item.quantity,
      price: item.product.price
    }));

    const total = orderItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const newOrder: Order = {
      id: `order-${Date.now()}`,
      userId: user.id,
      items: orderItems,
      status: 'pending',
      total,
      shippingAddress,
      paymentMethod,
      paymentStatus: 'pending',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    this.orders.push(newOrder);
    this.saveOrders();
    return of(newOrder);
  }

  cancelOrder(orderId: string): Observable<boolean> {
    const orderIndex = this.orders.findIndex(o => o.id === orderId);
    if (orderIndex !== -1) {
      this.orders[orderIndex] = {
        ...this.orders[orderIndex],
        status: 'cancelled',
        updatedAt: new Date()
      };
      this.saveOrders();
      return of(true);
    }
    return of(false);
  }
}
