import { ResolveFn } from '@angular/router';
import {inject} from '@angular/core';
import {CategoriesService} from './categories.service';

export const categoriesResolver: ResolveFn<string[]> = (route, state) => {
  const categoriesService = inject(CategoriesService);
  const limit = Number(route.queryParamMap.get('limit'));
  return categoriesService.getCategories(limit);
};
