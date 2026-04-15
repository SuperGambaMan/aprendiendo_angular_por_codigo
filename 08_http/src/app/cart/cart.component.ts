import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { CartService, Cart, Product } from './cart.service';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-cart',
  templateUrl: 'cart.component.html',
  styleUrl: './cart.component.css',
  standalone: true,
  imports: [
    DatePipe,
    ReactiveFormsModule
  ]
})
export class CartComponent {
  userIdForm: FormGroup;
  carts: Cart[] = [];
  selectedCartProducts: Product[] = [];
  loading = false;
  error = '';

  constructor(private fb: FormBuilder, private cartService: CartService) {
    this.userIdForm = this.fb.group({
      userId: [1, [Validators.required, Validators.min(1)]]
    });
    this.fetchCarts();
  }

  fetchCarts() {
    this.loading = true;
    this.error = '';
    const userId = this.userIdForm.value.userId;
    this.cartService.getCartsByUser(userId).subscribe({
      next: carts => {
        this.carts = carts;
        this.loading = false;
      },
      error: err => {
        this.error = 'Error al cargar los carts';
        this.loading = false;
      }
    });
  }

  createCart() {
    this.loading = true;
    this.error = '';
    const userId = this.userIdForm.value.userId;
    const newCart = {
      userId,
      date: new Date().toISOString(),
      products: []
    };
    this.cartService.createCart(newCart).subscribe({
      next: cart => {
        this.fetchCarts();
      },
      error: err => {
        this.error = 'Error al crear el cart';
        this.loading = false;
      }
    });
  }

  loadCartProducts(cart: Cart) {
    this.loading = true;
    this.selectedCartProducts = [];
    this.cartService.getProductsDetails(cart.products).subscribe({
      next: products => {
        this.selectedCartProducts = products;
        this.loading = false;
      },
      error: err => {
        this.error = 'Error al cargar productos del cart';
        this.loading = false;
      }
    });
  }
}
