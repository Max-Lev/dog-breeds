
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { IRange } from '../../core/models/breeds.model';


export const ageRangeValidatorFactory = (baseRange: IRange, newRange: IRange): ValidatorFn => {
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
