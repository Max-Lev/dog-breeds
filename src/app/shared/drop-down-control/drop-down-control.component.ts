import { Component, Input, OnDestroy } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ControlValueAccessor, FormControl, ReactiveFormsModule } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import DROPDOWN_CONTROL_PROVIDERS from './config';
import { IBreed, IOptions } from '../../core/models/breeds.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-drop-down',
  standalone: true,
  imports: [
    MatSelectModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    CommonModule
  ],
  providers: [...DROPDOWN_CONTROL_PROVIDERS],
  templateUrl: './drop-down-control.component.html',
  styleUrl: './drop-down-control.component.scss'
})
export class DropDownControlComponent implements ControlValueAccessor, OnDestroy {

  dropDownControl = new FormControl('');
  
  onChange: any = () => { };
  
  onTouched: any = () => { };
  
  private destroy$ = new Subject<void>();

  @Input() options: IOptions[] = [];

  @Input({required:true}) cntrlTitle!:string;

  // This function sets the value of the dropDownControl to the given value
  writeValue(value: any): void {
    // Set the value of the dropDownControl to the given value
    this.dropDownControl.setValue(value);
  }

  // Register a function to be called when the value of the dropDownControl changes
  registerOnChange(fn: any): void {
    
    // Subscribe to the valueChanges observable of the dropDownControl and call the onChange function when the value changes
    this.dropDownControl.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(value => {
      this.onChange(value);
      fn(value);         
    });
  }

  // This function registers a function to be called when the form control is touched
  registerOnTouched(fn: any): void {
    // Assign the function to the onTouched property of the form control
    this.onTouched = fn;
  }

  // This function sets the disabled state of the dropDownControl
  setDisabledState(isDisabled: boolean): void {
    // If isDisabled is true, disable the dropDownControl
    isDisabled ? this.dropDownControl.disable() : this.dropDownControl.enable();
  }


  // This function is called when the component is destroyed
  ngOnDestroy(): void {
    // This line emits a value to the destroy$ observable
    this.destroy$.next();
    // This line completes the destroy$ observable
    this.destroy$.complete();
  }



}
