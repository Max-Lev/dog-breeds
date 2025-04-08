import { forwardRef } from "@angular/core"
import { NG_VALUE_ACCESSOR, ReactiveFormsModule } from "@angular/forms"
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule } from "@angular/material/form-field"
import { DropDownControlComponent } from "./drop-down-control.component"
import { TitleCasePipe } from "@angular/common";
import { MatSelectModule } from "@angular/material/select";

export const DROPDOWN_CONTROL_PROVIDERS = [{
    provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
    useValue: { appearance: 'fill' }
},
{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DropDownControlComponent),
    multi: true
}];


export const DROPDOWN_CONTROL_IMPORTS =[
    MatSelectModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    TitleCasePipe
];