import { AfterViewInit, Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DropDownControlComponent } from '../../shared/drop-down-control/drop-down-control.component';
import { SizeControlComponent } from '../../shared/size-control/size-control.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SizeErrorsComponent } from '../../shared/size-errors/size-errors.component';
import { IOptions } from '../../core/models/breeds.model';
import { CheckBoxComponent } from '../../shared/check-box/check-box.component';
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
    SizeErrorsComponent,
    CheckBoxComponent
  ],
  templateUrl: './adoption.component.html',
  styleUrl: './adoption.component.scss'
})
export class AdoptionComponent implements AfterViewInit {

  WEIGHT_RANGE = { min: 1, max: 100 };
  AGE_RANGE = { min: 0, max: 20 };
  NEW_AGE_RANGE = { min: 0, max: 8 };

  colorOptions: IOptions[] = OPTIONS;

  adoptionForm = new FormGroup({
    weight: new FormControl(null,[
      Validators.min(this.WEIGHT_RANGE.min),
      Validators.max(this.WEIGHT_RANGE.max)
    ]),
    color: new FormControl<IOptions>({ id: null, name: '' }, Validators.required),
    isFirst: new FormControl<boolean>(false),
    age: new FormControl<number | null>(null)
  });

  constructor() {

  }
  ngAfterViewInit(): void {
    this.adoptionForm.valueChanges.subscribe((value) => {
      if(this.adoptionForm.controls.weight.dirty){
        this.adoptionForm.controls.weight.addValidators(Validators.required);
      }
      console.log(value);
      console.log(this.adoptionForm);
    })
  }
}
