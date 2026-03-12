import { Component, input, output } from '@angular/core';
import { Product } from '../product';

@Component({
  selector: 'app-product-detail',
  imports: [],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent {
  product = input<Product | null>(null);
  added = output<Product>();

  addToCart() {
    const currentProduct = this.product();
    if (currentProduct) {
      this.added.emit(currentProduct!);
    }
  }
}
