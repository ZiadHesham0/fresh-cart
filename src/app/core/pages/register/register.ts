import { Component, inject, signal } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HlmFormFieldImports } from '@spartan-ng/helm/form-field';
import { HlmInputImports } from '@spartan-ng/helm/input';
import { AuthService } from '../../services/auth/auth';
import { UserAuth } from '../../interfaces/auth/user-auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, HlmFormFieldImports, HlmInputImports],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  _authService = inject(AuthService);
  isCallingApi = signal<boolean>(false);
  apiError: string = '';
  _router = inject(Router);

  registerForm = new FormGroup(
    {
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/),
      ]),
      rePassword: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]),
    },
    this.passwordConfirmation,
  );

  register() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
    } else {
      console.log(this.registerForm);
      this.isCallingApi.set(true);
      this.apiError = '';
      this._authService.registerUser(this.registerForm.value as UserAuth).subscribe({
        next: (res) => {
          console.log(res);
          this.isCallingApi.set(false);
          this.registerForm.reset();
          this._router.navigate(['/auth/login']);
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

  passwordConfirmation(form: AbstractControl) {
    const password = form.get('password')?.value;
    const rePassword = form.get('rePassword')?.value;
    if (password != rePassword) {
      return { misMatch: true };
    } else {
      return null;
    }
  }
}
