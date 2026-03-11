import { Component, inject, OnInit } from '@angular/core';
import { ProductCardComponent } from "../../../../../shared/components/ui/product-item/product-item";
import { Product } from '../../../../../shared/services/product/product';
import { Product as ProductInterface }  from '../../../../../shared/interfaces/product/product';
@Component({
  selector: 'app-recent-products',
  imports: [ProductCardComponent],
  templateUrl: './recent-products.html',
  styleUrl: './recent-products.css',
})

export class RecentProducts implements OnInit {
  private readonly _product = inject(Product);
  products!:ProductInterface[] ;

  ngOnInit(): void {
    this.getProducts();
  }
  getProducts() {
    this._product.getProducts().subscribe({
      next: (res) => {
        console.log(res);
        this.products = res.data
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
