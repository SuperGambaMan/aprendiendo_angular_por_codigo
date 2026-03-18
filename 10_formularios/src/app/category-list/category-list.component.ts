import { Component } from '@angular/core';
import { CategoryCreateComponent } from '../category-create/category-create.component';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [CategoryCreateComponent],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.css'
})
export class CategoryListComponent {
  categories: string[] = ['Electrónica', 'Libros', 'Ropa'];
  showCreate = false;

  toggleCreate() {
    this.showCreate = !this.showCreate;
  }

  onCategoryCreated(newCategory: string) {
    this.categories.push(newCategory);
    this.showCreate = false;
  }
}

