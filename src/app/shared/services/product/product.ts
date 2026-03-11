import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly _httpClient = inject(HttpClient);

  constructor() {}

  getProducts(): Observable<any> {
    return this._httpClient.get('https://ecommerce.routemisr.com/api/v1/products');
  }
}
