import { Component, inject } from '@angular/core';
import { ProductListComponent } from './product-list/product-list.component';
import { CopyrightDirective } from './copyright.directive';
import { APP_SETTINGS } from './app.settings';
import { AuthComponent } from './auth/auth.component';
import { CartComponent } from './cart/cart.component';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [
    ProductListComponent,
    CopyrightDirective,
    AuthComponent,
    CartComponent,
    ReactiveFormsModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  settings = inject(APP_SETTINGS);
}
