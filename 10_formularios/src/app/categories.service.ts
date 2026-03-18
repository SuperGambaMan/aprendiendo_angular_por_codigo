import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { APP_SETTINGS } from './app.settings';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private categories: string[] = [];
  private categoriesUrl = inject(APP_SETTINGS).apiUrl + '/products/categories';

  constructor(private http: HttpClient) { }

  getCategories(limit?: number): Observable<string[]> {
    if (this.categories.length === 0) {
      const options = new HttpParams().set('limit', limit || 10);
      return this.http.get<string[]>(this.categoriesUrl, {
        params: options
      }).pipe(map(categories => {
        this.categories = categories;
        return categories;
      }));
    }
    return of(this.categories);
  }


  addCategory(newCategory: string): Observable<string> {
    if (!this.categories.includes(newCategory)) {
      this.categories.push(newCategory);
    }
    return of(newCategory);
  }



}
