import { CommonModule } from '@angular/common';
import { Component, forwardRef, OnDestroy, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/operators';
@Component({
  selector: 'app-check-box',
  standalone: true,
  imports: [
    MatCheckboxModule,
    ReactiveFormsModule,
    CommonModule
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: CheckBoxComponent,
      multi: true
    }
  ],
  templateUrl: './check-box.component.html',
  styleUrl: './check-box.component.scss'
})
export class CheckBoxComponent implements ControlValueAccessor, OnDestroy {

  onChange: any = () => { };

  onTouched: any = () => { };

  private destroy$ = new Subject<void>();

  checkBoxControl = new FormControl(false);

  writeValue(obj: boolean): void {
    this.checkBoxControl.setValue(obj);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.checkBoxControl.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((value: boolean | null) => {
      this.onChange(value);
      this.onTouched();
    });
  }
  setDisabledState?(isDisabled: boolean): void {
    
  }


  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
