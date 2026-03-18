import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import {CategoriesService} from '../categories.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-category-create',
  imports: [ReactiveFormsModule],
  templateUrl: './category-create.component.html',
  styleUrl: './category-create.component.css'
})
export class CategoryCreateComponent {
  categoryForm = new FormGroup({
    title: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.minLength(3),
      ]
    })
  });

  constructor(private categoriesService: CategoriesService, private router: Router) {}

  createCategory() {
    const title = this.categoryForm!.get('title')!.value;
    this.categoriesService.addCategory(title).subscribe(() => {
      this.router.navigate(['/products/categories']);
    });
  }
}
