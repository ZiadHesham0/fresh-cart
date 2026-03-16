import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Footer } from "./core/layout/footer/footer";
import { Navbar } from "./core/layout/navbar/navbar";
import { AuthService } from './core/services/auth/auth';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Footer, Navbar],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('fresh-cart');
  _authService = inject(AuthService)
  ngOnInit(): void {
      // this._authService.isLoggedUser();
  }
}
