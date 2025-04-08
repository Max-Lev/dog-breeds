import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ageRangeValidatorFactory } from "./ageRange.validator";
import { IRange } from "../../core/models/breeds.model";
import { markRequiredFieldsTouchedValidator } from "./markRequiredFields.validator";

export const AdoptionFormInit = (WEIGHT_RANGE: IRange, AGE_RANGE: IRange, NEW_AGE_RANGE: IRange) => {

    return new FormGroup({
        weight: new FormControl<number | null>(null, {
            validators:
                [
                    Validators.min(WEIGHT_RANGE.min),
                    Validators.max(WEIGHT_RANGE.max),
                    Validators.required
                ], updateOn: 'change'
        }),
        color: new FormControl<string>('', {
            validators:
                Validators.required, updateOn: 'change'
        }),
        isFirst: new FormControl<boolean>(false),
        age: new FormControl<number | null>(null, {
            validators:
                [
                    Validators.min(AGE_RANGE.min),
                    Validators.max(AGE_RANGE.max),
                    Validators.required
                ], updateOn: 'change'
        })
    }, {
        validators: [
            ageRangeValidatorFactory(AGE_RANGE, NEW_AGE_RANGE),
            markRequiredFieldsTouchedValidator() 
        ]
    });

}

