
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

interface AgeRange { min: number; max: number; }

export const ageRangeValidatorFactory = (baseRange: AgeRange, newRange: AgeRange): ValidatorFn => {
    return (group: AbstractControl): ValidationErrors | null => {

        const isFirst = group.get('isFirst')?.value;

        const age = group.get('age')?.value;

        const range = isFirst ? newRange : baseRange;

        if (age == null) return null;

        if (age < range.min || age > range.max) {
            return { ageOutOfRange: range };
        }
        return null;
    };
}
