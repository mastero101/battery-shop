import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  isLoading = false;
  showPassword = false;
  error: string | null = null;
  private authSub: Subscription | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      remember: [false]
    });
    
    // Load saved email if 'remember me' was checked
    const savedEmail = localStorage.getItem('savedEmail');
    if (savedEmail) {
      this.loginForm.patchValue({
        email: savedEmail,
        remember: true
      });
    }
  }

  ngOnInit(): void {
    // If user is already logged in, redirect to account page
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/account']);
    }
  }

  ngOnDestroy(): void {
    if (this.authSub) {
      this.authSub.unsubscribe();
    }
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }

    this.isLoading = true;
    this.error = null;

    const { email, password, remember } = this.loginForm.value;
    
    // Save email to localStorage if 'remember me' is checked
    if (remember) {
      localStorage.setItem('savedEmail', email);
    } else {
      localStorage.removeItem('savedEmail');
    }

    this.authSub = this.authService.login(email, password).subscribe({
      next: () => {
        this.router.navigate(['/account']);
      },
      error: (error) => {
        this.error = error.message || 'Error al iniciar sesión. Por favor, inténtalo de nuevo.';
        this.isLoading = false;
      }
    });
  }

  // Access form controls directly in the template using loginForm.controls
}
