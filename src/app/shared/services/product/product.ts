import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../../../token/api-token';
// import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly _httpClient = inject(HttpClient);
  // env = environment.baseURL ;
  _baseURL = inject(API_BASE_URL)

  constructor() {}

  getProducts(): Observable<any> {
    return this._httpClient.get(`${this._baseURL}/products`);
  }
}
