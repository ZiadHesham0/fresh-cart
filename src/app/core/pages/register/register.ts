import { Component, input } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HlmFormFieldImports  } from '@spartan-ng/helm/form-field';
import { HlmInputImports  } from '@spartan-ng/helm/input';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule , HlmFormFieldImports , HlmInputImports ],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  registerForm = new FormGroup({
    name: new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
    ]),
    email: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/),
    ]),
    password: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/),
    ]),
    rePassword: new FormControl(null, [Validators.required]),
    phone: new FormControl(null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]),
  } , {validators: this.passwordConfirmation } );

  register() {}



  passwordConfirmation(form : AbstractControl){
    const password = form.get('password')?.value
    const rePassword = form.get('password')?.value
    if(password != rePassword ){
      return {misMatch: true}
    }else{
      return null
    }
  }
}
