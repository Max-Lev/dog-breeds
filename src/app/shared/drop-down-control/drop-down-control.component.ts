import { Component, Input, OnDestroy } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ControlValueAccessor, FormControl, ReactiveFormsModule } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import DROPDOWN_CONTROL_PROVIDERS from './config';
import { IOptions } from '../../core/models/breeds.model';
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

  @Input({ required: true }) cntrlTitle!: string;

  writeValue(value: any): void {
    this.dropDownControl.setValue(value);
  }

  registerOnChange(fn: any): void {
    this.dropDownControl.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(value => {
      this.onChange(value);
      fn(value);
    });
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    isDisabled ? this.dropDownControl.disable() : this.dropDownControl.enable();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }



}
