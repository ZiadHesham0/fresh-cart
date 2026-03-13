import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { loginAuth, UserAuth } from '../../interfaces/auth/user-auth';
import { BehaviorSubject, Observable } from 'rxjs';
import { API_BASE_URL } from '../../../token/api-token';
import { jwtDecode } from 'jwt-decode';
// import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly _httpClient = inject(HttpClient);
  // env = environment.baseURL;
  _baseURL = inject(API_BASE_URL);
  // userData: BehaviorSubject<any> = new BehaviorSubject('');
  userData = signal<any>('');


  registerUser(userData: UserAuth): Observable<any> {
    return this._httpClient.post(`${this._baseURL}/auth/signup`, userData);
  }
  login(userData: loginAuth): Observable<any> {
    return this._httpClient.post(`${this._baseURL}/auth/signin`, userData);
  }

  saveUser() {
    if (localStorage.getItem('userToken')) {
      // this.userData.next(jwtDecode(localStorage.getItem('userToken')!)) ;
      this.userData.set( jwtDecode(localStorage.getItem('userToken')! ) );
      console.log(this.userData());
    }
  }
}
