import { Component, EventEmitter, Output } from '@angular/core';
import {FormControl, FormsModule} from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  imports: [ReactiveFormsModule, FormsModule, ReactiveFormsModule],
  templateUrl: './search-bar.component.html'
})
export class SearchBarComponent {
  @Output() onSearch = new EventEmitter<string>(); // El "emisor" de datos
  searchControl = new FormControl('');

  constructor() {
    this.searchControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(valor => this.onSearch.emit(valor || ''));
  }
}
