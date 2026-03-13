import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { loginAuth, UserAuth } from '../../interfaces/auth/user-auth';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly _httpClient = inject(HttpClient)
    env = environment.baseURL ;
  

  registerUser(userData : UserAuth) : Observable<any>{
    return this._httpClient.post(`${this.env}/auth/signup` , userData)
  }
  login(userData:loginAuth):Observable<any>{
    return this._httpClient.post(`${this.env}/auth/signin` , userData)
  }

}
