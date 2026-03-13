import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HlmFormFieldImports } from '@spartan-ng/helm/form-field';
import { HlmInputImports } from '@spartan-ng/helm/input';
import { AuthService } from '../../services/auth/auth';
import { loginAuth } from '../../interfaces/auth/user-auth';
import { Router } from '@angular/router';
import { Subscription, timer } from 'rxjs';

@Component({
  selector: 'app-login',
  imports: [HlmFormFieldImports, HlmInputImports, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  _authService = inject(AuthService);
  isCallingApi = signal<boolean>(false);
  apiError: string = '';
  _router = inject(Router);
  subscription: Subscription = new Subscription();
  passwordEye: boolean = false;
  timeOut! : NodeJS.Timeout;

  loginForm = new FormGroup({
    email: new FormControl('zyad123@gmail.com', [
      Validators.required,
      Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/),
    ]),
    password: new FormControl('Zzyad@123456789', [
      Validators.required,
      Validators.pattern(/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/),
    ]),
  });

  login() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
    } else {
      console.log(this.loginForm);
      this.isCallingApi.set(true);
      this.apiError = '';
      this._authService.login(this.loginForm.value as loginAuth).subscribe({
        next: (res) => {
          console.log(res);
          this.isCallingApi.set(false);
          this.loginForm.reset();
          // setTimeout(()=>{
          //   this._router.navigate(['/home']);
          // } , 2000)

          timer(2000).subscribe(()=>{
            this._router.navigate(['/home']);
          })
          // delay()

        },
        error: (err) => {
          console.log(err);
          this.apiError = err.error.message;
          this.isCallingApi.set(false);
        },
        complete: () => {},
      });
    }
  }

  toggleShowPassword() {
    this.passwordEye = !this.passwordEye;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    // clearTimeout(this.timeOut);
  }
}
