import { Component } from '@angular/core';
import { Product } from '../product';
import { ProductDetailComponent } from '../product-detail/product-detail.component';
import { CartComponent } from '../cart/cart.component';
import { CartItem } from '../cart';

@Component({
  selector: 'app-product-list',
  imports: [ProductDetailComponent, CartComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {
  products: Product[] = [
    { id: 1, title: 'Keyboard' },
    { id: 2, title: 'Microphone' },
    { id: 3, title: 'Web camera' },
    { id: 4, title: 'Tablet' }
  ];
    selectedProduct: Product | null = null;

  // nuevo: array de items de carrito
  cartItems: CartItem[] = [];

  onselect(product: Product) {
    this.selectedProduct = product;
    console.log(`selected product: ${product.title}`);
  }

  onAdded() {
    if (!this.selectedProduct) {
      return;
    }

    const existing = this.cartItems.find(
      (item) => this.selectedProduct!.id === item.product.id
    );

    if (existing) {
      existing.quantity++;
    } else {
      this.cartItems.push({ product: this.selectedProduct, quantity: 1 });
    }

    console.log(`${this.selectedProduct.title} added to cart`);
  }
}
