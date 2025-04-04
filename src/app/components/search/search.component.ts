import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter, switchMap, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/internal/Subject';
import { DropDownControlComponent } from '../../form-controls/drop-down-control/drop-down-control.component';
import { SizeControlComponent } from '../../form-controls/size-control/size-control.component';
import { ActivatedRoute } from '@angular/router';
import { IBreed, IByBreedResponse } from '../../core/models/breeds.model';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BreedsService } from '../../core/providers/breeds.service';
import { Observable } from 'rxjs';

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
export class SearchComponent implements OnInit, OnChanges, AfterViewInit {


  RANGE_CONFIG = { min: 1, max: 50 };

  private destroy$ = new Subject<void>();

  searchForm = new FormGroup({
    breedName: new FormControl('', { nonNullable: true }),
    rangeCntrl: new FormControl(null, [Validators.min(this.RANGE_CONFIG.min), Validators.max(this.RANGE_CONFIG.max)])
  });

  activatedRoute = inject(ActivatedRoute);

  cdRef = inject(ChangeDetectorRef);

  @Input() breeds!: IBreed[];

  breedsService = inject(BreedsService);

  ngOnInit(): void {

    this.addRangeRequiredValidator$();

    // this.getResolvedData$();

  }

  ngAfterViewInit(): void {

    this.formAction$();

  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes)
  }

  formAction$() {
    this.searchForm.valueChanges.pipe(
      debounceTime(1000),
      distinctUntilChanged((prev, curr) => JSON.stringify(prev) === JSON.stringify(curr)),
      filter(() => this.searchForm.valid && !!this.searchForm.value.breedName && !!this.searchForm.value.rangeCntrl),
      switchMap((value: Partial<{ breedName: string, rangeCntrl: null }>) => this.getByBreed$(value.breedName as string)),
      takeUntil(this.destroy$),
    ).subscribe((response: IByBreedResponse) => {
      console.log('valid ', this.searchForm.valid);
      console.log('searchForm ', this.searchForm);
      console.log('response ', response);
    });
  }

  getByBreed$(breed: string): Observable<IByBreedResponse> {
    return this.breedsService.getByBreed(breed);
  }

  addRangeRequiredValidator$() {
    this.searchForm.controls.rangeCntrl.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      if (this.searchForm.controls.rangeCntrl.dirty) {
        this.searchForm.controls.rangeCntrl.addValidators(Validators.required)
        this.searchForm.controls.rangeCntrl.updateValueAndValidity({ emitEvent: false });
      }
    });
  }

  // getResolvedData$() {
  //   // this.activatedRoute.data.pipe(takeUntil(this.destroy$)).subscribe((data: Data) => {
  //   //   // this.breeds = data['breeds'];
  //   //   // console.log(this.breeds);
  //   // });
  // }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
