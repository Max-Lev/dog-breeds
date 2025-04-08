import { AbstractControl, ValidationErrors, ValidatorFn, FormGroup, Validators } from '@angular/forms';

export const markRequiredFieldsTouchedValidator = (): ValidatorFn => {

    return (form: AbstractControl): ValidationErrors | null => {
        
        if (!(form instanceof FormGroup)) return null;

        Object.entries(form.controls).forEach(([key, ctrl]) => {

            const isRequired = ctrl.hasValidator?.(Validators.required);

            const value = ctrl.value;

            if (isRequired && value !== null && value !== '' && !ctrl.touched) {

                ctrl.markAsTouched({ onlySelf: true });
                
                ctrl.updateValueAndValidity({ onlySelf: true, emitEvent: false });
            }

        });

        return null;
    };
}
