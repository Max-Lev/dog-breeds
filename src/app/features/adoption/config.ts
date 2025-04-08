import { ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { CheckBoxComponent } from "../../shared/form-controls/check-box/check-box.component";
import { DropDownControlComponent } from "../../shared/form-controls/drop-down-control/drop-down-control.component";
import { IRange } from "../../core/models/breeds.model";
import { SizeControlComponent } from "../../shared/form-controls/size-control/size-control.component";
import { SizeErrorsComponent } from "../../shared/form-controls/size-errors/size-errors.component";
import { SubmitBtnComponent } from "../../shared/form-controls/submit-btn/submit-btn.component";

export const ADOPTION_IMPORTS_CONFIG = [
    ReactiveFormsModule,
    DropDownControlComponent,
    SizeControlComponent,
    MatFormFieldModule,
    MatInputModule,
    SizeErrorsComponent,
    CheckBoxComponent,
    SubmitBtnComponent
];

export const COLOR_OPTIONS = [
    { id: 1, name: 'White' }, { id: 2, name: 'Black' },
    { id: 3, name: 'Brown' }, { id: 4, name: 'Golden' },
    { id: 5, name: 'Gray' }, { id: 6, name: 'Mixed' }
];

export const WEIGHT_RANGE: IRange = { min: 1, max: 100 };

export const AGE_RANGE: IRange = { min: 0, max: 20 };

export const NEW_AGE_RANGE: IRange = { min: 0, max: 8 };

