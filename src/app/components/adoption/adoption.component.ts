import { AfterViewInit, Component, computed, effect, inject, OnDestroy, signal } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DropDownControlComponent } from '../../shared/drop-down-control/drop-down-control.component';
import { SizeControlComponent } from '../../shared/size-control/size-control.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SizeErrorsComponent } from '../../shared/size-errors/size-errors.component';
import { IOptions } from '../../core/models/breeds.model';
import { CheckBoxComponent } from '../../shared/check-box/check-box.component';
import { Subject } from 'rxjs/internal/Subject';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ageRangeValidatorFactory } from './ageRange.validator';
import { MatButtonModule } from '@angular/material/button';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
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
    CheckBoxComponent,
    MatButtonModule,
    MatProgressSpinnerModule,
    CommonModule,
    MatSnackBarModule,
  ],
  templateUrl: './adoption.component.html',
  styleUrl: './adoption.component.scss'
})
export class AdoptionComponent implements AfterViewInit, OnDestroy {

  WEIGHT_RANGE = { min: 1, max: 100 };
  AGE_RANGE = { min: 0, max: 20 };
  NEW_AGE_RANGE = { min: 0, max: 8 };

  destroy$ = new Subject<void>();

  ageSignal$ = signal<boolean | null>(false);

  ageRangeSignal$ = computed(() => this.ageSignal$() ? this.NEW_AGE_RANGE : this.AGE_RANGE);

  colorOptions: IOptions[] = OPTIONS;

  snackBar = inject(MatSnackBar);

  isLoading = false;

  adoptionForm = new FormGroup({
    weight: new FormControl<number | null>(null, {
      validators:
        [
          Validators.min(this.WEIGHT_RANGE.min),
          Validators.max(this.WEIGHT_RANGE.max),
          Validators.required
        ],
      updateOn: 'change'
    }
    ),
    color: new FormControl<string>('', {
      validators:
        Validators.required, updateOn: 'change'
    }),
    isFirst: new FormControl<boolean>(false),
    age: new FormControl<number | null>(null, {
      validators:
        [
          Validators.min(this.AGE_RANGE.min),
          Validators.max(this.AGE_RANGE.max),
          Validators.required
        ], updateOn: 'change'
    })
  }, { validators: ageRangeValidatorFactory(this.AGE_RANGE, this.NEW_AGE_RANGE) });

  constructor() {

  }

  ngAfterViewInit(): void {

    // this.adoptionForm.controls.isFirst.valueChanges.pipe(takeUntil(this.destroy$))
    //   .subscribe((value: boolean | null) => {
    //     this.ageSignal$.set(value);
    //   });

    // this.adoptionForm.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((value) => {
    //   // if (this.adoptionForm.controls.weight.dirty) {
    //   //   this.adoptionForm.controls.weight.addValidators(Validators.required);
    //   //   this.adoptionForm.controls.weight.updateValueAndValidity({ emitEvent: false });
    //   // }

    // });

  }

  onSubmit() {
    Object.keys(this.adoptionForm.controls).forEach(key => {
      this.adoptionForm.get(key)?.markAsTouched();
      this.adoptionForm.get(key)?.updateValueAndValidity({ onlySelf: true });
    });
    this.showLoader();
  }

  showLoader(){
    this.isLoading = true;

    setTimeout(() => {
      this.isLoading = false;
  
      this.snackBar.open('Your adoption request has been registered in the system','Close',{ duration: 3000 });
  
      this.adoptionForm.reset(); 

    }, 2000);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete()
  }

}
