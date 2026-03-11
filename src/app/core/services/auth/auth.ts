import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { loginAuth, UserAuth } from '../../interfaces/auth/user-auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly _httpClient = inject(HttpClient)

  registerUser(userData : UserAuth) : Observable<any>{
    return this._httpClient.post('https://ecommerce.routemisr.com/api/v1/auth/signup' , userData)
  }
  login(userData:loginAuth):Observable<any>{
    return this._httpClient.post('https://ecommerce.routemisr.com/api/v1/auth/signin' , userData)
  }

}
