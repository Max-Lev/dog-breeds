import {Component, Input, OnDestroy } from '@angular/core';
import SIZE_CONTROL_PROVIDERS from './config';
import { AbstractControl, ControlValueAccessor, FormControl, ReactiveFormsModule, ValidationErrors, Validator } from '@angular/forms';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/operators';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-size-control',
  standalone: true,
  imports: [
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    CommonModule
  ],
  providers: [...SIZE_CONTROL_PROVIDERS],
  templateUrl: './size-control.component.html',
  styleUrl: './size-control.component.scss'
})
export class SizeControlComponent implements  ControlValueAccessor, Validator, OnDestroy {

  @Input() cntrlTitle: string = '';

  rangeCntrl = new FormControl();

  onChange: any = () => { };

  onTouched: any = () => { };

  private destroy$ = new Subject<void>();

  writeValue(obj: any): void { 
    this.rangeCntrl.setValue(obj); 
  }

  registerOnChange(fn: any): void {
    this.rangeCntrl.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(value => {
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

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
