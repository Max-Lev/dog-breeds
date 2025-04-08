import { Component, DestroyRef, inject, Input } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ControlValueAccessor, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import DROPDOWN_CONTROL_PROVIDERS from './config';
import { IOptions } from '../../../core/models/breeds.model';
import { TitleCasePipe } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-drop-down',
  standalone: true,
  imports: [
    MatSelectModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    TitleCasePipe
  ],
  providers: [...DROPDOWN_CONTROL_PROVIDERS],
  templateUrl: './drop-down-control.component.html'
})
export class DropDownControlComponent implements ControlValueAccessor {

  dropDownControl = new FormControl('');

  onChange: any = () => { };

  onTouched: any = () => { };

  @Input() options: IOptions[] = [];

  @Input({ required: true }) cntrlTitle!: string;

  private destroyRef = inject(DestroyRef);

  writeValue = (value: any): void => this.dropDownControl.setValue(value);


  registerOnChange(fn: any): void {
    this.dropDownControl.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(value => {
      this.onChange(value);
      fn(value);
    });
  }

  registerOnTouched = (fn: any): void => this.onTouched = fn;

  setDisabledState(isDisabled: boolean): void {
    isDisabled ? this.dropDownControl.disable() : this.dropDownControl.enable();
  }

}
