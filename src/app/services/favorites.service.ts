import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Product } from '../models/product.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private favorites: { [userId: string]: number[] } = {};
  private favoritesSubject = new BehaviorSubject<number[]>([]);
  
  constructor(private authService: AuthService) {
    this.loadFavorites();
    
    // Update favorites when user changes
    this.authService.currentUser$.subscribe(user => {
      if (user) {
        this.favoritesSubject.next(this.favorites[user.id] || []);
      } else {
        this.favoritesSubject.next([]);
      }
    });
  }

  private getFavoritesKey(userId: string): string {
    return `favorites_${userId}`;
  }

  private loadFavorites(): void {
    if (typeof localStorage === 'undefined') return;
    
    const user = this.authService.currentUserValue;
    if (!user) return;
    
    const key = this.getFavoritesKey(user.id);
    const stored = localStorage.getItem(key);
    
    if (stored) {
      this.favorites[user.id] = JSON.parse(stored);
      this.favoritesSubject.next([...this.favorites[user.id]]);
    } else {
      this.favorites[user.id] = [];
    }
  }

  getFavorites(): Observable<number[]> {
    return this.favoritesSubject.asObservable();
  }

  isFavorite(productId: number): boolean {
    const user = this.authService.currentUserValue;
    if (!user || !this.favorites[user.id]) return false;
    
    return this.favorites[user.id].includes(productId);
  }

  toggleFavorite(productId: number): void {
    const user = this.authService.currentUserValue;
    if (!user) return;
    
    if (!this.favorites[user.id]) {
      this.favorites[user.id] = [];
    }
    
    const index = this.favorites[user.id].indexOf(productId);
    
    if (index === -1) {
      // Add to favorites
      this.favorites[user.id].push(productId);
    } else {
      // Remove from favorites
      this.favorites[user.id].splice(index, 1);
    }
    
    this.saveFavorites();
  }

  private saveFavorites(): void {
    const user = this.authService.currentUserValue;
    if (!user || !this.favorites[user.id]) return;
    
    const key = this.getFavoritesKey(user.id);
    localStorage.setItem(key, JSON.stringify(this.favorites[user.id]));
    this.favoritesSubject.next([...this.favorites[user.id]]);
  }
}
