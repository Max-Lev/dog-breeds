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

  sizeCntrl = new FormControl(0);

  onChange: any = () => { };

  onTouched: any = () => { };

  private destroy$ = new Subject<void>();

  writeValue(obj: any): void {
    this.sizeCntrl.setValue(obj);
  }
  registerOnChange(fn: any): void {
    this.sizeCntrl.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(value => {
      this.onChange(value);
      fn(value);
    });
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
    
  }
  setDisabledState?(isDisabled: boolean): void {
    isDisabled ? this.sizeCntrl.disable() : this.sizeCntrl.enable();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
