import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CartService } from '../../services/cart.service';
import { CheckoutService } from '../../services/checkout.service';
import { Cart } from '../../models/cart.model';

interface PaymentMethod {
  id: string;
  name: string;
  icon: string;
  description: string;
}

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  currentStep: number = 1;
  cart: Cart = { items: [], total: 0 };
  isLoading: boolean = false;
  orderSuccess: boolean = false;
  orderId: string = '';

  // Form groups
  shippingForm: FormGroup;
  paymentForm: FormGroup;
  reviewForm: FormGroup;

  // Mexican states
  states: string[] = [
    'Aguascalientes', 'Baja California', 'Baja California Sur', 'Campeche', 'Chiapas', 
    'Chihuahua', 'Ciudad de México', 'Coahuila', 'Colima', 'Durango', 'Estado de México', 
    'Guanajuato', 'Guerrero', 'Hidalgo', 'Jalisco', 'Michoacán', 'Morelos', 'Nayarit', 
    'Nuevo León', 'Oaxaca', 'Puebla', 'Querétaro', 'Quintana Roo', 'San Luis Potosí', 
    'Sinaloa', 'Sonora', 'Tabasco', 'Tamaulipas', 'Tlaxcala', 'Veracruz', 'Yucatán', 'Zacatecas'
  ];

  // Payment methods
  paymentMethods: PaymentMethod[] = [
    {
      id: 'credit_card',
      name: 'Tarjeta de crédito/débito',
      icon: 'bi-credit-card',
      description: 'Paga con tu tarjeta de crédito o débito de forma segura.'
    },
    {
      id: 'paypal',
      name: 'PayPal',
      icon: 'bi-paypal',
      description: 'Paga de forma rápida y segura con tu cuenta de PayPal.'
    },
    {
      id: 'bank_transfer',
      name: 'Transferencia bancaria',
      icon: 'bi-bank',
      description: 'Realiza una transferencia bancaria directa a nuestra cuenta.'
    }
  ];

  selectedPaymentMethod: string = 'credit_card';

  constructor(
    private fb: FormBuilder,
    private cartService: CartService,
    private checkoutService: CheckoutService,
    private router: Router
  ) {
    // Initialize forms
    this.shippingForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      address: ['', [Validators.required]],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      zipCode: ['', [Validators.required, Validators.pattern('^[0-9]{5}$')]],
      notes: ['']
    });

    this.paymentForm = this.fb.group({
      cardNumber: ['', [Validators.required, Validators.pattern('^[0-9]{16}$')]],
      cardName: ['', [Validators.required]],
      expiryDate: ['', [Validators.required, Validators.pattern('^(0[1-9]|1[0-2])\/[0-9]{2}$')]],
      cvv: ['', [Validators.required, Validators.pattern('^[0-9]{3,4}$')]]
    });

    this.reviewForm = this.fb.group({
      terms: [false, [Validators.requiredTrue]]
    });
  }

  ngOnInit(): void {
    this.cartService.cart$.subscribe(cart => {
      this.cart = cart;
      if (cart.items.length === 0 && !this.orderSuccess) {
        this.router.navigate(['/cart']);
      }
    });
  }

  // Navigation between steps
  nextStep(): void {
    if (this.currentStep < 3) {
      this.currentStep++;
    } else if (this.currentStep === 3) {
      this.placeOrder();
    }
  }

  prevStep(): void {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  // Handle payment method selection
  selectPaymentMethod(methodId: string): void {
    this.selectedPaymentMethod = methodId;
  }

  // Place order
  async placeOrder(): Promise<void> {
    if (this.reviewForm.valid) {
      this.isLoading = true;
      
      const orderData = {
        shipping: this.shippingForm.value,
        payment: {
          method: this.selectedPaymentMethod,
          ...(this.selectedPaymentMethod === 'credit_card' ? this.paymentForm.value : {})
        },
        items: this.cart.items,
        total: this.cart.total
      };

      try {
        // Simulate API call with a small delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        const response = await this.checkoutService.placeOrder(orderData);
        this.isLoading = false;
        this.orderSuccess = true;
        this.orderId = response.orderId;
        this.cartService.clearCart();
        this.currentStep = 4; // Show success step
      } catch (error: any) {
        console.error('Error placing order:', error);
        this.isLoading = false;
        // Show error message to user
        // You might want to show a toast or alert here
      }
    }
  }

  // Helper methods
  getProgressWidth(): string {
    return `${(this.currentStep / 3) * 100}%`;
  }

  // Form getters for template
  get shippingControls() {
    return this.shippingForm.controls;
  }

  get paymentControls() {
    return this.paymentForm.controls;
  }

  // Calculate product price considering discount if any
  getProductPrice(product: any): number {
    if (!product) return 0;
    if (product.discount) {
      return product.price * (1 - product.discount / 100);
    }
    return product.price;
  }
}
