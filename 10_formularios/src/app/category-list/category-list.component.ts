import { Component } from '@angular/core';
import {AsyncPipe, NgFor} from "@angular/common";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {SortPipe} from "../sort.pipe";
import {Observable, of, switchMap} from 'rxjs';

@Component({
  selector: 'app-category-list',
    imports: [
        AsyncPipe,
        NgFor,
        RouterLink,
        SortPipe
    ],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.css'
})
export class CategoryListComponent {
  categories$: Observable<string[]> | undefined;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.getCategories();
  }

  private getCategories() {
    this.categories$ = this.route.data.pipe(
      switchMap(data => {
        return of(data['categories']);
      })
    );

  }

  trackByCategory(index: number, category: string): string {
    return category;
  }
}
