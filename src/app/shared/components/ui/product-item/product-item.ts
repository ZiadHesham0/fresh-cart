// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-product-item',
//   imports: [],
//   templateUrl: './product-item.html',
//   styleUrl: './product-item.css',
// })
// export class ProductItem {}

import { Component, input, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../../interfaces/product/product';


@Component({
  selector: 'app-product-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-item.html',
  styleUrl: './product-item.css',
})
export class ProductCardComponent {
  product = input.required<Product>();

  isFav = signal(false);

  /** Auto-calculated discount percentage */
  discountPercent = computed(() => {
    const p = this.product();
    return Math.round(((p.price - (p.price/(Math.random() +2))) / p.price) * 100);
  });

  /** Converts numeric rating to ['full' | 'half' | 'empty'] × 5 */
  stars = computed(() => {
    const rating = this.product().ratingsAverage;
    return Array.from({ length: 5 }, (_, i) => {
      if (i + 1 <= Math.floor(rating)) return 'full';
      if (i < rating) return 'half';
      return 'empty';
    });
  });

  toggleFav(): void {
    this.isFav.update((v) => !v);
  }
}
