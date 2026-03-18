import { Component, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Observable, switchMap, of } from 'rxjs';
import { Product } from '../product';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { SortPipe } from '../sort.pipe';

@Component({
  selector: 'app-product-list',
  imports: [
    SortPipe,
    AsyncPipe,
    RouterLink
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {
  products$: Observable<Product[]> | undefined;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.getProducts();
  }

  private getProducts() {
    this.products$ = this.route.data.pipe(
      switchMap(data => {
        return of(data['products']);
      })
    );
  }
}
