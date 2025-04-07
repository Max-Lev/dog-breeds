import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { CheckBoxComponent } from "../../shared/check-box/check-box.component";
import { DropDownControlComponent } from "../../shared/drop-down-control/drop-down-control.component";
import { SizeControlComponent } from "../../shared/size-control/size-control.component";
import { SizeErrorsComponent } from "../../shared/size-errors/size-errors.component";
import { IRange } from "../../core/models/breeds.model";

export const ADOPTION_IMPORTS_CONFIG = [
    ReactiveFormsModule,
    DropDownControlComponent,
    SizeControlComponent,
    MatFormFieldModule,
    MatInputModule,
    SizeErrorsComponent,
    CheckBoxComponent,
    MatButtonModule,
    MatProgressSpinnerModule,
    CommonModule,
    MatSnackBarModule,
];

export const COLOR_OPTIONS = [
    { id: 1, name: 'White' }, { id: 2, name: 'Black' },
    { id: 3, name: 'Brown' }, { id: 4, name: 'Golden' },
    { id: 5, name: 'Gray' }, { id: 6, name: 'Mixed' }
];

export const WEIGHT_RANGE: IRange = { min: 1, max: 100 };
export const AGE_RANGE: IRange = { min: 0, max: 20 };
export const NEW_AGE_RANGE: IRange = { min: 0, max: 8 };

