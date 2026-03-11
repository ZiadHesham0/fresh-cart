import { Component, inject, OnInit, signal } from '@angular/core';
import { ProductCardComponent } from "../../../../../shared/components/ui/product-item/product-item";
import { ProductService } from '../../../../../shared/services/product/product';
import { Product as ProductInterface }  from '../../../../../shared/interfaces/product/product';
@Component({
  selector: 'app-recent-products',
  imports: [ProductCardComponent],
  templateUrl: './recent-products.html',
  styleUrl: './recent-products.css',
})

export class RecentProducts implements OnInit {
  private readonly _productService = inject(ProductService);
  products = signal<ProductInterface[]>([]) ;

  ngOnInit(): void {
    this.getProducts();
  }
  getProducts() {
    this._productService.getProducts().subscribe({
      next: (res) => {
        console.log(res);
        this.products.set(res.data) 
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
