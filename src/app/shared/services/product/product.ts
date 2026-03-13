import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly _httpClient = inject(HttpClient);
  env = environment.baseURL ;
  constructor() {}

  getProducts(): Observable<any> {
    return this._httpClient.get(`${this.env}/products`);
  }
}
