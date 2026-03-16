import { HttpClient } from '@angular/common/http';
import { afterNextRender, inject, Injectable, signal } from '@angular/core';
import { loginAuth, UserAuth } from '../../interfaces/auth/user-auth';
import { BehaviorSubject, Observable } from 'rxjs';
import { API_BASE_URL } from '../../../token/api-token';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';
// import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly _httpClient = inject(HttpClient);
  _route = inject(Router);
  // env = environment.baseURL;
  _baseURL = inject(API_BASE_URL);
  userData: BehaviorSubject<any> = new BehaviorSubject(null);
  // userData = signal<any>('');

  constructor() {
    afterNextRender(() => {
      this.isLoggedUser();
    });
  }

  registerUser(userData: UserAuth): Observable<any> {
    return this._httpClient.post(`${this._baseURL}/auth/signup`, userData);
  }
  login(userData: loginAuth): Observable<any> {
    return this._httpClient.post(`${this._baseURL}/auth/signin`, userData);
  }
  logOut() {
    // 1- Delete Local storage
    localStorage.removeItem('userToken');
    // 2- set UserData = Null
    this.userData.next(null);
    // 3- Navigate to Login
    this._route.navigate(['/auth/login']);
  }

  saveUser() {
    if (localStorage.getItem('userToken')) {
      this.userData.next(jwtDecode(localStorage.getItem('userToken')!));
      // this.userData.set( jwtDecode(localStorage.getItem('userToken')! ) );
      // console.log(this.userData());
    }
  }

  isLoggedUser(): boolean {
    if (localStorage.getItem('userToken')) {
      this.userData.next(jwtDecode(localStorage.getItem('userToken')!));
      return true;
    } else {
      return false;
    }
  }
}
