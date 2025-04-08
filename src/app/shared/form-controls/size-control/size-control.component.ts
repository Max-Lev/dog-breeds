import { Component, DestroyRef, inject, Input } from '@angular/core';
import SIZE_CONTROL_PROVIDERS from './config';
import { AbstractControl, ControlValueAccessor, FormControl, ReactiveFormsModule, ValidationErrors, Validator } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SizeErrorsComponent } from '../size-errors/size-errors.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-size-control',
  standalone: true,
  imports: [
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    SizeErrorsComponent
  ],
  providers: [...SIZE_CONTROL_PROVIDERS],
  templateUrl: './size-control.component.html',
  styleUrl: './size-control.component.scss'
})
export class SizeControlComponent implements ControlValueAccessor, Validator {

  @Input() cntrlTitle: string = '';

  rangeCntrl = new FormControl();

  onChange: any = () => { };

  onTouched: any = () => { };

  private destroyRef = inject(DestroyRef);

  writeValue(obj: any): void {
    this.rangeCntrl.setValue(obj);
  }

  registerOnChange(fn: any): void {
    this.rangeCntrl.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(value => {
      this.onChange(value);
      fn(value);
    });
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    isDisabled ? this.rangeCntrl.disable() : this.rangeCntrl.enable();
  }
  validate(control: AbstractControl): ValidationErrors | null {
    return control.valid ? null : { invalidRange: true };
  }
  registerOnValidatorChange?(fn: () => void): void {
    fn();
  }

}
