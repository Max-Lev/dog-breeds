import { forwardRef } from "@angular/core"
import { NG_VALUE_ACCESSOR } from "@angular/forms"
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from "@angular/material/form-field"
import { DropDownControlComponent } from "./drop-down-control.component"

export const DROPDOWN_CONTROL_PROVIDERS = [{
    provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
    useValue: { appearance: 'fill' }
},
{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DropDownControlComponent),
    multi: true
}];

export default DROPDOWN_CONTROL_PROVIDERS;
