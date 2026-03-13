import { Component, forwardRef, inject, Input, ChangeDetectorRef, signal, computed, Injector, OnInit } from '@angular/core';
import { ControlValueAccessor, NgControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { HlmInputImports } from '@spartan-ng/helm/input';
import { BrnFormFieldControl } from '@spartan-ng/brain/form-field';
import { Subject } from 'rxjs';

let nextId = 0;

@Component({
  selector: 'app-custom-input',
  imports: [HlmInputImports],
  templateUrl: './custom-input.html',
  styleUrl: './custom-input.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomInput),
      multi: true,
    },
    {
      provide: BrnFormFieldControl,
      useExisting: forwardRef(() => CustomInput),
    }
  ]
})
export class CustomInput implements ControlValueAccessor, BrnFormFieldControl, OnInit {
  private cdr = inject(ChangeDetectorRef);
  private injector = inject(Injector);

  // ✅ Not injected at field level — resolved lazily in ngOnInit
  ngControl: NgControl | null = null;

  stateChanges = new Subject<void>();
  id = `custom-input-${nextId++}`;

   _touched = signal(false);
   
  ngOnInit() {
    // ✅ Injected after NG_VALUE_ACCESSOR is already resolved — no circular dep
    this.ngControl = this.injector.get(NgControl, null, { self: true, optional: true });
  }
  readonly errorState = computed(() =>
    this._touched() && (this.ngControl?.invalid ?? false)
  );
    handleBlur() {
    this.onTouched();
    this._touched.set(true);
    this.stateChanges.next();
    this.cdr.markForCheck();
  }

  ngOnDestroy() {
    this.stateChanges.complete();
  }

  value!: string;
  @Input() placeholder: string = '';
  @Input() type: string = 'text';

  onChange: (value: string) => void = () => {};
  onTouched: () => void = () => {};


  writeValue(value: any): void {
    this.value = value;
    this.stateChanges.next();
  }

  registerOnChange(fn: any): void { this.onChange = fn; }
  registerOnTouched(fn: any): void { this.onTouched = fn; }


}