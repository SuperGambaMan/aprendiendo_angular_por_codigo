import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';

export interface CartProduct {
  productId: number;
  quantity: number;
}

export interface Cart {
  id: number;
  userId: number;
  date: string;
  products: CartProduct[];
}

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

@Injectable({ providedIn: 'root' })
export class CartService {
  private apiUrl = 'https://fakestoreapi.com';

  constructor(private http: HttpClient) {}

  getCartsByUser(userId: number): Observable<Cart[]> {
    return this.http.get<Cart[]>(`${this.apiUrl}/carts/user/${userId}`);
  }

  createCart(cart: Partial<Cart>): Observable<Cart> {
    return this.http.post<Cart>(`${this.apiUrl}/carts`, cart);
  }

  getProductById(productId: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/products/${productId}`);
  }

  getProductsDetails(products: CartProduct[]): Observable<Product[]> {
    const requests = products.map(p => this.getProductById(p.productId));
    return forkJoin(requests);
  }
}
