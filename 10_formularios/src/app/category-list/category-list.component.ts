import { Component } from '@angular/core';
import {AsyncPipe, NgFor} from "@angular/common";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {SortPipe} from "../sort.pipe";
import {Observable, of, switchMap} from 'rxjs';
import { SearchBarComponent } from '../search-bar/search-bar.component';

@Component({
  selector: 'app-category-list',
    imports: [
        SearchBarComponent,
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
  categorias: any[] = []; // Tus datos originales
  categoriasFiltradas: any[] = [...this.categorias];

  filtrarCategorias(termino: string) {
    this.categoriasFiltradas = this.categorias.filter(cat =>
      cat.toLowerCase().includes(termino.toLowerCase())
    );
  }
  constructor(private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.getCategories();
  }

  private getCategories() {
    this.categories$ = this.route.data.pipe(
      switchMap(data => of(data['categories']))
    );
    this.categories$.subscribe(cats => {
      this.categorias = cats || [];
      this.categoriasFiltradas = [...this.categorias];
    });
  }

  trackByCategory(index: number, category: string): string {
    return category;
  }
}
