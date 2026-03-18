import { Component, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-category-create',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './category-create.component.html',
  styleUrl: './category-create.component.css'
})
export class CategoryCreateComponent {
  @Output() categoryCreated = new EventEmitter<string>();

  categoryForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)])
  });

  submit() {
    if (this.categoryForm.valid) {
      this.categoryCreated.emit(this.categoryForm.value.name!);
      this.categoryForm.reset();
    }
  }
}

