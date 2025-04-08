import { ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { AlbumComponent } from "../../shared/components/album/album.component";
import { DropDownControlComponent } from "../../shared/form-controls/drop-down-control/drop-down-control.component";
import { SizeControlComponent } from "../../shared/form-controls/size-control/size-control.component";
import { SizeErrorsComponent } from "../../shared/form-controls/size-errors/size-errors.component";

export const SEARCH_IMPORTS_CONFIG = [
    DropDownControlComponent,
    SizeControlComponent,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    AlbumComponent,
    SizeErrorsComponent
];
