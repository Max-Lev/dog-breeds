import { FormGroup, FormControl, Validators } from "@angular/forms";
import { markRequiredFieldsTouchedValidator } from "../../shared/validators/markRequiredFields.validator";
import { IRange } from "../../core/models/breeds.model";

export const SearchFormInit = (RANGE_CONFIG:IRange) =>{
    return  new FormGroup({
        breedName: new FormControl<string>('', { nonNullable: true }),
        rangeCntrl: new FormControl(null,
          {
            validators: [
              Validators.min(RANGE_CONFIG.min),
              Validators.max(RANGE_CONFIG.max),
              Validators.required
            ],
            updateOn: 'change'
          })
      },{
        validators:[markRequiredFieldsTouchedValidator()]
      });
}