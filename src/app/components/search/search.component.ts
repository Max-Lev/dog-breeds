import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/internal/Subject';
import { DropDownControlComponent } from '../../form-controls/drop-down-control/drop-down-control.component';
import { SizeControlComponent } from '../../form-controls/size-control/size-control.component';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { IBreed } from '../../core/models/breeds.model';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';


@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    DropDownControlComponent,
    SizeControlComponent,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchComponent implements OnInit {

  RANGE_CONFIG = { min: 1, max: 50 };

  private destroy$ = new Subject<void>();

  searchForm = new FormGroup({
    breedName: new FormControl(''),
    rangeCntrl: new FormControl(1, [
      Validators.required,
      Validators.min(this.RANGE_CONFIG.min), Validators.max(this.RANGE_CONFIG.max)])
  });

  activatedRoute = inject(ActivatedRoute);

  breeds: IBreed[] = [];

  cdRef = inject(ChangeDetectorRef)

  ngOnInit(): void {

    this.searchForm.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      console.log('searchForm ', this.searchForm);
      console.log('searchForm ', value);
    });

    this.getResolvedData$();

  }

  getResolvedData$() {
    this.activatedRoute.data.pipe(takeUntil(this.destroy$)).subscribe((data: Data) => {
      this.breeds = data['breeds'];
      console.log(this.breeds);
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
