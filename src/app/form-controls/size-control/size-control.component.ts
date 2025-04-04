import { Component, OnDestroy } from '@angular/core';
import SIZE_CONTROL_PROVIDERS from './config';
import { ControlValueAccessor, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/operators';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
@Component({
  selector: 'app-size-control',
  standalone: true,
  imports: [
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule
  ],
  providers: [SIZE_CONTROL_PROVIDERS],
  templateUrl: './size-control.component.html',
  styleUrl: './size-control.component.scss'
})
export class SizeControlComponent implements ControlValueAccessor, OnDestroy {

  // FormControl to store the size value
  sizeCntrl = new FormControl(0);

  // Function to call when the value changes
  onChange: any = () => { };

  // Function to call when the control is touched
  onTouched: any = () => { };

  // Subject to unsubscribe from observables
  private destroy$ = new Subject<void>();

  // Set the value of the FormControl
  writeValue(obj: any): void {
    this.sizeCntrl.setValue(obj);
  }
  // Register a function to call when the value changes
  registerOnChange(fn: any): void {
    this.sizeCntrl.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(value => {
      this.onChange(value);
      fn(value);
    });
  }
  // Register a function to call when the control is touched
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
    
  }
  // Disable or enable the FormControl
  setDisabledState?(isDisabled: boolean): void {
    isDisabled ? this.sizeCntrl.disable() : this.sizeCntrl.enable();
  }

  // Unsubscribe from observables when the component is destroyed
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
