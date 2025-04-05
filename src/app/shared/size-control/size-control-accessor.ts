// size-control-accessor.ts
import { AbstractControl, FormControl, ValidationErrors } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

export class SizeControlAccessor {
  destroy$ = new Subject<void>();

  constructor(public control: FormControl) {}

  writeValue(obj: any): void {
    this.control.setValue(obj);
  }

  registerOnChange(fn: any): void {
    this.control.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(value => fn(value));
  }

  registerOnTouched(fn: any): void {
    fn();
  }

  setDisabledState(isDisabled: boolean): void {
    isDisabled ? this.control.disable() : this.control.enable();
  }

  validate(control: AbstractControl): ValidationErrors | null {
    return control.valid ? null : { invalidRange: true };
  }

  registerOnValidatorChange(fn: () => void): void {fn();}
}
