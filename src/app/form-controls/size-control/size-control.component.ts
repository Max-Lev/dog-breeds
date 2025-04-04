import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, forwardRef, inject, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import SIZE_CONTROL_PROVIDERS from './config';
import { AbstractControl, ControlValueAccessor, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR, ReactiveFormsModule, ValidationErrors, Validator, Validators } from '@angular/forms';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/operators';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { SizeControlAccessor } from './size-control-accessor';

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
  styleUrl: './size-control.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SizeControlComponent implements OnInit, AfterViewInit, ControlValueAccessor, Validator, OnDestroy, OnChanges {

  // FormControl to store the size value
  rangeCntrl = new FormControl(1);

  // accessor = new SizeControlAccessor(this.rangeCntrl)

  // Function to call when the value changes
  onChange: any = () => { };

  // Function to call when the control is touched
  onTouched: any = () => { };

  // Subject to unsubscribe from observables
  private destroy$ = new Subject<void>();
  /*
    writeValue = this.accessor.writeValue.bind(this.accessor);
    registerOnChange = (fn: any) => {
      this.accessor.registerOnChange(fn);
      this.accessor.registerOnChange((value:any) => this.onChange(value));
    };
    registerOnTouched = (fn: any) => this.onTouched = fn;
    setDisabledState = (isDisabled: boolean) => this.accessor.setDisabledState(isDisabled);
    // Validator
    validate = (control: AbstractControl): ValidationErrors | null => this.accessor.validate(control);
    registerOnValidatorChange = (fn: () => void) => this.accessor.registerOnValidatorChange(fn);
  */

  // Set the value of the FormControl
  writeValue(obj: any): void { this.rangeCntrl.setValue(obj); }
  // Register a function to call when the value changes
  registerOnChange(fn: any): void {
    this.rangeCntrl.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(value => {
      this.onChange(value);
      fn(value);
    });

  }
  // Register a function to call when the control is touched
  registerOnTouched(fn: any): void { this.onTouched = fn; }
  // Disable or enable the FormControl
  setDisabledState?(isDisabled: boolean): void { isDisabled ? this.rangeCntrl.disable() : this.rangeCntrl.enable(); }
  validate(control: AbstractControl): ValidationErrors | null { return control.valid ? null : { invalidRange: true }; }
  registerOnValidatorChange?(fn: () => void): void { fn(); }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {

  }

  ngOnChanges(changes: SimpleChanges): void {

  }

  // Unsubscribe from observables when the component is destroyed
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
