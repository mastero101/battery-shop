import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  constructor() {
    // Check for user in localStorage on service initialization
    const user = localStorage.getItem('currentUser');
    if (user) {
      this.currentUserSubject.next(JSON.parse(user));
    }
  }

  login(email: string, password: string): Observable<boolean> {
    // In a real app, this would make an HTTP request to your backend
    // For now, we'll simulate a successful login with mock data
    const mockUser: User = {
      id: '1',
      email: email,
      firstName: 'Usuario',
      lastName: 'Demo',
      phone: '1234567890',
      address: {
        street: 'Calle Falsa 123',
        city: 'Ciudad',
        state: 'Estado',
        zipCode: '12345',
        country: 'País'
      },
      createdAt: new Date(),
      updatedAt: new Date()
    };

    localStorage.setItem('currentUser', JSON.stringify(mockUser));
    this.currentUserSubject.next(mockUser);
    return of(true);
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  isAuthenticated(): boolean {
    return this.currentUserValue !== null;
  }

  updateUser(user: Partial<User>): Observable<boolean> {
    const currentUser = this.currentUserValue;
    if (currentUser) {
      const updatedUser = { ...currentUser, ...user, updatedAt: new Date() };
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
      this.currentUserSubject.next(updatedUser);
      return of(true);
    }
    return of(false);
  }
}
