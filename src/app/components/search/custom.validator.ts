import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

export const crossFieldRequiredValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const formGroup = control as FormGroup;
    const breedName = formGroup.get('breedName');
    const rangeCntrl = formGroup.get('rangeCntrl');

    if (!breedName || !rangeCntrl) return null;

    const breedNameChanged = breedName.dirty && breedName.value.trim() !== '';
    const rangeChanged = rangeCntrl.dirty && rangeCntrl.value !== null;

    updateControlErrors(breedName, 'required');
    updateControlErrors(rangeCntrl, 'required');

    if (breedNameChanged && rangeCntrl.value === null) {
        rangeCntrl.setErrors({ ...rangeCntrl.errors, required: true });
    }

    if (rangeChanged && breedName.value.trim() === '') {
        breedName.setErrors({ ...breedName.errors, required: true });
    }

    return null;
};

function updateControlErrors(control: AbstractControl, errorKey: string): void {
    if (control.errors?.[errorKey]) {
        const { [errorKey]: removed, ...remaining } = control.errors;
        control.setErrors(Object.keys(remaining).length ? remaining : null);
    }
}