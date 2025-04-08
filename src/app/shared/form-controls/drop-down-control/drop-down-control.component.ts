import { Component, DestroyRef, inject, Input } from '@angular/core';
import { ControlValueAccessor, FormControl } from '@angular/forms';
import { DROPDOWN_CONTROL_IMPORTS, DROPDOWN_CONTROL_PROVIDERS } from './config';
import { IOptions } from '../../../core/models/breeds.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-drop-down',
  standalone: true,
  imports: [...DROPDOWN_CONTROL_IMPORTS],
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
