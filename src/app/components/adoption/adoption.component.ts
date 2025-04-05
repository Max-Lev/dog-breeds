import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DropDownControlComponent } from '../../shared/drop-down-control/drop-down-control.component';
import { SizeControlComponent } from '../../shared/size-control/size-control.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SizeErrorsComponent } from '../../shared/size-errors/size-errors.component';
import { IOptions } from '../../core/models/breeds.model';
const OPTIONS = [
  { id: 1, name: 'White' }, { id: 2, name: 'Black' },
  { id: 3, name: 'Brown' }, { id: 4, name: 'Golden' },
  { id: 5, name: 'Gray' }, { id: 6, name: 'Mixed' }
];
@Component({
  selector: 'app-adoption',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    DropDownControlComponent,
    SizeControlComponent,
    MatFormFieldModule,
    MatInputModule,
    SizeErrorsComponent
  ],
  templateUrl: './adoption.component.html',
  styleUrl: './adoption.component.scss'
})
export class AdoptionComponent {

  WEIGHT_RANGE = { min: 1, max: 100 };

  colorOptions: IOptions[] = OPTIONS;

  adoptionForm = new FormGroup({
    weight: new FormControl<number | null>(this.WEIGHT_RANGE.min, [
      Validators.required,
      Validators.min(this.WEIGHT_RANGE.min),
      Validators.max(this.WEIGHT_RANGE.max)
    ]),
    color: new FormControl<IOptions>({ id: null, name: '' }, Validators.required),
    isFirst: new FormControl<boolean>(false),
    age: new FormControl<number | null>(null)
  });

  constructor() {

  }
}
