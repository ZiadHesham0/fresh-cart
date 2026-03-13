import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { HlmFormFieldImports } from '@spartan-ng/helm/form-field';
import { HlmInputImports } from '@spartan-ng/helm/input';

@Component({
  selector: 'app-error-message',
  imports: [ HlmFormFieldImports, HlmInputImports],
  templateUrl: './error-message.html',
  styleUrl: './error-message.css',
})
export class ErrorMessage {
  @Input() nameControl! : AbstractControl | null;

}
