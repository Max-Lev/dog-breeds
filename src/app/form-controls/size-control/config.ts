import { forwardRef } from "@angular/core";
import { NG_VALIDATORS, NG_VALUE_ACCESSOR } from "@angular/forms";
import { SizeControlComponent } from "./size-control.component";

export const SIZE_CONTROL_PROVIDERS = [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SizeControlComponent),
    multi: true
},
{
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => SizeControlComponent),
    // useExisting: SizeControlComponent,
    multi: true
}
];

export default SIZE_CONTROL_PROVIDERS;

