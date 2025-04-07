import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
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
export class CheckBoxComponent implements ControlValueAccessor {

  onChange: any = () => { };

  onTouched: any = () => { };

  checkBoxControl = new FormControl(false);

  private destroyRef = inject(DestroyRef);

  writeValue(obj: boolean): void {
    this.checkBoxControl.setValue(obj);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.checkBoxControl.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((value: boolean | null) => {
      this.onChange(value);
      this.onTouched();
    });
  }
  setDisabledState?(isDisabled: boolean): void {
    
  }


}
