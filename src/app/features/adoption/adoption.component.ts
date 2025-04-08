import { IOptions } from '../../core/models/breeds.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdoptionFormInit } from './adoption.form';
import { ADOPTION_IMPORTS_CONFIG, AGE_RANGE, COLOR_OPTIONS, NEW_AGE_RANGE, WEIGHT_RANGE } from './config';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-adoption',
  standalone: true,
  imports: [...ADOPTION_IMPORTS_CONFIG],
  templateUrl: './adoption.component.html',
  styleUrl: './adoption.component.scss'
})
export class AdoptionComponent {

  NEW_AGE_RANGE = NEW_AGE_RANGE;

  AGE_RANGE = AGE_RANGE;

  WEIGHT_RANGE = WEIGHT_RANGE;

  colorOptions: IOptions[] = COLOR_OPTIONS;

  snackBar = inject(MatSnackBar);

  isLoading = false;

  adoptionForm = AdoptionFormInit(this.WEIGHT_RANGE, this.AGE_RANGE, this.NEW_AGE_RANGE);

  msg = 'Your adoption request has been registered in the system';

  onSubmit = () => this.showProgressSpinner();

  showProgressSpinner() {

    this.isLoading = true;

    setTimeout(() => {
      this.isLoading = false;
      this.snackBar.open(this.msg, 'Close', { duration: 3000 });
      this.adoptionForm.reset();
    }, 2000);

  }

}
